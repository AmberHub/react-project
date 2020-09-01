import React from 'react';
import classes from "./Dialogs.module.css";
import { reduxForm, Field } from "redux-form";


const DialogsForm = (props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field placeholder="Message" component="textarea" name="message"/>
			</div>

			<div>
				<button type="submit">Send Message</button>
			</div>
		</form>
	</div>
}

const Dialogs = (props) => {
	return (
	<div className={classes.DialogsWrapper}>
		<div className={classes.dialogsName}>
			{props.DialogNameItem}
		</div>
		<div className={classes.messages}>
			{props.DialogMessageItem}
			<DialogsFormWith onSubmit={props.onSubmit} />
		</div>
	</div>
	);
}



let DialogsFormWith = reduxForm( { form : "messageForm" } )(DialogsForm)

export default Dialogs;