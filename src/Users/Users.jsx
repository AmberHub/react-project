import React from "react";
import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import {userAPI} from "./../API/api.js";
import { followTC } from "./../Redux/usersReducer.js";
import Paginator from "./../utils/Paginator.jsx";
import defaultPhoto from  "./../img/defaultPhoto.jpg"

const Users = (props) => {
	return <div>
		<Paginator totalCountPage={props.totalCountPage} count={props.count} currentPage={props.currentPage} changePage={props.changePage} portionSize={5} changePortion={props.changePortion} currentPortion={props.currentPortion}/>
		{
			props.users.map( u => <div key={u.id} className={classes.userItem}><NavLink className={classes.nav} to={`/profile/${u.id}`}>
			<img className={classes.avatar} src={u.photos.small ? u.photos.small : defaultPhoto} alt="photo"/>
			<br/>
			<span className={classes.name}>{u.name}</span> 
			<br/>
			<span className={classes.status}>{u.status}</span>
			<br/>
			<span>u.location.country <br/> u.location.city</span>
			<br/>

			</NavLink>
			<button disabled={props.followInProgres.some(id => id === u.id)} className={classes.buttonFollow} onClick={ () => 
				u.followed ? props.followTC(false, u.id) : props.followTC(true, u.id) }>{u.followed ? "followed" : "unfollowed"}</button>
		</div>)
		}
	</div>
}


export default Users;