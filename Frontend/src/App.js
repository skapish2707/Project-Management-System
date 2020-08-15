import React from "react";
import "./App.css";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Student from "./Pages/Student";
import Yami from "./Pages/Yami";
import Faculty from "./Pages/Faculty";
import DataFilledAdmin from "./components/Admin-component/DataFilledAdmin";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/faculty" exact component={Faculty} />
        <Route path="/student" exact component={Student} />
        <Route path="/yami" exact component={Yami} />
        <Route path="/astah" exact component={DataFilledAdmin} />
        <Route path="*" component={NotFound} />
      </Switch>
      <footer></footer>
    </Router>
  );
}

export default App;
