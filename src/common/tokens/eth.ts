import { ErrorCodes, SushiswapError } from "../..";
import { ChainId } from "../../enums/chain-id";
import { Token } from "../../factories/token/models/token";

export class ETH {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    };
  }

  public static RINKEBY(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    };
  }
  public static ROPSTEN(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    };
  }
  public static GORLI(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    };
  }

  public static token(chainId: ChainId | number) {
    switch (chainId) {
      case ChainId.MAINNET:
        return this.MAINNET();
      case ChainId.ROPSTEN:
        return this.ROPSTEN();
      case ChainId.RINKEBY:
        return this.RINKEBY();
      case ChainId.GÖRLI:
        return this.GORLI();
      case ChainId.MATIC:
        return null
      case ChainId.MUMBAI:
        return null
      default:
        throw new SushiswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
