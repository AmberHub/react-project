import React from 'react';
import {Field} from "redux-form";

const LoginForm = (props) => {
	debugger;
	return <div>
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field placeholder="login" component="input" name="login"/>
			</div>

			<div>
				<Field placeholder="password" component="input" name="password"/>
			</div>

			<div>
				<Field component="input" type="checkbox" name="remember" /> remember me
			</div>

			<div>
				<button type="submit">Log In</button>
			</div>
		</form>
	</div>
}
 
export default LoginForm;