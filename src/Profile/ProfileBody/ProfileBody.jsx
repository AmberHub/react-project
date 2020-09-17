import React from "react";
import classes from "./ProfileBody.module.css";
import Status from "./Status.jsx";
import ProfileInfoContainer from "./ProfileInfoContainer.jsx";
import Avatar from "./Avatar.jsx";


const ProfileBody = React.memo((props) => {
		return <div className={classes.upProfile}>
			<Avatar selectPhoto={props.selectPhoto} photos={props.photos} isOwner={props.isOwner}/>
			<div>{props.profileData.fullName}</div>
			<ProfileInfoContainer />
  			<div>
  			<Status isOwner={props.isOwner} status={props.status} updateStatusTC={props.updateStatusTC}/>
  			</div>
  		</div>
})

export default ProfileBody;