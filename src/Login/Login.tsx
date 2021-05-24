import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import { Redirect } from "react-router-dom";
import { require } from "../utils/validate";
import s from "./Login.module.css";
import { createField } from "../utils/completeFormComponents"
import {Input} from "../utils/completeFormComponents";
import { ValuesSubmitType } from './LoginContainer';


type LoginPropsType = {
	isAuth : boolean
	captchaUrl : string | null

	onSubmitLogin : (values : ValuesSubmitType) => void
}

const Login: React.FC<LoginPropsType> = ({isAuth, captchaUrl, onSubmitLogin}) => {

	if (isAuth)
		return <Redirect to={"/profile"} />

	return <div>
		<h1>login</h1>
		<LoginFormWith captchaUrl={captchaUrl} onSubmit={onSubmitLogin} />
	</div>
}


type LoginFormPropsType = {
	captchaUrl : string | null
}

const LoginForm: React.FC<InjectedFormProps<ValuesSubmitType, LoginFormPropsType> & LoginFormPropsType> = ({handleSubmit, error, captchaUrl }) => {
	return <div>
		<form onSubmit={handleSubmit}>
		<span className={error ? "" : s.noneDisplay}>{error}</span>
			<div>
				{createField("login", Input, "email", [require])}
			</div>
			<div>
				{createField("password", Input, "password", [require], {type : "password"})}
			</div>
			<div>
				{createField(null, Input, "rememberMe", null, {type : "checkbox"}, "Remember me")}
			</div>
				
			{captchaUrl &&
				 <div>
					<img src={captchaUrl} alt="captcha" />
					<div>
						{createField("Captcha", Input, "captcha", [require])}
					</div>
				</div>}
			<div>
				<button type="submit">Sign In</button>
			</div>
		</form>
		<a href="https://social-network.samuraijs.com/signUp"><button>Sign Up</button></a>
		<a href="https://social-network.samuraijs.com/account"><button>Get my API KEY</button></a>
	</div>
}


let LoginFormWith = reduxForm<ValuesSubmitType, LoginFormPropsType>( { form : "login" } )(LoginForm);



export default Login;