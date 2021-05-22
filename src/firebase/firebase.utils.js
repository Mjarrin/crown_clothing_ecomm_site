import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { logDOM } from "@testing-library/dom";


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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef,obj)

    })

    return await batch.commit()
  } 


  firebase.initializeApp(config);

 export const convertCollectionsSnapshotToMap = (collections) => {

    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        // encodeURI gives you back a string where any character that a URL cannot
        // handle or process symbols or spaces it converts them in a version that the url
        // can actually read, and this case we will pass our route name
        routeName : encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items
      }

    })

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;

      return accumulator;

    },{})
  } 



  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  googleProvider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth)
      }, reject)
    });
  }

  export default firebase;