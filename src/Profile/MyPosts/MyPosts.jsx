import React from 'react'
import classes from "./MyPosts.module.css"


const MyPosts = (props) => {
	return (
		<div className={classes.posts}>
			{props.Posts}
		</div>
	);
}

export default MyPosts;