import React from "react";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PCComponentList from "./PCComponent/PCComponentList";
import PCComponentDetail from "./PCComponent/PCComponentDetail";


export function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<Navigate to={"/bazar"} />} />
          <Route path="/bazar">
            <Route index element={<PCComponentList />} />
            <Route path="detail/:id" element={<PCComponentDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
