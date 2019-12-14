import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import Reducer from "./Reducer";

let CombineReducers = combineReducers({
    partOfTheState: Reducer
});

const store = createStore(CombineReducers, applyMiddleware(thunk));
export default store;