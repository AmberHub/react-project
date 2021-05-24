import React from 'react';
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

type HeaderPropsType = {
	isAuth : boolean
}

const Header: React.FC<HeaderPropsType & LoggedPropsType> = ({isAuth, ...props}) => {
  return (
  	<header className={classes.header}>
  		<img src="http://icons.iconarchive.com/icons/blackvariant/button-ui-system-apps/1024/Terminal-icon.png" alt={"logo"}/>

  		{isAuth ? <Logged {...props} /> :
  		<NavLink className={classes.login} to={"/login"}>Login</NavLink>}
  	</header>
  );
}

type LoggedPropsType = {
	login : string | null

	logoutTC : () => void
}

const Logged: React.FC<LoggedPropsType> = ({logoutTC, login}) => {
	return <span>
		<div className={classes.logout}><button onClick={logoutTC}>Log out</button></div>
		<NavLink className={classes.login} to={"/profile"}>{login}</NavLink>
	</span>
}

export default Header;