import ApiConnector from "../Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BlockChainStatusObject,
  HashLength,
  sliceHash,
} from "../object/BlockObject";
import { LoadingPage } from "./LoadingPage";

const ChainStatus = () => {
  const [status, setStatus] = useState<BlockChainStatusObject>();

  useEffect(() => {
    new ApiConnector("/status").getChainStatus().then((res) => setStatus(res));
  }, []);

  if (status === undefined) {
    return LoadingPage("Loading Status...");
  }

  return (
    <div className="flex flex-wrap w-[380px] bg-[#20283A] px-2 border border-slate-500 rounded-md">
      <div className="text-gray-200 font-semibold w-40 border-r border-r-slate-500">
        <div className="container-fluid text-[#37BCF8]">Peers</div>
        <div className="container-fluid text-[#37BCF8]">Height</div>
        <div className="container-fluid text-[#37BCF8]">CurrentDifficulty</div>
        <div className="container-fluid text-[#37BCF8]">NewestHash</div>
      </div>
      <div className="pl-6  text-md">
        <div className="container-fluid">
          {status.peers === undefined ? 0 : status.peers}
        </div>
        <div className="container-fluid">{status.height}</div>
        <div className="container-fluid">{status.currentDifficulty}</div>
        <div className="container-fluid text-amber-300">
          <Link to={`/block/${status.newestHash}`}>
            {sliceHash(status.newestHash, HashLength.STATUS)}
          </Link>
        </div>
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
    <nav className="relative w-full mx-auto flex flex-wrap mb-10 items-center border-b border-b-slate-600 justify-between py-3">
      {loading ? (
        LoadingPage("Loading...")
      ) : (
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6 text-white">
          <div className="container-fluid p-2">
            <Link to={`/`} className="text-2xl font-semibold">
              KickshawCoin
            </Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <Link to={`/mempool`}>Mempool</Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <Link to={`/transactions`}>Transaction</Link>
          </div>
          <div className="container-fluid font-semibold text-xl">
            <a href="https://auturnn.notion.site/Kickshaw-Coin-Project-6c84570a93c041a895abdc205144fa59">
              Docs
            </a>
          </div>
          <ChainStatus />
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;
