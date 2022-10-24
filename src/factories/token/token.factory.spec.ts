import { ChainId } from '../..';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { TokenFactory } from './token.factory';

describe('TokenFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);
  const token = MOCK1INCH();

  const tokenFactory = new TokenFactory(token.contractAddress, ethersProvider,ChainId.MAINNET);

  it('getToken', async () => {
    const result = await tokenFactory.getToken();
    expect(result).toEqual(token);
  });

  it('allowance', async () => {
    const result = await tokenFactory.allowance(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('generateApproveAllowanceData', () => {
    const result = tokenFactory.generateApproveAllowanceData(
      new ContractContext(ChainId.MAINNET).routerAddress(),
      '0x05'
    );
    expect(result).toEqual(
      '0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f0000000000000000000000000000000000000000000000000000000000000005'
    );
  });

  it('balanceOf', async () => {
    const result = await tokenFactory.balanceOf(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('totalSupply', async () => {
    const result = await tokenFactory.totalSupply();
    expect(result).toEqual('0x04d8c55aefb8c05b5c000000');
  });

  it('getAllowanceAndBalanceOf', async () => {
    const result = await tokenFactory.getAllowanceAndBalanceOf(
      MockEthereumAddress()
    );
    expect(result).toEqual({
      allowance: '0x00',
      balanceOf: '0x00',
    });
  });
});
