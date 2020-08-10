import React from 'react';
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
  	<header className={classes.header}>
  		<img src="http://icons.iconarchive.com/icons/blackvariant/button-ui-system-apps/1024/Terminal-icon.png"/>

  		{props.isAuth ? <NavLink className={classes.login} to={"/profile/" + props.userId}>{props.login}</NavLink> : 
  		<NavLink className={classes.login} to={"/login/me"}>Login</NavLink>}
  	</header>
  );
}

export default Header;