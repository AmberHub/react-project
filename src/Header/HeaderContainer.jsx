import React, { useEffect } from 'react';
import classes from "./Header.module.css";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import { isAuthTC, logoutTC } from "./../Redux/authReducer.js";

const HeaderAPI = (props) => {

	useEffect( () => {
		props.isAuthTC();
	}, [])

	return <Header { ...props } />
}

let mapStateToProps = (state) => ({
	isAuth: state.Auth.isAuth,
	login: state.Auth.login,
	userId: state.Auth.userId
})


export default connect(mapStateToProps, { isAuthTC, logoutTC })(HeaderAPI);