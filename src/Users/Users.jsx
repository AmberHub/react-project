import React from "react";
import classes from "./Users.module.css";
import classnames from "classnames";
import {NavLink} from "react-router-dom";

const Users = (props) => {
	return <div>
		{
			props.pages.map( p => <span className={classnames(props.currentPage === p ? classes.currentPageNumber : classes.pageNumber, 
			props.currentPage + 5 >= p || props.currentPage - 5 >= p ? classes.display : classes.noneDisplay)}  
			onClick = { () => props.changePage(p) }>{p}</span> )
		}

		{
			props.users.map( u => <NavLink className={classes.nav} to={`/profile/${u.id}`}><div key={u.id} className={classes.userItem}>
			<img className={classes.avatar} src={u.photos.small ? u.photos.small : "https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg"} alt="photo"/>
			<br/>
			<span className={classes.name}>{u.name}</span> 
			<br/>
			<span className={classes.status}>{u.status}</span>
			<br/>
			<span>u.location.country <br/> u.location.city</span>
			<br/>
			<button className={classes.buttonFollow} onClick={ () =>  props.follow(u.id) }>{u.followed ? "followed" : "unfollowed"}</button>
		</div></NavLink>)
		}
	</div>
}


export default Users;