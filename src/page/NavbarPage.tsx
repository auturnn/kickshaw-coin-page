import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiConnector from "../Api";
import { BlockChainStatusObject, omissionString } from "../object/BlockObject";

const ChainStatus = () => {
  const [status, setStatus] = useState<BlockChainStatusObject>();

  useEffect(() => {
    new ApiConnector("/status").getChainStatus().then((res) => setStatus(res));
  }, []);

  if (status === undefined) {
    return <div>BlockChain Status has not found</div>;
  }

  return (
    <div className="pl-6 w-90 text-[#37BCF8] text-md">
      <div className="container-fluid">{status.height}</div>
      <div className="container-fluid">{status.currentDifficulty}</div>
      <div className="container-fluid">
        <Link to={`/block/${status.newestHash}`}>
          {omissionString(status.newestHash)}
        </Link>
      </div>
    </div>
  );
};

const NavbarPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <nav className="relative w-full flex flex-wrap mb-10 items-center border-b border-b-slate-600 justify-between py-3 opacity-90">
      {loading ? (
        <h1>Loading BlockChain Status...</h1>
      ) : (
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6 text-white">
          <div className="container-fluid border border-slate-900 rounded-md p-2">
            <Link to={`/`} className="text-2xl font-semibold">
              KickshawCoin
            </Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <Link to={`/blocks`} className="">
              Blocks
            </Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <Link to={`/mempool`} className="">
              Mempool
            </Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <Link to={`/`} className="">
              Transaction
            </Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <a className="" href="http://api.kickshaw-coin.com">
              Docs
            </a>
          </div>
          <div className="flex flex-wrap bg-[#20283A] px-2 border border-slate-500 rounded-md">
            <div className="text-gray-200 font-bold w-40 border-r border-r-slate-500">
              <div className="container-fluid">Height </div>
              <div className="container-fluid">CurrentDifficulty</div>
              <div className="container-fluid">NewestHash</div>
            </div>
            <ChainStatus />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;
