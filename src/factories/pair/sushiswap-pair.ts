import { ErrorCodes } from "../../common/errors/error-codes";
import { SushiswapError } from "../../common/errors/sushiswap-error";
import { isAddress } from "../../common/utils/is-address";
import { TradePath } from "../../enums/trade-path";
import { EthersProvider } from "../../ethers-provider";
import { TokensFactory } from "../token/tokens.factory";
import {
  SushiswapPairContextForChainId,
  SushiswapPairContextForProviderUrl,
} from "./models/sushiswap-pair-contexts";
import { SushiswapPairFactoryContext } from "./models/sushiswap-pair-factory-context";
import { SushiswapPairSettings } from "./models/sushiswap-pair-settings";
import { SushiswapPairFactory } from "./sushiswap-pair.factory";

export class SushiswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _sushiswapPairContext:
      | SushiswapPairContextForChainId
      | SushiswapPairContextForProviderUrl
  ) {
    if (!this._sushiswapPairContext.fromTokenContractAddress) {
      throw new SushiswapError(
        "Must have a `fromTokenContractAddress` on the context",
        ErrorCodes.fromTokenContractAddressRequired
      );
    }

    if (!isAddress(this._sushiswapPairContext.fromTokenContractAddress)) {
      throw new SushiswapError(
        "`fromTokenContractAddress` is not a valid contract address",
        ErrorCodes.fromTokenContractAddressNotValid
      );
    }

    if (!this._sushiswapPairContext.toTokenContractAddress) {
      throw new SushiswapError(
        "Must have a `toTokenContractAddress` on the context",
        ErrorCodes.toTokenContractAddressRequired
      );
    }

    if (!isAddress(this._sushiswapPairContext.toTokenContractAddress)) {
      throw new SushiswapError(
        "`toTokenContractAddress` is not a valid contract address",
        ErrorCodes.toTokenContractAddressNotValid
      );
    }

    if (!this._sushiswapPairContext.ethereumAddress) {
      throw new SushiswapError(
        "Must have a `ethereumAddress` on the context",
        ErrorCodes.ethereumAddressRequired
      );
    }

    if (!isAddress(this._sushiswapPairContext.ethereumAddress)) {
      throw new SushiswapError(
        "`ethereumAddress` is not a valid address",
        ErrorCodes.ethereumAddressNotValid
      );
    }

    const chainId = (<SushiswapPairContextForChainId>this._sushiswapPairContext)
      .chainId;

    const providerUrl = (<SushiswapPairContextForProviderUrl>(
      this._sushiswapPairContext
    )).providerUrl;

    if (providerUrl && chainId) {
      this._ethersProvider = new EthersProvider(chainId, providerUrl);
      return;
    }

    if (chainId) {
      this._ethersProvider = new EthersProvider(chainId);
      return;
    }

    throw new SushiswapError(
      "You must have a chainId on the context.",
      ErrorCodes.youMustSupplyAChainId
    );
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<SushiswapPairFactory> {
    const tokensFactory = new TokensFactory(this._ethersProvider);
    const tokens = await tokensFactory.getTokens([
      this._sushiswapPairContext.fromTokenContractAddress,
      this._sushiswapPairContext.toTokenContractAddress,
    ]);

    const sushiswapFactoryContext: SushiswapPairFactoryContext = {
      fromToken: tokens.find(
        (t) =>
          t.contractAddress ===
          this._sushiswapPairContext.fromTokenContractAddress
      )!,
      toToken: tokens.find(
        (t) =>
          t.contractAddress ===
          this._sushiswapPairContext.toTokenContractAddress
      )!,
      ethereumAddress: this._sushiswapPairContext.ethereumAddress,
      settings:
        this._sushiswapPairContext.settings || new SushiswapPairSettings(),
      ethersProvider: this._ethersProvider,
    };

    return new SushiswapPairFactory(
      sushiswapFactoryContext,
      (<SushiswapPairContextForChainId>this._sushiswapPairContext).chainId,
      this._sushiswapPairContext.tradePath
    );
  }
}
