import React from 'react';
import classes from "./Sidebar.module.css";
import {NavLink} from "react-router-dom";

type NavItemPropsType = {
    to: string
    name: string
    newDialogsCount?: number | null
}

const NavItem: React.FC<NavItemPropsType> = ({to, name, newDialogsCount}) => {
    return (
        <NavLink to={to} activeClassName={classes.active} className={classes.item}>{name}
            {newDialogsCount &&
            <div className={classes.countContainer}><span className={classes.count}>5</span></div>
            }
        </NavLink>
    );
}

type SidebarPropsType = {
    newDialogsCount?: number | null
}

const Sidebar: React.FC<SidebarPropsType> = ({newDialogsCount}) => {
    return (
        <div className={classes.sidebar}>
            <nav className={classes.nav}>
                <NavItem name="Profile" to="/profile"/>
                <NavItem name="Dialogs" to="/dialogs" newDialogsCount={newDialogsCount}/>
                <NavItem name="Friends" to="/friends"/>
                <NavItem name="News" to="/news"/>
                <NavItem name="Users" to="/users"/>
            </nav>
        </div>
    );
}

export default Sidebar;