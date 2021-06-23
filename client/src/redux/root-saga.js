import { all, call } from "redux-saga/effects";
import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.saga";
import { cartSagas } from "./cart/cart.sagas";



export default function* rootSaga() {
// by using the yield all call we are able to actually call any number of sagas under the array and
// initialize them all in different task streams, individual tasks that only care abou the saga that they are looking for
// or listen for all at once, in this way we dont have to be running more run middleware
        yield all([call(shopSagas), call(userSagas),call(cartSagas)]);

}