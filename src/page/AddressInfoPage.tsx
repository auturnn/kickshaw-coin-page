import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UTxOut } from "../object/TransactionObject";
import Paging from "./Pagination";
import { txApiConnector } from "../Api";
import { LoadingPage } from "./LoadingPage";

const UTxOutListPage = ({ blockHash, txID, index, amount }: UTxOut) => {
  return (
    <div
      className="w-full inline-block border-b border-b-slate-700 bg-[#1e2638] rounded-md my-3"
      key={txID}
    >
      <div className="w-full my-2">
        <div className="w-full my-4">
          <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
            TxID
          </div>
          <div className="text-slate-300 text-lg font-semibold ">
            {txID === "" ? (
              "MINEND BLOCK"
            ) : (
              <Link to={`/block/${blockHash}`}>{txID}</Link>
            )}
          </div>
        </div>
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          Index
        </div>
        <div className="text-slate-300 text-lg font-semibold ">{index}</div>
      </div>
      <div className="w-full my-4">
        <div className="border-r-2 border-r-slate-400 float-left w-1/12 mr-3 font-semibold text-center text-[#37BCF8] text-lg bg-[#20283A]">
          Amount
        </div>
        <div className="text-slate-300 text-lg font-semibold ">
          {`${amount}`}
          <span className=" text-amber-300"> KSC</span>
        </div>
      </div>
    </div>
  );
};

const AddressInfoPage = () => {
  const [loading, setLoading] = useState(true);
  const [utxout, setUTxOut] = useState<UTxOut[]>();
  const [amount, setAmount] = useState<Number>(0);
  const { address } = useParams();

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getUTxOut = async () => {
    if (address !== undefined) {
      const json = await txApiConnector.getTransactionList(address);
      setUTxOut(json);
    }
  };

  const getAmount = async () => {
    if (address !== undefined) {
      const json = await txApiConnector.getTotalBalance(address);
      setAmount(json);
    }
  };

  useEffect(() => {
    getAmount();
    getUTxOut();
    setLoading(false);
  }, []);

  if (utxout === undefined) {
    return LoadingPage("Address Transactions Loading...");
  }

  return (
    <div className="w-[85%] mx-auto text-slate-200 text-lg">
      {loading ? (
        LoadingPage("Page Loading...")
      ) : (
        <div className="w-full">
          <div className="w-full inline-block mb-5">
            <h2 className="text-2xl text-slate-200 font-bold">
              Address Infomation
            </h2>
            <div className="w-full flex flex-wrap my-10">
              <div className="w-1/12 text-xl font-semibold px-2 text-center  text-[#37BCF8] border-r border-r-slate-700 ">
                Address
              </div>
              <div className="px-4">{address}</div>
            </div>
            <div className="w-full flex flex-wrap my-10">
              <div className="w-1/12 text-xl font-semibold px-2 text-center  text-[#37BCF8] border-r border-r-slate-700 ">
                Total
              </div>
              <div className="px-4">
                <span>{`${amount}`} </span>
                <span className=" text-amber-300">KSC</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-slate-200 text-2xl font-bold">
              This Address has '
              <span className="text-[#37BCF8]">
                {utxout === null ? 0 : utxout.length}
              </span>
              ' Transactions on the Blockchain
            </h2>
            {utxout === null ? (
              ``
            ) : (
              <div>
                {utxout
                  .slice(offset, offset + limit)
                  .map((res) => UTxOutListPage(res))}
                <Paging count={utxout.length} page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInfoPage;
