import React from 'react'
import classes from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts.jsx"

const Profile = (props) => {

	let textareaPostRef = React.createRef();

	let addPost = () => {
		props.dispatch( { type : "ADD-POST" } );
	}


	let changePostLetter = () => {
		let text = textareaPostRef.current.value;
		props.dispatch( { type : "CHANGE-POST-LETTER", text : text } );
	}
  return (
  	<div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			
  		</div>
  		<div className={classes.post}>
  			<textarea ref={textareaPostRef} onChange={changePostLetter} value={props.textPostValue}></textarea>
  			<button onClick={addPost}>Add post</button>
  			<MyPosts PostsData={props.PostsData}/>
  		</div>

  	</div>
  );
}

export default Profile;