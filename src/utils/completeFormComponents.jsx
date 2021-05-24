import React from 'react';
import s from "./../Login/Login.module.css";
import { Field } from "redux-form";

const FormFields = ({meta, input, children, ...props}) => {
	let errorCreate = meta.error && meta.touched;
	return <div>
			{children}
			<div className={errorCreate ? "" : s.noneDisplay}>{meta.error}</div>
		</div>
}

export const Input = (props) => {
	const {meta, input, childen, ...restProps} = props;
	let errorCreate = meta.error && meta.touched;
	return <FormFields {...props}>
		<input className={errorCreate ? s.error : ""} {...input} {...restProps}/>
	</FormFields>
}

export const Textarea = (props) => {
	const {meta, input, children, ...restProps} = props;
	let errorCreate = meta.error && meta.touched;
	return <FormFields {...props}>
		<textarea className={errorCreate ? s.error : ""} {...input} {...restProps}>
	</textarea></FormFields>
}

export const TextareaWithoutErrorCreator = (props) => {
	const {meta, input, children, ...restProps} = props;
	return <textarea {...input} {...restProps} />
}

export const createField = (placeholder, component, name, validate, props = {}, text = "") => {
	 return <> <Field component={component} name={name} validate={validate}
		placeholder={placeholder} {...props}/> {text} </>
}
