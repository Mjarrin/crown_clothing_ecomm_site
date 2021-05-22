import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import logger from "redux-logger";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./root-saga";

const sagaMiddlware = createSagaMiddleware()

const middlewares = [sagaMiddlware];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger)
}



export const store = createStore(rootReducer, applyMiddleware(...middlewares))

// here is where we pass each of our individual sagas
sagaMiddlware.run(rootSaga)

// its essentially a persisted version of our store
export const persistor = persistStore(store)

export default { store, persistor };
