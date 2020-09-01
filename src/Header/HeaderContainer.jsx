import React from 'react';
import classes from "./Header.module.css";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import { isAuthTC, logoutTC } from "./../Redux/authReducer.js";

class HeaderAPI extends React.Component {

	componentDidMount = () => {
		this.props.isAuthTC();
	}

	render = () => {
		return <Header { ...this.props } />
	};
}

let mapStateToProps = (state) => ({
	isAuth: state.Auth.isAuth,
	login: state.Auth.login,
	userId: state.Auth.userId
})


export default connect(mapStateToProps, { isAuthTC, logoutTC })(HeaderAPI);