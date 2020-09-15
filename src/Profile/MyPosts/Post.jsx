import React from "react";
import classes from "./Post.module.css";
import defaultPhoto from  "./../../img/defaultPhoto.jpg";

const Post = (props) => {
	return <div>
		<img className={classes.postIcon} src={props.photo.small ?
		props.photo.small : defaultPhoto}/>
		<div>
			{props.PostText}
		</div>
	</div>
}

export default Post;