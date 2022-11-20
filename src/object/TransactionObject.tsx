export interface TxObject {
  id: string;
  timestamp: number;
  txIns: Array<TxInObject>;
  txOuts: Array<TxOutObject>;
}

export interface TxInObject {
  txId: string;
  index: number;
  signature: string;
}

export interface TxOutObject {
  address: string;
  amount: number;
}

export interface UTxOut {
  txId: string;
  index: number;
  amount: number;
}

export type Mempool = {
  [Property in keyof string]: TxObject;
};

// export type Mempool = Map<string, TxObject>;

// export class MempoolPair<Mempool> {
//   private mempool: Mempool;

//   constructor(mempool: Mempool) {
//     this.mempool = mempool;
//   }

//   getPair() {
//     for (const [key, v] of this.mempool) {
//         console.log(key, v)
//     }
//     return;
//   }
// }
