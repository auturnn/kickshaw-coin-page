import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blockApiConnector } from "../Api";
import { BlockObject, getDate, Time } from "../object/BlockObject";
import { slicingAddress } from "../object/TransactionObject";
import { LoadingPage } from "./LoadingPage";
import Paging from "./Pagination";
import { TxPage } from "./TxPage";

const BlockPage = () => {
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<BlockObject>();
  const { hash } = useParams();

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getBlock = async () => {
    if (hash !== undefined) {
      const res = await blockApiConnector.getBlock(hash);
      setBlock(res);
    }
  };

  useEffect(() => {
    getBlock();
    setLoading(false);
  }, [hash]);

  if (block === undefined) {
    return LoadingPage("Block Loading...");
  }

  return (
    <div>
      {loading ? (
        LoadingPage("Page Loading...")
      ) : (
        <div key="blockInfo" className="w-[85%] mx-auto mb-10">
          <table className="w-full h-full rounded-md border-2 border-separate border-spacing-5 border-slate-700 bg-[#1e2638] mb-10">
            <caption className="mb-10">
              <h2 className="font-semibold text-2xl text-slate-200 text-left">
                Block No.
                <span className="text-[#37BCF8]">{block.height}</span>
              </h2>
            </caption>
            <tbody>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Hash
                </th>
                <td className="px-1 text-slate-200">{block.hash}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  PrevHash
                </th>
                <td className="px-1 text-slate-200">
                  <Link to={`/block/${block.prevHash}`}>{block.prevHash}</Link>
                </td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Mined On
                </th>
                <td className="px-1 text-slate-200">
                  {getDate(block.timestamp, Time.SEC)}
                </td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Height
                </th>
                <td className="px-1 text-slate-200">{block.height}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Nonce
                </th>
                <td className="px-1 text-slate-200">{block.nonce}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Difficulty
                </th>
                <td className="px-1 text-slate-200">{block.difficulty}</td>
              </tr>
              <tr className="text-lg p-5">
                <th className="w-1/12 border-r-2 border-slate-700 text-[#37BCF8] pr-3">
                  Miner
                </th>
                <td className="px-1 text-slate-200">
                  <Link to={`/address/${block.miner}`}>
                    {slicingAddress(block.miner)}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="font-semibold text-2xl text-slate-200 mb-10">
            Block has
            <span className="text-[#37BCF8]">{` ${block.transactions.length} `}</span>
            Transaction List
          </h2>
          {block.transactions.slice(offset, offset + limit).map((tx, index) => {
            return (
              <div key={tx.id}>
                {TxPage(tx, block.transactions.length - (index + offset))}
              </div>
            );
          })}
          <Paging
            count={block.transactions.length}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default BlockPage;
