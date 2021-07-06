import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./constants/routes";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import AccountPage from "./components/Account";
import LandingPage from "./components/Landing";
import withAuthentication from "./components/withAuthentication";
import { auth } from './firebase/firebase';
import SellerForm from './components/seller/Sellerform';
import BuyerForm from './components/buyer/Buyerform';
import IssuePage from './components/Issue';

const App = () => (
  <>
    {
      auth.currentUser === null ?
      // Without Authorization
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={routes.ISSUE} component={IssuePage} />
        </Switch>
      </BrowserRouter>
      :
      // With Authorization
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route exact path={routes.BUYER} component={BuyerForm} />
          <Route exact path={routes.SELLER} component={SellerForm} />
          <Route exact path={routes.ISSUE} component={IssuePage} />
        </Switch>
      </BrowserRouter>
    }
  </>
);

export default withAuthentication(App);
