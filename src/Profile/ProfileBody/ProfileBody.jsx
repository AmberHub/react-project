import React from "react";
import classes from "./ProfileBody.module.css";
import Preloader from "./../../Preloader.jsx";


const ProfileBody = (props) => {

	if (!props.profileData) {
		return <Preloader />
	} else {
		return <div className={classes.upProfile}>
  			<img className={classes.ava} src={props.profileData.photos.large} alt="photo"/>
  			<div>{props.profileData.fullName}</div>
  		</div>
	}
	
}

export default ProfileBody;