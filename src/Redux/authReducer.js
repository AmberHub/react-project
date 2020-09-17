import { setAuthUserData, login, setCaptcha } from "./actionCreators.js";
import { authAPI, securityAPI } from "./../API/api.js";
import { stopSubmit } from "redux-form"




let initialState = {

	login: null,
	email: null,
	userId: null,
	isAuth: false,
	captchaUrl : null

};

const authReducer = (state=initialState, action) => {
	switch(action.type) {

		case "SET_AUTH_USER_DATA" :
		return { ...state,
		login: action.data.login,
		email: action.data.email,
		userId: action.data.id,
		isAuth: action.isAuth};

		case "GET_CAPTCHA" :
		return {...state, captchaUrl : action.url}

		default : return state;
	}
 };


export let isAuthTC = () => async (dispatch) => {
	let data = await authAPI.isAuthed();
		if(data.resultCode === 0)
			dispatch(setAuthUserData(data.data, true))
}

export let loginTC = ( email, password, rememberMe, captcha ) => async (dispatch) => {
	let data = await authAPI.login( email, password, rememberMe, captcha )
		if(data.resultCode === 0) {
			let data = await authAPI.isAuthed()
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(data.data, true))
		}}
		if(data.resultCode === 10) {
			getCaptchaTC(dispatch)
			dispatch(stopSubmit("login", { _error : data.messages ? data.messages : "something went wrong"}))
		} else {
			dispatch(stopSubmit("login", { _error : data.messages ? data.messages : "something went wrong"}))
		}
}

export let getCaptchaTC = async (dispatch) => {
		let url = await securityAPI.getCaptcha()
			dispatch(setCaptcha(url.url))
}

export let logoutTC = () => async (dispatch) => {
	let data = await authAPI.logout()
		if(data.resultCode === 0) 
		dispatch(setAuthUserData({login : null, email : null, userId : null}, false))
}

 export default authReducer;