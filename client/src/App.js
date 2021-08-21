import React, { useEffect, lazy, Suspense } from 'react';
import logo from './logo.svg';
import { GlobalStyle } from './global.styles';

import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";

// import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import Header from "./components/header/header.component";
import Spinner from './components/spinner/spinner.component.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { selectCurrentUser } from "./redux/user/user.selectors";

import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));

const App = ({ checkUserSession, currentUser }) => {

  //  unsubscribeFromAuth = null;

  useEffect(() => {
    checkUserSession()
    // we would do something different if there was another parent component 
    // this now behaves like a componentdidmount
  }, [checkUserSession])


  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

  //   console.log("userAuth " , userAuth);

  //   if (userAuth) {

  //     const userRef = await createUserProfileDocument(userAuth);
  //     // snapshot representing the data stored in our datatbase
  //     // similar to the onAuth change
  //     // the data method gets the user properties
  //     // we mixed the auth library + Firestore objects
  //     userRef.onSnapshot(snapShot => {
  //      setCurrentUser({
  //         currentUser: {
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         }
  //       });
  //     });



  //   } 

  //     setCurrentUser(userAuth)

  //     // adding out categories programatically to firebase via fire store batch
  //     // addCollectionAndDocuments("collections",collectionsArray.map(({title,items})=> ({title,items})))

  // })

  // componentWillUnmount() {
  //   // used for closing the subscription
  //   this.unsubscribeFromAuth()

  // }
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
        </Suspense>

        <Route path="/checkout" component={CheckoutPage} />

        <Route exact path="/signin" render={() => currentUser ? (
          <Redirect to="/" />
        ) : (
          <SignInAndSignUp />
        )
        } />
    
        </ErrorBoundary>
      </Switch>
    </div>

  )

}

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview



})


const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())

})


export default connect(mapStateProps, mapDispatchToProps)(App);
