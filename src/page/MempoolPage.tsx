import { useEffect, useState } from "react";
import { apiConnector } from "../Api";
import { Mempool } from "../object/TransactionObject";

const MempoolPage = () => {
  const [loading, setLoading] = useState(true);
  const [mempool, setMempool] = useState<Mempool>();

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
  return (
    <div>
      {loading ? (
        <h1>Loading Block Data...</h1>
      ) : (
        <div>
          {Object.entries(mempool).map((mem) => {
            return (
              <div key={mem[0]}>
                {`key: ${mem[0]}, ${mem[1].txOuts.map((outs) => (
                  <div>{outs.address}</div>
                ))}`}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MempoolPage;
