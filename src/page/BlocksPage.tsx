import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blockApiConnector } from "../Api";
import {
  BlockObject,
  getDate,
  HashLength,
  sliceHash,
  Time,
} from "../object/BlockObject";
import { slicingAddress } from "../object/TransactionObject";
import { LoadingPage } from "./LoadingPage";
import Paging from "./Pagination";

const BlockPage = ({
  hash,
  prevHash,
  height,
  timestamp,
  miner,
  difficulty,
  nonce,
}: BlockObject) => {
  return (
    <tr
      key={hash}
      className="border-b border-b-slate-600 text-lg text-center text-slate-200"
    >
      <td>{height}</td>
      <td className=" text-amber-300">
        <Link to={`/block/${hash}`}>{sliceHash(hash, HashLength.BLOCKS)}</Link>
      </td>
      {prevHash === "-" ? (
        <td>
          <Link to={`/block/${prevHash}`}>
            {sliceHash(prevHash, HashLength.BLOCKS)}
          </Link>
        </td>
      ) : (
        <td className=" text-amber-300">
          <Link to={`/block/${prevHash}`}>
            {sliceHash(prevHash, HashLength.BLOCKS)}
          </Link>
        </td>
      )}
      <td className=" text-amber-300">
        <Link to={`/address/${miner}`}>{slicingAddress(miner)}</Link>
      </td>
      <td>{nonce}</td>
      <td>{difficulty}</td>
      <td>{getDate(timestamp, Time.DATE)}</td>
    </tr>
  );
};

const BlocksPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<Array<BlockObject>>();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const getBlocks = async () => {
    const json = await blockApiConnector.getBlocks();
    setBlocks(json);
  };

  useEffect(() => {
    //5초마다 실행하여 업데이트
    //현재 페이지 첫 로드에도 5초가 걸리니 이 부분 수정바람
    getBlocks();
    setLoading(false);
  }, []);

  if (blocks === undefined) {
    return LoadingPage("Blocks List Loading...");
  }

  return (
    <div>
      {loading ? (
        LoadingPage("Page Loading...")
      ) : (
        <div key="blocksList" className="flex w-[85%] m-auto">
          <table className="w-full mx-auto mb-3 border-separate border-spacing-5 border-2 border-slate-700 rounded-md bg-[#1e2638] ">
            <caption className="text-slate-200 text-2xl font-bold text-left mb-10">
              Lastest Block
            </caption>
            <thead className="w-full">
              <tr className="text-[#37BCF8] text-lg">
                <th className="w-1/12">Number</th>
                <th>Hash</th>
                <th>PrevHash</th>
                <th>Miner</th>
                <th>Nonce</th>
                <th>Difficulty</th>
                <th>Mined</th>
              </tr>
            </thead>
            <tbody>
              {blocks.slice(offset, offset + limit).map((block) => {
                return BlockPage(block);
              })}
            </tbody>
          </table>
        </div>
      )}
      <Paging count={blocks.length} page={page} setPage={setPage} />
    </div>
  );
};

export default BlocksPage;
