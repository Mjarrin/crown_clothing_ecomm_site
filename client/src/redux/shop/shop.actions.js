import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    payload : collectionsMap
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

// we are returning a function and inside of this function we are returning the function
// that gets the dispatch
// Redux Thunk detects actions that are not objects but functions , and it is going to ignore actions that are objects, through the function its going to give the dispatch functionality as the parameter , so when the promise resolves it has access to the dispatch in order to alter the reducer the objects that it needs. 
export const fetchCollectionsStartAsync = () => {
    return dispatch => {

   

    }
}
