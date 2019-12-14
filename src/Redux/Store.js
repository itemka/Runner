import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";

let CombineReducers = combineReducers({
    authState: AuthReducer
});

const store = createStore(CombineReducers, applyMiddleware(thunk));
export default store;