import React from 'react';
import classes from "./MyPosts.module.css";
import { Field, reduxForm } from 'redux-form';
import { require, maxLengthCreator } from "./../../utils/validate.js";


const PostForm = (props) => {
	return <div>
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field placeholder="Post text" component="textarea" name="post" validate={ [ require ] } />
			</div>

			<div>
				<button type="submit">Post</button>
			</div>
		</form>
	</div>
}


const MyPosts = (props) => {
	return <div>
		<div className={classes.posts}>
			<PostFormWith onSubmit={props.onSubmit} />
			{props.Posts}
		</div>
	</div>
}

let PostFormWith = reduxForm( { form : "postForm" } )(PostForm);


export default MyPosts;