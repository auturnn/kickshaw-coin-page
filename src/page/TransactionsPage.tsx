import { useEffect, useState } from "react";
import { txApiConnector } from "../Api";
import { TxObject } from "../object/TransactionObject";
import { LoadingPage } from "./LoadingPage";
import Paging from "./Pagination";
import { TxPage } from "./TxPage";

export const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [txList, setTxList] = useState<TxObject[]>();

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getTxList = async () => {
    const res = await txApiConnector.getLastTransactionList();
    setTxList(res);
  };

  useEffect(() => {
    getTxList();
    setLoading(false);
  }, []);

  if (txList === undefined) {
    return LoadingPage("Transactions Loading...");
  }

  const txMem = txList.reverse();

  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div className="w-[85%] mx-auto">
          <h2 className="text-slate-200 text-2xl font-bold mb-10">
            Last
            <span className="text-[#37BCF8]">{` '${txMem.length}' `}</span>
            <span>Transactions</span>
          </h2>
          {txMem.slice(offset, offset + limit).map((tx, index) => {
            return (
              <div key={tx.id}>
                {TxPage(tx, txMem.length - (index + offset))}
              </div>
            );
          })}
          <Paging count={txMem.length} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};
