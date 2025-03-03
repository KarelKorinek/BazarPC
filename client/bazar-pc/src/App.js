import React from "react";
import Navbar from "./Navbar";

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
import CookieConsent from "./context/cookieConsent";


export function App() {

  return (
    <Router>
      <div className="nav-margin">
        {/* Navigation menu */}
        <Navbar />
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
