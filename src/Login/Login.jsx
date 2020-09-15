import React from 'react';
import { reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import {Field} from "redux-form";
import { require } from "./../utils/validate.js";
import s from "./Login.module.css";
import { createField } from "./../utils/completeFormComponents"
import {Input} from "./../utils/completeFormComponents.jsx";


class Login extends React.Component {

	onSubmit = (values) => {
   		this.props.loginTC(values.email, values.password, values.rememberMe);
   		this.props.reset("login");
	}

	render = () => {
	if (this.props.isAuth)
		return <Redirect to={"/profile"} />

	return <div>
		<h1>login</h1>
		<LoginFormWith onSubmit={this.onSubmit} />
	</div>
	} 
}


const LoginForm = (props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
				{createField("login", Input, "email", [require])}
				{createField("password", Input, "password", [require], {type : "password"})}
				{createField(null, Input, "rememberMe", null, {type : "checkbox"}, "Remember me")}
			<div>
				<button type="submit">Sign In</button>
			</div>
			<span className={props.error ? "" : s.noneDisplay}>{props.error}</span>
		</form>
			<a href="https://social-network.samuraijs.com/signUp"><button>Sign Up</button></a>
	</div>
}

let LoginFormWith = reduxForm( { form : "login" } )(LoginForm);



export default Login;