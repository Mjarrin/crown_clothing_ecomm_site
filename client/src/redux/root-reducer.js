import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// storage holding local and session storage
import storage from "redux-persist/lib/storage";


import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer.jsx";
import directoryReducer from "./directory/directory.reducer";
import shopDataReducer  from "./shop/shop.reducer";

const persistConfig = {
    key : "root",
    storage,

    // an array containing the string names 
    // of any of the reducers we want to store
    whitelist: ["cart"]
}


const rootReducer = combineReducers({

    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop : shopDataReducer

});

export default persistReducer(persistConfig, rootReducer)