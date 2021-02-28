import React from "react";
import "./App.css";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Student from "./Pages/Student";
import Yami from "./Pages/Yami";
import Faculty from "./Pages/Faculty";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import NotFound from "./components/NotFound";
import PrefPage from "./Pages/PrefPage";
import Hod from "./Pages/Hod";
import HodPrefPage from "./components/Hod-component/HodPrefPage";
import AdminGroupsPage from "./components/Admin-component/AdminGroupsPage";
import AdminGuidePage from "./components/Admin-component/AdminGuidePage";
import AdminArchives from "./components/Admin-component/AdminArchives";
import Guide from "./Pages/Guide";
import GuidePrefPage from "./components/Guide Component/GuidePrefPage";
import forgetPassword from "./Pages/forgetPassword";
import resetPassword from "./Pages/resetPassword";
import HodGroupsPage from "./components/Hod-component/HodGroupsPage";
import ViewProposal from "./Pages/ViewProposal";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/hod" exact component={Hod} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/faculty" exact component={Faculty} />
        <Route path="/student" exact component={Student} />
        <Route path="/yami" exact component={Yami} />
        <Route path="/guide" exact component={Guide} />
        <Route path="/cp@2707user" exact component={ChangePassword} />
        <Route path="/admin/prefs/:id" exact component={PrefPage} />
        <Route path="/hod/prefs/:id" exact component={HodPrefPage} />
        <Route path="/guide/prefs/:id" exact component={GuidePrefPage} />
        <Route path="/admin/groups" exact component={AdminGroupsPage} />
        <Route path="/admin/guides" exact component={AdminGuidePage} />
        <Route path="/admin/archives" exact component={AdminArchives} />
        <Route path="/forgetPassword" exact component={forgetPassword} />
        <Route path="/resetPassword/:id" exact component={resetPassword} />
        <Route path="/hod/groups" exact component={HodGroupsPage} />
        <Route path="/hod/groups/prefs/:id" exact component={GuidePrefPage} />
        <Route path="/viewProposal/:id" exact component={ViewProposal} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
