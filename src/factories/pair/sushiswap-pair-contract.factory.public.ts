import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { SushiswapPairContractFactory } from './sushiswap-pair-contract.factory';

export class SushiswapPairContractFactoryPublic extends SushiswapPairContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl), chainId);
  }
}
