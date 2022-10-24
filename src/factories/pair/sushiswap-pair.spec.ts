import { ChainId, ErrorCodes, SushiswapError, SushiswapPair } from '../..';
import { TradePath } from '../../enums/trade-path';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MOCKAAVE } from '../../mocks/aave-token.mock';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCK_PROVIDER_URL } from '../../mocks/provider-url.mock';
import {
  SushiswapPairContextForChainId,
  SushiswapPairContextForProviderUrl,
} from './models/sushiswap-pair-contexts';

describe('SushiswapPair', () => {
  it('should throw if no fromTokenContractAddress is passed in', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {};
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        'Must have a `fromTokenContractAddress` on the context',
        ErrorCodes.fromTokenContractAddressRequired
      )
    );
  });

  it('should throw if fromTokenContractAddress is invalid address', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: '1',
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        '`fromTokenContractAddress` is not a valid contract address',
        ErrorCodes.fromTokenContractAddressNotValid
      )
    );
  });

  it('should throw if no toTokenContractAddress is passed in', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        'Must have a `toTokenContractAddress` on the context',
        ErrorCodes.toTokenContractAddressRequired
      )
    );
  });

  it('should throw if toTokenContractAddress is invalid address', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: '1',
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        '`toTokenContractAddress` is not a valid contract address',
        ErrorCodes.toTokenContractAddressNotValid
      )
    );
  });

  it('should throw if no ethereumAddress is passed in', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: MOCKAAVE().contractAddress,
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        'Must have a `ethereumAddress` on the context',
        ErrorCodes.ethereumAddressRequired
      )
    );
  });

  it('should throw if ethereumAddress is invalid address', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: MOCKAAVE().contractAddress,
      ethereumAddress: '1',
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        '`ethereumAddress` is not a valid address',
        ErrorCodes.ethereumAddressNotValid
      )
    );
  });

  it('should throw if no chainId is passed in', () => {
    // @ts-ignore
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: MOCKAAVE().contractAddress,
      ethereumAddress: MockEthereumAddress(),
    };
    expect(() => new SushiswapPair(context)).toThrowError(
      new SushiswapError(
        'You must have a chainId on the context.',
        ErrorCodes.youMustSupplyAChainId
      )
    );
  });

  it('should create ethers provider', () => {
    const context: SushiswapPairContextForChainId = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: MOCKAAVE().contractAddress,
      ethereumAddress: MockEthereumAddress(),
      chainId: ChainId.MAINNET,
      tradePath: TradePath.erc20ToErc20
    };

    const sushiswapPair = new SushiswapPair(context);

    //@ts-ignore
    expect(typeof sushiswapPair._ethersProvider).not.toBeUndefined();
  });

  it('should create ethers provider', () => {
    const context: SushiswapPairContextForProviderUrl = {
      fromTokenContractAddress: MOCK1INCH().contractAddress,
      toTokenContractAddress: MOCKAAVE().contractAddress,
      ethereumAddress: MockEthereumAddress(),
      chainId: ChainId.MAINNET,
      providerUrl: MOCK_PROVIDER_URL(),
      tradePath: TradePath.erc20ToErc20
    };

    const sushiswapPair = new SushiswapPair(context);

    //@ts-ignore
    expect(typeof sushiswapPair._ethersProvider).not.toBeUndefined();
  });

  describe('createFactory', () => {
    it('should create a sushiswap pair factory', async () => {
      const context: SushiswapPairContextForChainId = {
        fromTokenContractAddress: MOCK1INCH().contractAddress,
        toTokenContractAddress: MOCKAAVE().contractAddress,
        ethereumAddress: MockEthereumAddress(),
        chainId: ChainId.MAINNET,
        tradePath: TradePath.erc20ToErc20
      };

      const sushiswapPair = new SushiswapPair(context);
      const factory = await sushiswapPair.createFactory();
      expect(factory.toToken).toEqual(MOCKAAVE());
      expect(factory.fromToken).toEqual(MOCK1INCH());
    });
  });
});
