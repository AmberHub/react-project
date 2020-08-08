import {createStore, combineReducers} from "redux";
import dialogReducer from './dialogReducer.js';
import profileReducer from './profileReducer.js';
import sidebarReducer from './sidebarReducer.js';
import usersReducer from './usersReducer.js';
import authReducer from './authReducer.js';

let reducers = combineReducers({
	Profile : profileReducer,
	Dialog : dialogReducer,
	Sidebar : sidebarReducer,
	UsersPage : usersReducer,
	Auth : authReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;