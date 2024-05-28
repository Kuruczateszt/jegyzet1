import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import { ChessListPage } from "./Lista";
import { ChessCreatePage } from "./Ujchess";
import { ChessSinglePage } from "./SakkId";
import { ChessModPage } from "./SakkMod";
import { ChessDelPage } from "./SakkTorol";


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Sakk táblák</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/Ujchess'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új Chess</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<ChessListPage />} />
        <Route path="/Ujchess" exact element={<ChessCreatePage />} />
        <Route path="/Chess/:ChessId" exact element={<ChessSinglePage />} />
        <Route path="/mod-Chess/:ChessId" exact element={<ChessModPage />} />
        <Route path="/del-Chess/:ChessId" exact element={<ChessDelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
