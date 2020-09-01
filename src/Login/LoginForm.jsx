import React from 'react';
import {Field} from "redux-form";
import { require } from "./../utils/validate.js";
import s from "./Login.module.css";
import {Input} from "./../utils/completeFormComponents.jsx";


const LoginForm = (props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field placeholder="login" component={Input} name="email" validate={ [ require ] }/>
			</div>

			<div>
				<Field placeholder="password" component={Input} name="password" type="password" validate={ [ require ] }/>
			</div>

			<div>
				<Field component="input" type="checkbox" name="rememberMe"/> remember me
			</div>

			<div>
				<button type="submit">Log In</button>
			</div>
			<span className={props.error ? "" : s.noneDisplay}>{props.error}</span>
		</form>
	</div>
}
 
export default LoginForm;