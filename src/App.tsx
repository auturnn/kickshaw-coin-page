import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlockPage from "./page/BlockPage";
import BlocksPage from "./page/BlocksPage";
import Home from "./page/HomePage";
import MempoolPage from "./page/MempoolPage";
import NavbarPage from "./page/NavbarPage";

function App() {
  return (
    <Router>
      <NavbarPage />
      <div className="px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="/block/:hash" element={<BlockPage />} />
          <Route path="/mempool" element={<MempoolPage />} />
        </Routes>
      </div>
    </Router>
    // </div>
  );
}

export default App;
