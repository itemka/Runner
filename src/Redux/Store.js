import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

let CombineReducers = combineReducers({

});

const store = createStore(CombineReducers, applyMiddleware(thunk));
export default store;