import { BigNumberish } from 'ethers';
import { ContractContext as PairContractContext } from '../../ABI/types/sushiswap-pair';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';

export class SushiswapPairContractFactory {
  private _sushiswapPairFactory = this._ethersProvider.getContract<PairContractContext>(
    JSON.stringify(ContractContext.pairAbi),
    new ContractContext(this.chainId).pairAddress()
  );

  constructor(private _ethersProvider: EthersProvider,private chainId:number) {}

  public async allPairs(parameter0: BigNumberish): Promise<string> {
    return await this._sushiswapPairFactory.allPairs(parameter0);
  }

  public async allPairsLength(): Promise<string> {
    return (await this._sushiswapPairFactory.allPairsLength()).toHexString();
  }

  public createPair(tokenA: string, tokenB: string): string {
    return this._sushiswapPairFactory.interface.encodeFunctionData(
      'createPair',
      [tokenA, tokenB]
    );
  }

  public async feeTo(): Promise<string> {
    return await this._sushiswapPairFactory.feeTo();
  }

  public async feeToSetter(): Promise<string> {
    return await this._sushiswapPairFactory.feeToSetter();
  }

  public async getPair(
    parameter0: string,
    parameter1: string
  ): Promise<string> {
    return await this._sushiswapPairFactory.getPair(parameter0, parameter1);
  }

  public async setFeeTo(_feeTo: string): Promise<string> {
    return this._sushiswapPairFactory.interface.encodeFunctionData('setFeeTo', [
      _feeTo,
    ]);
  }

  public async setFeeToSetter(_feeToSetter: string): Promise<string> {
    return this._sushiswapPairFactory.interface.encodeFunctionData(
      'setFeeToSetter',
      [_feeToSetter]
    );
  }
}
