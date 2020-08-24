import React from 'react'
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom"
import Dialogs from "./Dialogs.jsx"
import {connect} from "react-redux"
import {addMessage, changeMessageLetter} from "./../Redux/actionCreators.js"
import { withAuth } from "./../HOC/AuthHOC.jsx";
import { compose } from "redux";

class DialogsContainer extends React.Component {
	render = () => {
		return <Dialogs {...this.props} />
	}
};

let DialogName = (props) => {
	return (
		<NavLink activeClassName={classes.active} className={classes.dialogsNameItem} to={"/dialogs/" + props.id}>{props.name}</NavLink>
	);
};

const DialogMessage = (props) => {
	return (
		<div className={classes.message}>{props.message}</div>
	);
};

let mapStateToProps = (state) => {
  return{
    DialogNameItem : state.Dialog.DialogNameData.map(
    	d => <DialogName id={d.id} name={d.name} key={d.id}/> ),
    DialogMessageItem : state.Dialog.DialogMessageData.map(
    	m => <DialogMessage message={m.message} key={m.id}/> ),
    textMessageValue : state.Dialog.textMessageValue
  }
};

let authMapStateToProps = (state) => {
  return{
    isAuth : state.Auth.isAuth
  }
};

export default compose(
	connect(mapStateToProps, { changeMessageLetter, addMessage }),
	connect(authMapStateToProps, { }),
	withAuth
	)(DialogsContainer);