import React from 'react'
import classes from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx"



const Profile = (props) => {

	let textareaPostRef = React.createRef();

	let changePostLetter = () => {
		let text = textareaPostRef.current.value;
		props.changePostLetter(text);
	}
	
  return (
  	<div className={classes.ProfileWrapper}>
  		<div className={classes.upProfile}>
  			
  		</div>
  		<div className={classes.post}>
  			<textarea ref={textareaPostRef} onChange={changePostLetter} value={props.textPostValue}></textarea>
  			<button onClick={props.addPost}>Add post</button>
  			<MyPostsContainer store={props.store}/>
  		</div>
  	</div>
  );
}

export default Profile;