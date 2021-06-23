// listens to a specific action that we pass
import { takeEvery, call, put, take, delay, all, takeLatest } from "redux-saga/effects";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import ShopActionTypes from "./shop.types";
import { 
fetchCollectionsSuccess,
fetchCollectionsFailure
} from "./shop.actions";

/*
Sagas run concurrently in a way that it doesn't block the execution. It doesnt need to wait for specific requests takeEvery (saga listener) it creates a non blocking code in order to not stop our application, to continue running other sagas 
or whatever the user wants to do , it doesnt pause the javascript
*/

export function* fetchCollectionsAsync() {
    try {

        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        
        // yield call takes as its first argument some function or method and the subsequent 
        // arguments will be the parameters we pass into the function call
        // yield allows us to defer back to the saga middle ware in case we want to cancel 
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        // put is the saga effect for creating actions exactly as dispatch

        console.log("collection map " , collectionsMap)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch(error) {

        yield put(fetchCollectionsFailure(error.message))

    }

    // // update listener on snapshot/renders (observable)
    // // collectionRef.onSnapshot(async snapshot => {
    //     collectionRef.get().then(snapshot => {
    //     // instead of having the observable we can also do a promised based
    //     // system using.get().then the only difference is that the api call is only
    //     // called on component did mount is not constantly listening as with the observer 
  
    //       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //         dispatch(fetchCollectionsSuccess(collectionsMap));
    //     }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

}

// its going to pause whenever a certain action type that we want comes in
// note that all generator functions must have yields inside of them
export function* fetchCollectionsStart() {
    // first paremeter the action to listen for , and the second one is
    // the generator function we are waiting for it to do the expected thing that we want 
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync )
}

// sagas can cancel any previous calls through the yields , we yield control to the saga
// back to the library



export function* incrementSaga() {
    while(true) {
        yield take("INCREMENT")
        console.log("I am incremented")
        yield delay(5000)
    }
}

// takeLatest cancels the previous sagas and returns the latest one (the one that resolves)
// delay is the same as set timeout 

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
    
}
