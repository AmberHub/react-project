import React from 'react';
import classes from "./Sidebar.module.css";
import {NavLink} from "react-router-dom";

const NavItem = (props) => {
	return (
		<NavLink to={props.to} activeClassName={classes.active} className={classes.item}>{props.name}</NavLink>
	);
}

const Sidebar = () => {
  return (
  	<div className={classes.sidebar}>
	  	<nav className={classes.nav}>
	  		<NavItem name="Profile" to="/profile"/>
		  	<NavItem name="Dialogs" to="/dialogs"/>
		  	<NavItem name="Friends" to="/friends"/>
		  	<NavItem name="News" to="/news"/>
	  	</nav>
  	</div>
  );
}

export default Sidebar;