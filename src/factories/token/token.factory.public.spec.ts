import { ChainId, TokenFactoryPublic } from '../..';
import { ContractContext } from '../../common/contract-context';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';

describe('TokenFactoryPublic', () => {
  const token = MOCK1INCH();

  const tokenFactoryPublic = new TokenFactoryPublic(
    token.contractAddress,
    ChainId.MAINNET
  );

  it('getToken', async () => {
    const result = await tokenFactoryPublic.getToken();
    expect(result).toEqual(token);
  });

  it('allowance', async () => {
    const result = await tokenFactoryPublic.allowance(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('generateApproveAllowanceData', () => {
    const result = tokenFactoryPublic.generateApproveAllowanceData(
      new ContractContext(ChainId.MAINNET).routerAddress(),
      '0x05'
    );
    expect(result).toEqual(
      '0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9f0000000000000000000000000000000000000000000000000000000000000005'
    );
  });

  it('balanceOf', async () => {
    const result = await tokenFactoryPublic.balanceOf(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('totalSupply', async () => {
    const result = await tokenFactoryPublic.totalSupply();
    expect(result).toEqual('0x04d8c55aefb8c05b5c000000');
  });

  it('getAllowanceAndBalanceOf', async () => {
    const result = await tokenFactoryPublic.getAllowanceAndBalanceOf(
      MockEthereumAddress()
    );
    expect(result).toEqual({
      allowance: '0x00',
      balanceOf: '0x00',
    });
  });
});
