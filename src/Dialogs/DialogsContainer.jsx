import React from 'react'
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom"
import Dialogs from "./Dialogs.jsx"
import {connect} from "react-redux"
import { addMessage } from "./../Redux/actionCreators.js"
import { withAuth } from "./../HOC/AuthHOC.jsx";
import { compose } from "redux";
import { reset } from "redux-form";

const DialogsContainer = (props) => {
	let onSubmit = (values) => {
		props.addMessage(values.message);
		props.reset("messageForm");
}

		return <Dialogs {...props} onSubmit={onSubmit} />
};

let DialogName = (props) => <NavLink activeClassName={classes.active} className={classes.dialogsNameItem} to={"/dialogs/" + props.id}>{props.name}</NavLink>

let DialogMessage = (props) => <div className={classes.message}>{props.message}</div>

let mapStateToProps = (state) => ({
    DialogNameItem : state.Dialog.DialogNameData.map(
    	d => <DialogName id={d.id} name={d.name} key={d.id}/> ),
    DialogMessageItem : state.Dialog.DialogMessageData.map(
    	m => <DialogMessage message={m.message} key={m.id}/> )
});

let authMapStateToProps = (state) => ({
    isAuth : state.Auth.isAuth
});

export default compose(
	connect(mapStateToProps, { addMessage, reset }),
	connect(authMapStateToProps, { }),
	withAuth
	)(DialogsContainer);