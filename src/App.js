import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import Universities from "./Universities/Universities";
import University from "./University/University";
import Specialties from "./Specialties/Specialties";
import "./App.css";
import Chances from "./Chances/Chances";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main">
          <Switch>
            <Route path="/universities" component={Universities} />
            <Route path="/chances" component={Chances} />
            <Route path="/specialties" component={Specialties} />
            <Route path="/university" component={University} />
            <Redirect to="/universities" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
