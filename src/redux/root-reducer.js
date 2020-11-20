import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage"; //this imports the local storage lib. for session storage check
// redux-persist docs

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
    key : "root", //dilwnei o poio shmeio tou reducer theloume na kanoume store. Edw ta theloume ola ara root
    storage,
    whitelist:["cart"]
}

const rootReducer =  combineReducers({
    user: userReducer,
    cart:cartReducer
});

export default persistReducer(persistConfig, rootReducer);