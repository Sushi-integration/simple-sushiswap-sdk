import { ErrorCodes, SushiswapError } from "../..";
import { ChainId } from "../../enums/chain-id";
import { Token } from "../../factories/token/models/token";

/**
 * WMATIC token context
 */
export class MATIC {
  public static MATIC(): Token {
    return {
      chainId: ChainId.MATIC,
      contractAddress: '0x0000000000000000000000000000000000001010',
      decimals: 18,
      symbol: 'MATIC',
      name: 'Matic Token'
    }
  }

  public static MUMBAI(): Token {
    return {
      chainId: ChainId.MATIC,
      contractAddress: '0x0000000000000000000000000000000000001010',
      decimals: 18,
      symbol: 'MATIC',
      name: 'Matic Token'
    }
  }

  public static token(chainId: ChainId | number) {
    switch (chainId) {
      case ChainId.MATIC:
        return this.MATIC();
      case ChainId.MUMBAI:
        return this.MUMBAI()
      default:
        throw new SushiswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}