import React from 'react'
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom"



const Dialogs = (props) => {


let textareaMessagesRef = React.createRef();

let addMessage = () => {
	props.addMessage();
};

let changeMessageLetter = () => {
	let text = textareaMessagesRef.current.value;
	props.changeMessageLetter(text);
};

	return (
	<div className={classes.DialogsWrapper}>
		<div className={classes.dialogsName}>
			{props.DialogNameItem}
		</div>
		<div className={classes.messages}>
			{props.DialogMessageItem}
			<textarea ref={textareaMessagesRef} onChange={changeMessageLetter} value={props.textMessageValue}></textarea>
  			<button onClick={addMessage}>Send Message</button>
		</div>
	</div>
	);
}

export default Dialogs;