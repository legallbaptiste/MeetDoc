import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import authReducers from "./authReducers";

const middlewares = [thunk];
const store = createStore(
	combineReducers({
		medcabs: reducer
	}),
	applyMiddleware(...middlewares)
);

export default store;
