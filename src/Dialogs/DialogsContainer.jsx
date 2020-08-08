import React from 'react'
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom"
import Dialogs from "./Dialogs.jsx"
import {connect} from "react-redux"
import {addMessage, changeMessageLetter} from "./../Redux/actionCreators.js"


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


let mapStateToProps = (state) => {
  return{
    DialogNameItem : state.Dialog.DialogNameData.map(d => <DialogName id={d.id} name={d.name} key={d.id}/> ),
    DialogMessageItem : state.Dialog.DialogMessageData.map(m => <DialogMessage message={m.message} key={m.id}/> ),
    textMessageValue : state.Dialog.textMessageValue
  }
};



const DialogsContainer = connect(mapStateToProps, { changeMessageLetter, addMessage })
(Dialogs);


export default DialogsContainer;