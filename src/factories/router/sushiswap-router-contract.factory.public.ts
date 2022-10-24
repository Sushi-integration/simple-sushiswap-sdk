import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { SushiswapRouterContractFactory } from './sushiswap-router-contract.factory';

export class SushiswapRouterContractFactoryPublic extends SushiswapRouterContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl), chainId);
  }
}
