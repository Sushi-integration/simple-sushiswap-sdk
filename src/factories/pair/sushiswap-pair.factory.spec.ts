import {
  ChainId,
  ErrorCodes,
  SushiswapError,
  SushiswapPairFactory,
  SushiswapPairSettings,
  WETH,
} from "../..";
import { TradePath } from "../../enums/trade-path";
import { EthersProvider } from "../../ethers-provider";
import { MOCK1INCH } from "../../mocks/1inch-token.mock";
import { MOCKAAVE } from "../../mocks/aave-token.mock";
import { MockEthereumAddress } from "../../mocks/ethereum-address.mock";
import { MOCK_PROVIDER_URL } from "../../mocks/provider-url.mock";
import { SushiswapPairFactoryContext } from "./models/sushiswap-pair-factory-context";

describe("SushiswapPairFactory", () => {
  const ethersProvider = new EthersProvider(
    ChainId.MAINNET,
    MOCK_PROVIDER_URL()
  );
  describe("erc20 > erc20", () => {
    const sushiswapPairFactoryContext: SushiswapPairFactoryContext = {
      fromToken: MOCK1INCH(),
      toToken: MOCKAAVE(),
      ethereumAddress: MockEthereumAddress(),
      settings: new SushiswapPairSettings(),
      ethersProvider,
    };

    const sushiswapPairFactory = new SushiswapPairFactory(
      sushiswapPairFactoryContext,
      ChainId.MAINNET,
      TradePath.erc20ToErc20
    );

    it("`toToken` should retun correctly", () => {
      expect(sushiswapPairFactory.toToken).toEqual(
        sushiswapPairFactoryContext.toToken
      );
    });

    it("`fromToken` should retun correctly", () => {
      expect(sushiswapPairFactory.fromToken).toEqual(
        sushiswapPairFactoryContext.fromToken
      );
    });

    describe("trade", () => {
      it("should return trade info", async () => {
        const result = await sushiswapPairFactory.trade("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findBestRoute", () => {
      it("should return the best route", async () => {
        const result = await sushiswapPairFactory.findBestRoute("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutesWithQuote", () => {
      it("should return all possible routes with quotes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutesWithQuote(
          "1"
        );
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutes", () => {
      it("should return all possible routes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe("hasGotEnoughAllowance", () => {
      xit("should return true if i have enough allowance", async () => {
        const result = await sushiswapPairFactory.hasGotEnoughAllowance("1");
        expect(result).toEqual(true);
      });

      it("should return false if i do not have enough allowance", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCKAAVE(),
            toToken: MOCK1INCH(),
            ethereumAddress: MockEthereumAddress(),
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToErc20
        );

        const result = await factory.hasGotEnoughAllowance("1");
        expect(result).toEqual(false);
      });
    });

    describe("getAllowanceAndBalanceOfForFromToken", () => {});

    describe("allowance", () => {
      xit("should return more then 0", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCK1INCH(),
            toToken: MOCKAAVE(),
            ethereumAddress: "0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba",
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToErc20
        );

        const result = await factory.allowance();
        expect(result).not.toEqual("0x00");
      });

      it("should return 0 allowance", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCKAAVE(),
            toToken: MOCK1INCH(),
            ethereumAddress: MockEthereumAddress(),
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToErc20
        );

        const result = await factory.allowance();
        expect(result).toEqual("0x00");
      });
    });

    describe("generateApproveMaxAllowanceData", () => {
      it("should generate the approve max allowance data", async () => {
        const result = await sushiswapPairFactory.generateApproveMaxAllowanceData();
        expect(result).toEqual({
          data:
            "0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          from: "0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9",
          to: "0x111111111117dC0aa78b770fA6A738034120C302",
          value: "0x00",
        });
      });
    });
  });

  describe("erc20 > eth", () => {
    const SushiswapPairFactoryContext: SushiswapPairFactoryContext = {
      fromToken: MOCK1INCH(),
      toToken: WETH.MAINNET(),
      ethereumAddress: MockEthereumAddress(),
      settings: new SushiswapPairSettings(),
      ethersProvider,
    };

    const sushiswapPairFactory = new SushiswapPairFactory(
      SushiswapPairFactoryContext,
      ChainId.MAINNET,
      TradePath.erc20ToErc20
    );

    it("`toToken` should retun correctly", () => {
      expect(sushiswapPairFactory.toToken).toEqual(
        SushiswapPairFactoryContext.toToken
      );
    });

    it("`fromToken` should retun correctly", () => {
      expect(sushiswapPairFactory.fromToken).toEqual(
        SushiswapPairFactoryContext.fromToken
      );
    });

    describe("trade", () => {
      it("should return trade info", async () => {
        const result = await sushiswapPairFactory.trade("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findBestRoute", () => {
      it("should return the best route", async () => {
        const result = await sushiswapPairFactory.findBestRoute("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutesWithQuote", () => {
      it("should return all possible routes with quotes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutesWithQuote(
          "1"
        );
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutes", () => {
      it("should return all possible routes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe("hasGotEnoughAllowance", () => {
      xit("should return true if i have enough allowance", async () => {
        const result = await sushiswapPairFactory.hasGotEnoughAllowance("1");
        expect(result).toEqual(true);
      });

      it("should return false if i do not have enough allowance", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCKAAVE(),
            toToken: WETH.MAINNET(),
            ethereumAddress: MockEthereumAddress(),
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToEth
        );

        const result = await factory.hasGotEnoughAllowance("1");
        expect(result).toEqual(false);
      });
    });

    describe("getAllowanceAndBalanceOfForFromToken", () => {});

    describe("allowance", () => {
      xit("should return more then 0", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCK1INCH(),
            toToken: WETH.MAINNET(),
            ethereumAddress: "0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba",
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToEth
        );

        const result = await factory.allowance();
        expect(result).not.toEqual("0x00");
      });

      it("should return 0 allowance", async () => {
        const factory = new SushiswapPairFactory(
          {
            fromToken: MOCKAAVE(),
            toToken: WETH.MAINNET(),
            ethereumAddress: MockEthereumAddress(),
            settings: new SushiswapPairSettings(),
            ethersProvider,
          },
          ChainId.MAINNET,
          TradePath.erc20ToEth
        );

        const result = await factory.allowance();
        expect(result).toEqual("0x00");
      });
    });

    describe("generateApproveMaxAllowanceData", () => {
      it("should generate the approve max allowance data", async () => {
        const result = await sushiswapPairFactory.generateApproveMaxAllowanceData();
        expect(result).toEqual({
          data:
            "0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          from: "0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9",
          to: "0x111111111117dC0aa78b770fA6A738034120C302",
          value: "0x00",
        });
      });
    });
  });

  describe("eth > erc20", () => {
    const sushiswapPairFactoryContext: SushiswapPairFactoryContext = {
      fromToken: WETH.MAINNET(),
      toToken: MOCK1INCH(),
      ethereumAddress: MockEthereumAddress(),
      settings: new SushiswapPairSettings(),
      ethersProvider,
    };

    const sushiswapPairFactory = new SushiswapPairFactory(
      sushiswapPairFactoryContext,
      ChainId.MAINNET,
      TradePath.ethToErc20
    );

    it("`toToken` should retun correctly", () => {
      expect(sushiswapPairFactory.toToken).toEqual(
        sushiswapPairFactoryContext.toToken
      );
    });

    it("`fromToken` should retun correctly", () => {
      expect(sushiswapPairFactory.fromToken).toEqual(
        sushiswapPairFactoryContext.fromToken
      );
    });

    describe("trade", () => {
      it("should return trade info", async () => {
        const result = await sushiswapPairFactory.trade("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findBestRoute", () => {
      it("should return the best route", async () => {
        const result = await sushiswapPairFactory.findBestRoute("1");
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutesWithQuote", () => {
      it("should return all possible routes with quotes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutesWithQuote(
          "1"
        );
        expect(result).not.toBeUndefined();
      });
    });

    describe("findAllPossibleRoutes", () => {
      it("should return all possible routes", async () => {
        const result = await sushiswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe("hasGotEnoughAllowance", () => {
      it("should always return true as not allowance needed", async () => {
        const result = await sushiswapPairFactory.hasGotEnoughAllowance("1");
        expect(result).toEqual(true);
      });
    });

    describe("getAllowanceAndBalanceOfForFromToken", () => {});

    describe("allowance", () => {
      it("should always return max hex", async () => {
        const result = await sushiswapPairFactory.allowance();
        expect(result).toEqual(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
      });
    });

    describe("generateApproveMaxAllowanceData", () => {
      it("should generate the approve max allowance data", async () => {
        await expect(
          sushiswapPairFactory.generateApproveMaxAllowanceData()
        ).rejects.toThrowError(
          new SushiswapError(
            "You do not need to generate approve sushiswap allowance when doing eth > erc20",
            ErrorCodes.generateApproveMaxAllowanceDataNotAllowed
          )
        );
      });
    });
  });
});
