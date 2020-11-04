import React from 'react';
import classes from "./Sidebar.module.css";
import {NavLink} from "react-router-dom";

type NavItemPropsType = {
    path: string
    name: string
    newDialogsCount?: number | null
}

const NavItem: React.FC<NavItemPropsType> = ({path, name, newDialogsCount}) => {
    return (
        <NavLink to={path} activeClassName={classes.active} className={classes.item}>{name}
            {newDialogsCount ?
            <div className={classes.countContainer}><span className={classes.count}>5</span></div> : ""
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
                <NavItem name="Profile" path="/profile"/>
                <NavItem name="Dialogs" path="/dialogs" newDialogsCount={newDialogsCount}/>
                <NavItem name="Friends" path="/friends"/>
                <NavItem name="News" path="/news"/>
                <NavItem name="Users" path="/users"/>
            </nav>
        </div>
    );
}

export default Sidebar;