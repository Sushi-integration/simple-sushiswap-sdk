import { BigNumberish } from 'ethers';
import { ContractContext as FactoryContractContext } from '../../ABI/types/sushiswap-factory';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';

export class SushiswapContractFactory {
  private _sushiswapFactoryContract = this._ethersProvider.getContract<FactoryContractContext>(
    JSON.stringify(ContractContext.factoryAbi),
    new ContractContext(this.chainId).factoryAddress()
  );

  constructor(private _ethersProvider: EthersProvider, private chainId : number) {}

  public async allPairs(parameter0: BigNumberish): Promise<string> {
    return await this._sushiswapFactoryContract.allPairs(parameter0);
  }

  public async allPairsLength(): Promise<string> {
    return (
      await this._sushiswapFactoryContract.allPairsLength()
    ).toHexString();
  }

  public createPair(tokenA: string, tokenB: string): string {
    return this._sushiswapFactoryContract.interface.encodeFunctionData(
      'createPair',
      [tokenA, tokenB]
    );
  }

  public async getPair(token0: string, token1: string): Promise<string> {
    return await this._sushiswapFactoryContract.getPair(token0, token1);
  }

  public async feeTo(): Promise<string> {
    return await this._sushiswapFactoryContract.feeTo();
  }

  public async feeToSetter(): Promise<string> {
    return await this._sushiswapFactoryContract.feeToSetter();
  }

  public async setFeeTo(_feeTo: string): Promise<string> {
    return this._sushiswapFactoryContract.interface.encodeFunctionData(
      'setFeeTo',
      [_feeTo]
    );
  }

  public async setFeeToSetter(_feeToSetter: string): Promise<string> {
    return this._sushiswapFactoryContract.interface.encodeFunctionData(
      'setFeeToSetter',
      [_feeToSetter]
    );
  }
}
