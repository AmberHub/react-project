import React from "react";
import defaultPhoto from  "./../../img/defaultPhoto.jpg";
import imgHelper from "./../../img/imgHelper.png";
import classes from "./ProfileBody.module.css";

const Avatar = (props) => {
	return 	<div>
		{props.isOwner &&
			<input type="file" name="file" id="file" onChange={props.selectPhoto}></input>
		}
  			<label for="file"><img className={props.isOwner ? classes.avaPhoto : classes.avaPhotoOtherUser} src={props.photos.large ?
  			props.photos.large : defaultPhoto} alt="photo"/><img src={imgHelper} className={classes.imgHelper} alt="photo"/></label>
		</div>
}

export default Avatar;