import { BlockObject } from "./component/BlockObject";
export const Host = "http://api.kickshaw-coin.com";
class ApiConnector {
  private host: string;

  constructor(host: string) {
    this.host = Host + host;
  }

  getBlock = (hash: string): Promise<BlockObject> => {
    return ApiConnector.fetchTojson(`${this.host}/${hash}`);
  };

  getBlocks = (): Promise<BlockObject[]> => {
    return ApiConnector.fetchTojson(`${this.host}`);
  };

  private static async fetchTojson<T>(endpoint: string): Promise<T> {
    const json = fetch(endpoint).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });

    return json;
  }
}
export const blockApiConnector = new ApiConnector("/blocks");
export default ApiConnector;
