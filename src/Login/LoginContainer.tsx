import React from 'react'
import Login from "./Login"
import { loginTC } from "../Redux/authReducer"
import { connect } from "react-redux"
import { reset } from "redux-form"
import { getIsAuth, getCaptchaUrl } from "../Selectors/authSelectors"
import { checkNewDialogsTC } from "../Redux/dialogsReducer"
import { AppStateType } from "../utils/types"

type PropsType = ConnectedPropsType & DispatchPropsType & OwnProps

type ConnectedPropsType = {
	isAuth : boolean
    captchaUrl : string | null
}

type DispatchPropsType = {
	loginTC : (	email : string | null, password : string | null,
		rememberMe : boolean, captcha : string | null) => void
	
	reset : (formName: string) => void
	checkNewDialogsTC : () => void
}

type OwnProps = {

}

export type ValuesSubmitType = {
	email : string | null
	password : string | null
	rememberMe : boolean
	captcha : string | null
}

const LoginContainer: React.FC<PropsType> = ({loginTC, checkNewDialogsTC, ...props}) => {

	let onSubmitLogin = async (values: ValuesSubmitType) => {
   		await loginTC(values.email, values.password, values.rememberMe, values.captcha);
   		checkNewDialogsTC();
	}

    return <Login {...props} onSubmitLogin={onSubmitLogin} />

}


let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
    isAuth : getIsAuth(state),
    captchaUrl : getCaptchaUrl(state)
});


export default connect<ConnectedPropsType, DispatchPropsType, OwnProps, AppStateType>(mapStateToProps,
	{ loginTC, reset, checkNewDialogsTC } )(LoginContainer)

