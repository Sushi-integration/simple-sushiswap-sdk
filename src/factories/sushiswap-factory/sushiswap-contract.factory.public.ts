import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { SushiswapContractFactory } from './sushiswap-contract.factory';

export class SushiswapContractFactoryPublic extends SushiswapContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl), chainId);
  }
}
