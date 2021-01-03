import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contributors from "./components/Contributors";
import ViewClassification from './components/ViewClassification'
import Header from "./components/Header";
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import "./style.css";

export default function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/ViewClassification/:id">
              <ViewClassification />
              </Route>
            <Route path="/Contributors" component={Contributors} />
            <Route path="/About" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
