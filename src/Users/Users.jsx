import React from "react";
import classes from "./Users.module.css";



const Users = (props) => {
	return <div>
		{props.users.map( u => <div className={classes.userItem}>
			<img className={classes.avatar} src={u.photo} alt="photo"/>
			<span className={classes.name}>{u.name + " " + u.secondName}</span> 
			<span className={classes.status}>{u.status}</span>
			<span>{u.location.country} <br/> {u.location.city}</span>
			<button onClick={ () =>  props.follow(u.id) }>{u.follow ? "followed" : "unfollowed"}</button>
		</div>)}
	</div>
}


export default Users;