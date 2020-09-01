import { setAuthUserData, login } from "./actionCreators.js";
import { authAPI } from "./../API/api.js";
import { stopSubmit } from "redux-form"

let initialState = {

	login: null,
	email: null,
	userId: null,
	isAuth: false

};

const authReducer = (state=initialState, action) => {
	switch(action.type) {

		case "SET_AUTH_USER_DATA" :
		return { ...state,
		login: action.data.login,
		email: action.data.email,
		userId: action.data.id,
		isAuth: action.isAuth};

		default : return state;
	}
 };


export let isAuthTC = () => (dispatch) => {
	authAPI.isAuthed().then( data => {
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(data.data, true))}})
}

export let loginTC = ( email, password, rememberMe ) => (dispatch) => {
	authAPI.login( email, password, rememberMe ).then( data => {
		if(data.resultCode === 0) {
			authAPI.isAuthed().then( data => {
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(data.data, true))}})
		} else {
			dispatch(stopSubmit("login", { _error : data.message ? data.message : "something went wrong"}))
		}
})}

export let logoutTC = () => (dispatch) => {
	authAPI.logout().then( data => {
		if(data.resultCode === 0) 
		dispatch(setAuthUserData({login : null, email : null, userId : null}, false))
})}

 export default authReducer;