import React from 'react';
import LoginForm from "./LoginForm.jsx";
import { reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";

class Login extends React.Component {

	submitForm = (values) => {
   		this.props.loginTC(values.email, values.password, values.rememberMe)
	}

	render = () => {
	return <div>
		<h1>login</h1>
		<LoginFormWith onSubmit={this.submitForm} />
	</div>
	} 
}


let LoginFormWith = reduxForm( { form : "login" } )(LoginForm);

export default Login;