import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiConnector } from "../Api";
import { Mempool } from "../object/TransactionObject";
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
    return (
      <div>
        <h1>Transaction registered in Mempool does not exist.</h1>
      </div>
    );
  }

  const obMem = Object.entries(mempool);

  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div className="w-[85%] mx-auto">
          <h2 className="text-slate-200 text-2xl font-bold mb-10">
            <span>In Mempool has </span>
            <span className="text-[#37BCF8]">{`'${obMem.length}'`}</span>
            <span> Transactions</span>
          </h2>
          {obMem.slice(offset, offset + limit).map((mem) => {
            return (
              <div key={mem[0]}>
                <p className=" text-slate-300 text-xl px-1 font-semibold">
                  {`TxID : ${mem[0]}`}
                </p>
                {TxPage(mem[1])}
              </div>
            );
          })}
          <Paging count={obMem.length} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default MempoolPage;
