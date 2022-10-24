// import { JsonFragment } from "@ethersproject/abi";

export class ContractContext {
  constructor(chainid: number) {
    this.chainId = chainid;
  }

  chainId;

  /**
   * The sushiswap router address
   */
  // public static routerAddress = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
  public routerAddress() {
    const isMatic = this.chainId === 137;
    return isMatic
      ? "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506"
      : "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
  }

  /**
   * The sushiswap factory address
   */
  // public static factoryAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
  public factoryAddress() {
    const isMatic = this.chainId === 137;
    return isMatic
      ? "0xc35DADB65012eC5796536bD9864eD8773aBc74C4"
      : "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
  }

  /**
   * The sushiswap pair address
   */
  // public static pairAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
  public pairAddress() {
    const isMatic = this.chainId === 137;
    return isMatic
      ? "0xc35DADB65012eC5796536bD9864eD8773aBc74C4"
      : "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
  }

  /**
   * sushiswap v2 router
   */
  public static routerAbi: any[] = require("../ABI/sushiswap-router-v2.json");

  /**
   * sushiswap v2 factory
   */
  public static factoryAbi: any[] = require("../ABI/sushiswap-factory-v2.json");

  /**
   * sushiswap v2 pair
   */
  public static pairAbi: any[] = require("../ABI/sushiswap-pair-v2.json");

  /**
   * ERC20 abi
   */
  public static erc20Abi: any[] = require("../ABI/erc-20-abi.json");
}
