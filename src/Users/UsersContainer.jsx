import React from "react";
import {connect} from "react-redux";
import {followAC, setUsersAC, chagePageAC, getTotalCountPageAC} from "./../Redux/actionCreators.js";
import Users from "./Users.jsx";


let mapStateToProps = (state) => {
	return{	
	users : state.UsersPage.users,
	page: state.UsersPage.page,
	count: state.UsersPage.count,
	totalCountPage : state.UsersPage.totalCountPage,
	currentPage : state.UsersPage.currentPage
	}
};

let mapDispatchToProps = (dispatch) => {
	return{
	follow : (userId) => { dispatch(followAC(userId)) },
	updateUsers : (newUsers) => { dispatch(setUsersAC(newUsers)) },
	changePage : (page) => { dispatch(chagePageAC(page)) },
	getTotalCountPage : (total) => { dispatch(getTotalCountPageAC(total)) }
	}
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;