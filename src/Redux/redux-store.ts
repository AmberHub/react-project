import {createStore, combineReducers} from "redux";
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import appReducer from "./appReducer";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";

let rootReducer = combineReducers({
	Profile : profileReducer,
	Dialog : dialogsReducer,
	Sidebar : sidebarReducer,
	UsersPage : usersReducer,
	Auth : authReducer,
	form : formReducer,
	app : appReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type rootReducerType = typeof rootReducer

//@ts-ignore
window.store = store;

export default store;