import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { SushiswapError } from '../errors/sushiswap-error';

/**
 * USDC token context CHANGE CONTRACT ADDRESS INFO ETC
 */
export class USDC {
  public static MAINNET() {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 18,
      symbol: 'USDC',
      name: 'USD Coin',
    };
  }

  public static MATIC() {
    return {
      chainId: ChainId.MATIC,
      contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      symbol: 'USDC',
      name : 'USD Coin (PoS)'
    }
  }

  /**
   * Get USDC token info by chain id
   * @param chainId The chain id
   */
  public static token(chainId: ChainId | number) {
    switch (chainId) {
      case ChainId.MAINNET:
        return this.MAINNET();
      case ChainId.MATIC:
        return this.MATIC()
      default:
        throw new SushiswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
