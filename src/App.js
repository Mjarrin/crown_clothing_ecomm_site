import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import Header from "./components/header/header.component";


import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { selectCurrentUser } from "./redux/user/user.selectors";


class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      console.log("userAuth " , userAuth);

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);
        // snapshot representing the data stored in our datatbase
        // similar to the onAuth change
        // the data method gets the user properties
        // we mixed the auth library + Firestore objects
        userRef.onSnapshot(snapShot => {
         setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });

    
   
      } else {

        setCurrentUser(userAuth)

      }
    })
  }

  componentWillUnmount() {
    // used for closing the subscription
    this.unsubscribeFromAuth()

  }

  render() {

    return (

      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Route exact path="/signin" render={() => this.props.currentUser ? (
            <Redirect to="/" />
            ) : (
              <SignInAndSignUp/>
            ) 
          } />

        </Switch>
      </div>
    )
  };
}

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser


})


const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser(user))

})

export default connect(mapStateProps,mapDispatchToProps)(App);
