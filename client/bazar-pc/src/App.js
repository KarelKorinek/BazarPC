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
import UserForm from "./user/UserForm";
import LoginForm from "./user/LoginForm";

export function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="nav nav-pills justify-content-end">
          <NavLink className="nav-link " to="/bazar" end>Hlavní stránka</NavLink>
          <NavLink className="nav-link" to="bazar/component/create" end>Přidat inzerát</NavLink>
          <NavLink className="nav-link" to="bazar/user/components" end>Mé inzeráty</NavLink>
          <NavLink className="nav-link" to="bazar/user/" end>Registrace</NavLink>
          <NavLink className="nav-link" to="bazar/user/account" end>Přihlásit se</NavLink>
        </nav>
      </div>
      <div>
        <Routes>
          <Route index element={<Navigate to={"/bazar"} />} />
          <Route path="/bazar">
            <Route index element={<PCComponentList />} />
            <Route path="detail/:id" element={<PCComponentDetail />} />
            <Route path="component/create" element={<PCComponentForm />} />
            <Route path="user" element={<UserForm />} />
            <Route path="user/account" element={<LoginForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
