import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }

  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      console.log("userAuth " , userAuth);

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);



        // snapshot representing the data stored in our datatbase
        // similar to the onAuth change
        // the data method gets the user properties
        // we mixed the auth library + Firestore objects
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
   
      } else {

        this.setState({currentUser: userAuth})

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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />

        </Switch>
      </div>
    )
  };
}

export default App;
