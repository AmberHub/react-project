import React from 'react';
import {Field} from "redux-form";
import LoginForm from "./LoginForm.jsx";
import { reduxForm } from "redux-form";

const Login = (props) => {
	return <div>
		<h1>login</h1>
		<LoginFormWith onSubmit={onSubmit} />
	</div>
}

let onSubmit = (values) => {
	
}

let LoginFormWith = reduxForm( { form : "login" } )(LoginForm);

export default Login