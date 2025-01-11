import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PCComponentList from "./PCComponent/PCComponentList";


export function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<Navigate to={"/index"} />} />
          <Route path="/index">
            <Route index element={<PCComponentList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
