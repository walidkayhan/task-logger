import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Tasks from "./components/pages/Tasks";
import Users from "./components/pages/Users";
import About from "./components/pages/About";

import Store from "./store/Store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <div className="wrapper">
          <Header />

          <div className="container">
            <Switch>
              <Route exact path="/" component={Tasks}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/users" component={Users}></Route>
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
