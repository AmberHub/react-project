import React from 'react'
import classes from "./MyPosts.module.css"


const MyPosts = (props) => {
	let textareaPostRef = React.createRef();

	let changePostLetter = () => {
		let text = textareaPostRef.current.value;
		props.changePostLetter(text);
	}

	return (<div>
		<textarea ref={textareaPostRef} onChange={changePostLetter} value={props.textPostValue}></textarea>
  		<button onClick={props.addPost}>Add post</button>
		<div className={classes.posts}>
			{props.Posts}
		</div>
	</div>
	);
}

export default MyPosts;