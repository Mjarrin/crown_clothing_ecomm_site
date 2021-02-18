import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


var config = {
    apiKey: "AIzaSyAzVt-8k5w0408IBWkx7KDbRvr3fj2yGd8",
    authDomain: "crown-db-46b37.firebaseapp.com",
    projectId: "crown-db-46b37",
    storageBucket: "crown-db-46b37.appspot.com",
    messagingSenderId: "211677761292",
    appId: "1:211677761292:web:827c46e5aa824b716a8329"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {

    // fire store gives us two types of objects references and snapshots
     if (!userAuth) return;

     const userRef = firestore.doc(`users/${userAuth.uid}`);

     const snapShot = await userRef.get();

    console.log(snapShot)
    if (!snapShot.exists) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData

        })
      } catch(error) {
        console.log("error creating user " , error.message)
      }
    }

    return userRef;

  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;