import { setAuthUserData } from "./actionCreators.js";
import {authAPI} from "./../API/api.js";

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
		isAuth: true };

		default : return state;
	}
 };


export let isAuthTC = () => (dispatch) => {
	authAPI.isAuthed().then( data => {
		dispatch(setAuthUserData(data.data))})
}


 export default authReducer;