import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiConnector } from "../Api";
import { Mempool } from "../object/TransactionObject";
import { LoadingPage } from "./LoadingPage";
import Paging from "./Pagination";
import { TxPage } from "./TxPage";

const MempoolPage = () => {
  const [loading, setLoading] = useState(true);
  const [mempool, setMempool] = useState<Mempool>();

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getMempool = async () => {
    const res = await apiConnector.getMempool();
    setMempool(res);
  };

  useEffect(() => {
    getMempool();
    setLoading(false);
  }, []);

  if (mempool === undefined) {
    return LoadingPage("Data Loading...");
  }

  const obMem = Object.entries(mempool);

  return (
    <div>
      {loading ? (
        LoadingPage("Page Loading...")
      ) : (
        <div className="w-[85%] mx-auto">
          <h2 className="text-slate-100 text-2xl font-bold mb-10">
            Has
            <span className="text-[#37BCF8]">{` '${obMem.length}' `}</span>
            <span> Unconfirmed Transactions</span>
          </h2>
          {obMem.slice(offset, offset + limit).map((mem) => {
            return <div key={mem[0]}>{TxPage(mem[1], null)}</div>;
          })}
          <Paging count={obMem.length} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default MempoolPage;
