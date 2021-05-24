import { AppStateType } from "../utils/types"

export const getIsAuth = (state: AppStateType) => {
	return state.Auth.isAuth
}

export const getUserId = (state: AppStateType) => {
	return state.Auth.userId
}

export const getCaptchaUrl = (state: AppStateType) => {
	return state.Auth.captchaUrl
}
export const getLogin = (state: AppStateType) => {
	return state.Auth.login
}
