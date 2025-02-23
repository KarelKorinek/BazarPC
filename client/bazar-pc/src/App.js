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
import { useSession } from "./context/session";
import { deleteData } from "./utilities/fetch";
import CookieConsent from "./context/cookieConsent";
import { BASE_URL } from "./constants/GlobalConstants";


export function App() {

  const { session, setSession } = useSession();

  const handleLogout = () => {
    deleteData(`${BASE_URL}/api/user/account`)
      .finally( () => setSession({
        data: null,
        status: "unauthorized"
      }));
  }

  return (
    <Router>
      <div className="container-fluid">
        <nav className="nav nav-pills justify-content-end">
          <li className="nav-item">
            <NavLink className="nav-link " to="/bazar" end>Hlavní stránka</NavLink>
          </li>

          <>
            { session.data ?
                            <>
                              <li className="nav-item">
                                <NavLink className="nav-link" to="bazar/component/create" end>Přidat inzerát</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" to={`bazar/components/${session.data.id}`} end>Moje inzeráty</NavLink>
                              </li>
                              <li className="nav-item">
                                <button className="nav-link " onClick={handleLogout}>Odhlásit se</button>
                              </li>
                              <li className="nav-item nav-link text-primary fw-bold">
                                {session.data.email}
                              </li>
                            </>
                            : session.status === "loading" ?
                            <>
                              <div className="spinner-border spinner-border-sm" role="status"></div>
                              <span className="visually-hiden">Loading...</span>
                            </>
                            :
                            <>
                              <li className="nav-item">
                                <NavLink className="nav-link" to="bazar/user/" end>Registrace</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" to="bazar/user/account" end>Přihlásit se</NavLink>
                              </li>
                            </>                           
            }
          </>
        </nav>
      </div>
      <div>
        <Routes>
          <Route index element={<Navigate to={"/bazar"} />} />
          <Route path="/bazar">
            <Route index element={<PCComponentList />} />
            <Route path="detail/:id" element={<PCComponentDetail />} />
            <Route path="component/create" element={<PCComponentForm />} />
            <Route path="component/edit/:id" element={<PCComponentForm />} />
            <Route path="components/:userId" element={<PCComponentList key={window.location.pathname}/>} />
            <Route path="user" element={<UserForm />} />
            <Route path="user/account" element={<LoginForm />} />
          </Route>
        </Routes>
      </div>

      <div>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
