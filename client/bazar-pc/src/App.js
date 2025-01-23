import React from "react";
import { NavLink } from "react-router-dom";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PCComponentList from "./PCComponent/PCComponentList";
import PCComponentDetail from "./PCComponent/PCComponentDetail";
import PCComponentForm from "./PCComponent/PCComponentForm";


export function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="nav nav-pills justify-content-end">
          <NavLink className="nav-link " to="/bazar" end>Hlavní stránka</NavLink>
          <NavLink className="nav-link" to="bazar/component/create" end>Přidat inzerát</NavLink>
          <NavLink className="nav-link" to="bazar/person/components" end>Mé inzeráty</NavLink>
          <NavLink className="nav-link" to="bazar/person/create" end>Registrace</NavLink>
          <NavLink className="nav-link" to="bazar/person/signin" end>Přihlásit se</NavLink>
        </nav>
      </div>
      <div>
        <Routes>
          <Route index element={<Navigate to={"/bazar"} />} />
          <Route path="/bazar">
            <Route index element={<PCComponentList />} />
            <Route path="detail/:id" element={<PCComponentDetail />} />
            <Route path="component/create" element={<PCComponentForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
