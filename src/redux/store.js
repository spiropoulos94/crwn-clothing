import {createStore, applyMiddleware} from "redux";
import { persistStore } from "redux-persist";


import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];

console.log("process", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development"){
 middlewares.push(logger);
}

 const store = createStore(rootReducer, applyMiddleware(...middlewares))

 const persistor = persistStore(store); // this is a persisted version of our store

export  {store, persistor};