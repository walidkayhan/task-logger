import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Tasks from "./components/Tasks";
import Users from "./components/Users";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Tasks}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/users" component={Users}></Route>
        </Switch>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
