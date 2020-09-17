export const getIsAuth = (state) => {
	return state.Auth.isAuth
}

export const getMyId = (state) => {
	return state.Auth.userId
}

export const getCaptchaUrl = (state) => {
	return state.Auth.captchaUrl
}