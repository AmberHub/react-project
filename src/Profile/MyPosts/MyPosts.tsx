import React from 'react';
import classes from "./MyPosts.module.css";
import {reduxForm, InjectedFormProps} from 'redux-form';
import {require} from "../../utils/validate";
import {createField, TextareaWithoutErrorCreator} from "../../utils/completeFormComponents";
import Post from "./Post";
import {ValuesSubmitType} from "./MyPostsContainer"
import {PostDataType, PhotosType} from "../../utils/types"

type PropsTypeMyPost = {
    isOwner: boolean
    Posts: Array<PostDataType>
    photos: PhotosType | null

    onSubmit: (values: ValuesSubmitType) => void
}

type PropsTypePostForm = {
    post: string
}

const PostForm: React.FC<InjectedFormProps<PropsTypePostForm>> = ({handleSubmit}) => {
    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                {createField("Post text", TextareaWithoutErrorCreator, "post", [require])}
            </div>

            <div>
                <button type="submit">Post</button>
            </div>
        </form>
    </div>
}


const MyPosts: React.FC<PropsTypeMyPost> = ({isOwner, onSubmit, Posts, photos}) => {
    return <div>
        <div className={classes.posts}>
            {isOwner && <PostFormWith onSubmit={onSubmit}/>}
            {Posts.map(p => <Post photoSmall={photos ? photos.small : ""} PostText={p.post} key={p.id}/>)}
        </div>
    </div>
}

let PostFormWith = reduxForm<PropsTypePostForm>({form: "postForm"})(PostForm);


export default MyPosts;