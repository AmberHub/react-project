import React from "react";
import classes from "./ProfileBody.module.css";
import Status from "./Status.jsx";


const ProfileBody = (props) => {
		return <div className={classes.upProfile}>
  			<img className={classes.ava} src={props.profileData.photos.large} alt="photo"/>
  			<div>{props.profileData.fullName}</div>
  			<div><Status status={props.status} updateStatusTC={props.updateStatusTC}/></div>
  		</div>
}

export default ProfileBody;