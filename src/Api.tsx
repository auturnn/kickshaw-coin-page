import { BlockChainStatusObject, BlockObject } from "./object/BlockObject";
import { Mempool } from "./object/TransactionObject";
export const Host = "http://api.kickshaw-coin.com";

class ApiConnector {
  private host: string;

  constructor(host: string) {
    this.host = Host + host;
  }

  getMempool = async (): Promise<Mempool> => {
    return await ApiConnector.fetchTojson(`${this.host}mempool`);
  };

  getBlock = async (hash: string): Promise<BlockObject> => {
    return await ApiConnector.fetchTojson(`${this.host}/${hash}`);
  };

  getBlocks = async (): Promise<BlockObject[]> => {
    return await ApiConnector.fetchTojson(`${this.host}`);
  };

  getChainStatus = async (): Promise<BlockChainStatusObject> => {
    return await ApiConnector.fetchTojson(`${this.host}`);
  };

  private static async fetchTojson<T>(endpoint: string): Promise<T> {
    const json = fetch(endpoint).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
    return await json;
  }
}

export const blockApiConnector = new ApiConnector("/blocks");
export const apiConnector = new ApiConnector("/");

export default ApiConnector;
