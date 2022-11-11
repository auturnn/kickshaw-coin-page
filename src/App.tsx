import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlockPage from "./page/BlockPage";
// import Blocks from "./component/BlockPage";
import BlocksPage from "./page/BlocksPage";
import Home from "./page/HomePage";

function App() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
      <Router>
        {/* <NavigateBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="/blocks/:hash" element={<BlockPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
