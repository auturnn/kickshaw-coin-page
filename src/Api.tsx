import { BlockObject } from "./component/BlockObject";
export const Host = "http://api.kickshaw-coin.com";
class ApiConnector {
  private host: string;

  constructor(host: string) {
    this.host = Host + host;
  }

  getBlock = (hash: string): Promise<BlockObject> => {
    return ApiConnector.jsonFetch(`${this.host}${hash}`);
  };

  getBlocks = (): Promise<BlockObject[]> => {
    return ApiConnector.jsonFetch(`${this.host}`);
  };

  private static async jsonFetch<T>(endpoint: string): Promise<T> {
    const json = fetch(endpoint).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });

    return json;
  }
}

export default ApiConnector;
