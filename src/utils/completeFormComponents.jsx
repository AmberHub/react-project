import React from 'react';
import s from "./../Login/Login.module.css";

const FormFields = ({meta, input, children, ...props}) => {
	let errorCreate = meta.error && meta.touched;
	return <div>
			{children}
			<span className={errorCreate ? "" : s.noneDisplay}>{meta.error}</span>
		</div>
}

export const Input = (props) => {
	const {meta, input, childen, ...restProps} = props;
	let errorCreate = meta.error && meta.touched;
	return <FormFields {...props}><input className={errorCreate ? s.error : ""} {...input} {...restProps}/></FormFields>
}

export const Textarea = (props) => {
	const {meta, input, children, ...restProps} = props;
	let errorCreate = meta.error && meta.touched;
	return <FormFields {...props}><textarea className={errorCreate ? s.error : ""} {...input} {...restProps}></textarea></FormFields>
}