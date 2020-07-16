import React from "react";
import {connect} from "react-redux";
import {followAC} from "./../Redux/actionCreators.js";
import Users from "./Users.jsx";


let mapStateToProps = (state) => {
	return{	
	users : state.UsersPage.users
	}
};
debugger;
let mapDispatchToProps = (dispatch) => {
	return{
	follow : (userId) => { dispatch(followAC(userId)) } 
	}
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;