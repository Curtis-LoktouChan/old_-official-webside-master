import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import CustomerCenter from "./pages/customerCenter";
import UserProtocol from "./pages/userProtocol";
import SignUpSucceed from "./pages/signUp/signUpSucceed";
import SignUpFailed from "./pages/signUp/signUpFailed";

import CustomerForgotPassword from "./pages/customerForgotPassword";
import ChangeSucceed from "./pages/customerForgotPassword/changeSucceed";
import ChangeFailed from "./pages/customerForgotPassword/changeFailed";

import CustomerWork from "./pages/customerWork";
import SoftDownloadPage from "./pages/softDownload";

import WaitToDo from "./pages/waitToDo";
import WaitToLogin from "./pages/waitToLogin";
import CaseShow from "./pages/caseShow";

import ConnectUs from "./pages/connectUs";

import CourseCenter from "./pages/courseCenter";

import UserCenter from "./pages/userCenter";
import StudentNavigation from "./pages/userCenter/student";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/index.js";
import { persistor } from "./store/index.js";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/userProtocol" component={UserProtocol} />
              <Route path="/signUpSucceed" component={SignUpSucceed} />
              <Route path="/signUpFailed" component={SignUpFailed} />
              <Route path="/customerCenter" component={CustomerCenter} />
              <Route
                path="/customerForgotPassword"
                component={CustomerForgotPassword}
              />
              <Route path="/changeSucceed" component={ChangeSucceed} />
              <Route path="/changeFailed" component={ChangeFailed} />
              <Route path="/customerWork" component={CustomerWork} />
              <Route path="/softDownload" component={SoftDownloadPage} />
              <Route path="/waitToDo" component={WaitToDo} />
              <Route path="/waitToLogin" component={WaitToLogin} />
              <Route path="/connectUs" component={ConnectUs} />
              <Route path="/courseCenter" component={CourseCenter} />
              <Route path="/userCenter/student" component={StudentNavigation} />
              <Route path="/userCenter" component={UserCenter} />

              <Route path="/caseShow" component={CaseShow} />
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
