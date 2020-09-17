import React from 'react';
import { reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import {Field} from "redux-form";
import { require } from "./../utils/validate.js";
import s from "./Login.module.css";
import { createField } from "./../utils/completeFormComponents"
import {Input} from "./../utils/completeFormComponents.jsx";


const Login = (props) => {

	let onSubmitLogin = (values) => {
   		props.loginTC(values.email, values.password, values.rememberMe, values.captcha);
   		props.reset();
	}

	if (props.isAuth)
		return <Redirect to={"/profile"} />

	return <div>
		<h1>login</h1>
		<LoginFormWith captchaUrl={props.captchaUrl} onSubmit={onSubmitLogin} />
	</div>
}


const LoginForm = (props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
		<span className={props.error ? "" : s.noneDisplay}>{props.error}</span>
				{createField("login", Input, "email", [require])}
				{createField("password", Input, "password", [require], {type : "password"})}
				{createField(null, Input, "rememberMe", null, {type : "checkbox"}, "Remember me")}
				{props.captchaUrl &&
				 <div>
					<img src={props.captchaUrl} alt="captcha" />
					{createField("Captcha", Input, "captcha", [require])}
				</div>}
			<div>
				<button type="submit">Sign In</button>
			</div>
		</form>
		<a href="https://social-network.samuraijs.com/signUp"><button>Sign Up</button></a>
	</div>
}


let LoginFormWith = reduxForm( { form : "login" } )(LoginForm);



export default Login;