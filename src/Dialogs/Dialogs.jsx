import React from 'react'
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom"



let addMessageActionCreator = () => ({ type : "ADD-MESSAGE" })

let changeMessageLetterActionCreator = (text) => ({ type : "CHANGE-MESSAGE-LETTER", text : text });

const DialogName = (props) => {
	let path = "/dialogs/" + props.id;
	return (
		<NavLink activeClassName={classes.active} className={classes.dialogsNameItem} to={path}>{props.name}</NavLink>
	);
};

const DialogMessage = (props) => {
	return (
		<div className={classes.message}>{props.message}</div>
	);
};


const Dialogs = (props) => {

let DialogMessageItem = props.DialogData.DialogMessageData.map(m => <DialogMessage message={m.message} /> );
let DialogNameItem = props.DialogData.DialogNameData.map(d => <DialogName id={d.id} name={d.name} /> );



let textareaMessagesRef = React.createRef();

let addMessage = () => {
	props.dispatch( addMessageActionCreator() );
}

let changeMessageLetter = () => {
	let text = textareaMessagesRef.current.value;
	props.dispatch( changeMessageLetterActionCreator(text) );
}

	return (
	<div className={classes.DialogsWrapper}>
		<div className={classes.dialogsName}>
			{DialogNameItem}
		</div>
		<div className={classes.messages}>
			{DialogMessageItem}
			<textarea ref={textareaMessagesRef} onChange={changeMessageLetter} value={props.textMessageValue}></textarea>
  			<button onClick={addMessage}>Send Message</button>
		</div>
	</div>
	);
}

export default Dialogs;