import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddressInfoPage from "./page/AddressInfoPage";
import BlockPage from "./page/BlockPage";
import BlocksPage from "./page/BlocksPage";
// import Home from "./page/AddressInfoPage";
import MempoolPage from "./page/MempoolPage";
import NavbarPage from "./page/NavbarPage";
import "./css/nav.css";
function App() {
  return (
    <Router>
      <NavbarPage />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<BlocksPage />} />
          <Route path="/block/:hash" element={<BlockPage />} />
          <Route path="/mempool" element={<MempoolPage />} />
          <Route path="/address/:address" element={<AddressInfoPage />} />
        </Routes>
      </div>
    </Router>
    // </div>
  );
}

export default App;
