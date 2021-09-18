import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { UserLoginTemplate } from "./HOC/Templates/UserLoginTemplate";
import { history } from "./utility/History/history";
import { CyberbugsTemplate } from "./HOC/Templates/CyberbugsTemplate";
import Home from "./pages/ProjectDetail";
import Loading from "./components/Loading";
import PageNotFound from "./pages/PageNotFound";
import CreateProject from "./pages/CreateProject";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetail from "./pages/ProjectDetail";
import DrawerCyberBugsHOC from "./HOC/Drawer/DrawerCyberBugsHOC";
import ModalTask from "./components/ModalTask";
function App() {
  return (
    <BrowserRouter>
      <Router history={history}>
        <DrawerCyberBugsHOC></DrawerCyberBugsHOC>
        <Loading></Loading>
        <ModalTask></ModalTask>

        <Switch>
          <UserLoginTemplate
            exact
            path="/login"
            Component={Login}
            redirectPath="/"
          />
          <CyberbugsTemplate
            exact
            path="/projectDetail"
            Component={ProjectDetail}
            redirectPath="/login"></CyberbugsTemplate>
          <CyberbugsTemplate
            exact
            path="/projectDetail/:projectId"
            Component={ProjectDetail}
            redirectPath="/login"></CyberbugsTemplate>
          <CyberbugsTemplate
            exact
            path="/createproject"
            Component={CreateProject}
            redirectPath="/login"></CyberbugsTemplate>
          <CyberbugsTemplate
            exact
            path="/"
            Component={ProjectManagement}
            redirectPath="/login"></CyberbugsTemplate>
          <CyberbugsTemplate
            exact
            path="/projectmanagement"
            Component={ProjectManagement}
            redirectPath="/login"></CyberbugsTemplate>
          <Route path="*" component={PageNotFound}></Route>
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
