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


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;