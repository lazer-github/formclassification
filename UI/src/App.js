import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contributors from "./components/Contributors";
import Header from "./components/Header";
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import "./style.css";

export default function App() {
  const FORMSURL = "/api/forms";

  const FETCH = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions);
    return await response.json();
  };
  const [formsList, setForms] = useState([]);

  useEffect(() => {
    FETCH(`${FORMSURL}`, { method: "GET" }).then(s => setForms(s));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home data={formsList} />
            </Route>
            <Route path="/Contributors" component={Contributors} />
            <Route path="/About" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
