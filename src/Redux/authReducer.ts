import { authAPI, securityAPI } from "../API/api";
import { stopSubmit } from "redux-form";


const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const GET_CAPTCHA = "GET_CAPTCHA";


type SetCaptchaACType = {
	type : typeof GET_CAPTCHA
	url: string
}
let setCaptcha = (url: string): SetCaptchaACType => ({type : GET_CAPTCHA, url});


type SetAuthUserDataACType = {
	type : typeof SET_AUTH_USER_DATA
	isAuth : boolean
	data : AuthUserDataType
}
let setAuthUserData = (data: AuthUserDataType, isAuth: boolean): SetAuthUserDataACType => ({type : SET_AUTH_USER_DATA, data, isAuth});


type initialStateType = typeof initialState;

type AuthUserDataType = {
	login: string | null
	email: string | null
	id: number | null
}

type actionsType = SetCaptchaACType | SetAuthUserDataACType

let initialState = {
	login: null as string | null,
	email: null as string | null,
	userId: null as number | null,
	isAuth: false,
	captchaUrl : null as string | null
};

const authReducer = (state=initialState, action: actionsType): initialStateType => {
	switch(action.type) {

		case SET_AUTH_USER_DATA :
		return { ...state,
		login: action.data.login,
		email: action.data.email,
		userId: action.data.id,
		isAuth: action.isAuth};

		case GET_CAPTCHA :
		return {...state, captchaUrl : action.url}

		default : return state;
	}
 };


export let isAuthTC = () => async (dispatch: Function) => {
	let data = await authAPI.isAuthed();
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(data.data, true))
		}

}

export let loginTC = ( email: string | null, password: string | null, rememberMe: boolean, captcha?: string ) => async (dispatch: Function) => {
	let data = await authAPI.login( email, password, rememberMe, captcha )
		if(data.resultCode === 0) {
			let data = await authAPI.isAuthed()
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(data.data, true))
		}else if (data.resultCode === 1) {
			dispatch(stopSubmit("login", { _error : data.messages ? "Please check your API KEY in scr/API_KEY.js" : "something went wrong"}))
		}
	}
		if(data.resultCode === 10) {
			await getCaptchaTC(dispatch)
			dispatch(stopSubmit("login", { _error : data.messages ? data.messages : "something went wrong"}))
		} else {
			dispatch(stopSubmit("login", { _error : data.messages ? data.messages : "something went wrong"}))
		}
}

export let getCaptchaTC = async (dispatch: Function) => {
		let url = await securityAPI.getCaptcha()
			dispatch(setCaptcha(url.url))
}

export let logoutTC = () => async (dispatch: Function) => {
	let data = await authAPI.logout()
		if(data.resultCode === 0) 
		dispatch(setAuthUserData({login : null, email : null, id : null}, false))
}

 export default authReducer;