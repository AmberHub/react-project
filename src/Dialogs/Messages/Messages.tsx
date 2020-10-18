import React from 'react';
import classes from "./Messages.module.css";
import {reduxForm, InjectedFormProps} from "redux-form";
import Preloader from "../../utils/Preloader.js";
import { createField, TextareaWithoutErrorCreator } from "../../utils/completeFormComponents";
import { require } from "../../utils/validate";
import { MessageType } from '../../utils/types';
import { ValuesType } from './MessagesContainer';

const MessagesForm: React.FC<InjectedFormProps<ValuesType> & {}> = ({handleSubmit}) => {
	return <form onSubmit={handleSubmit}>
			<div className={classes.form}>
			{ createField("Message", TextareaWithoutErrorCreator, "message", [require]) }
			<button type="submit">Send Message</button>
			</div>
		</form>
}

type AddedProps = {
	myId: number | null
}

let Message: React.FC<MessageType & AddedProps> = ({myId, senderId, body}) => {
	return <div className={classes.columnWrapper}><div className={`${myId === senderId ? classes.myMessage : classes.someoneMessage}`}><div className={classes.messageBody}>{body}</div></div></div>
}


let MessagesFormWith = reduxForm<ValuesType, {}>( { form : "messageForm" } )(MessagesForm);


type PropsType = {
	MessageItem : Array<MessageType> | null
	myId : number | null

	onSubmit : (values: ValuesType) => void
}

const Messages: React.FC<PropsType> = ({MessageItem, onSubmit, myId}) => {
	return <>
	{!MessageItem ?
		<Preloader />
		: <div className={classes.MessagesWrapper}>
			<div className={classes.infoWrapper}>
				<img src="" alt="photo"/>
				<div>Last activity : </div>
			</div>
			<div className={classes.messages}>
					{
					MessageItem.length > 0 ?
						MessageItem.map(
	    				m => <Message myId={myId} senderId={m.senderId} viewed={m.viewed} id={m.id} body={m.body} key={m.id}/> )
	    				: <div>Send message</div>
					}
					<Message myId={9769} senderId={44444} viewed={false} body={"dklkvhvbrjebvkjdsjkvbdjkbdvsjdsvnvsnvdsnkldvnkdsvnksdvnkdsvndknldvsnkldvnkvdsnkdvsnkvnkdsndsvknkdsvnkdvnkdsvnkdnkldvnkldvnkldsvnkldsndvnkdvnkldsvnkldsvnkldsvnkdsvndsvkndksvnkdsvnkdvndkvnkvdnkldsvnkldvknldvndvndvnkdsvnknkdsvnkldvnkdvnkdvnkdvnkdvsnkdvsnkdsvnk"} />
			</div>
			<MessagesFormWith onSubmit={onSubmit} />
		</div>
	}
	</>
}

export default Messages;