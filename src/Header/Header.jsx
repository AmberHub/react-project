import React from 'react';
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
  	<header className={classes.header}>
  		<img src="http://icons.iconarchive.com/icons/blackvariant/button-ui-system-apps/1024/Terminal-icon.png"/>

  		{props.isAuth ? <Logged {...props} /> : 
  		<NavLink className={classes.login} to={"/login"}>Login</NavLink>}
  	</header>
  );
}

const Logged = (props) => {
	return <span>
		<div className={classes.logout}><button onClick={props.logoutTC}>Log out</button></div>
		<NavLink className={classes.login} to={"/profile/" + props.userId}>{props.login}</NavLink>
	</span>
}

export default Header;