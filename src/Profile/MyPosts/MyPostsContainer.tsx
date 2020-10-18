import {connect} from "react-redux";
import React from 'react';
import MyPosts from "./MyPosts";
import classes from "./Post.module.css";
import { addPost } from "./../../Redux/profileReducer";
import { reset } from "redux-form";
import { getPostData, getIsOwner, getPhotos } from "./../../Selectors/profileSelectors"
import { AppStateType, PostDataType, PhotosType  } from "./../../utils/types"


type PropsType = ConnectedPropsType & OwnPropsType & DispatchPropsType

type ConnectedPropsType = {
	Posts : Array<PostDataType>
	isOwner : boolean
	photos : PhotosType
}

type OwnPropsType = {

}

type DispatchPropsType = {
	addPost : (post : string) => void
	reset : (formName : string) => void
}

export type ValuesSubmitType = {
	post : string
}

const MyPostsContainer: React.FC<PropsType> = ({addPost, reset, ...props}) => {

	let onSubmitPost = (values: ValuesSubmitType) => {
		addPost(values.post)
		reset("postForm")
	}

	return <MyPosts {...props} onSubmit={onSubmitPost} />
}


let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
		Posts : getPostData(state),
		isOwner : getIsOwner(state),
		photos : getPhotos(state)
})



export default connect<ConnectedPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
	{ addPost, reset })(MyPostsContainer);