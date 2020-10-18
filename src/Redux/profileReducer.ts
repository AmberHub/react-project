import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {ProfileDataType, PhotosType, PostDataType} from "../utils/types"


const ADD_POST = "ADD_POST";
const UPDATE_PHOTO_SUCCESS = "UPDATE_PHOTO_SUCCESS";
const SET_PROFILE = "SET_PROFILE";
const FETCHING = "FETCHING";
const SET_STATUS = "SET_STATUS";
const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
const SET_EDIT_MODE = "SET_EDIT_MODE";
const IS_OWNER = "IS_OWNER";

type UpdatePhotoSuccessACType = {
    type: typeof UPDATE_PHOTO_SUCCESS
    photos?: PhotosType
}
export let updatePhotoSuccess = (photos?: PhotosType): UpdatePhotoSuccessACType => ({
    type: UPDATE_PHOTO_SUCCESS,
    photos
})


type RequestProfileACType = {
    type: typeof SET_PROFILE
    data: ProfileDataType
}
export let requestProfile = (data: ProfileDataType): RequestProfileACType => ({type: SET_PROFILE, data});


type FetchingACType = {
    type: typeof FETCHING
}
export let fetching = (): FetchingACType => ({type: FETCHING});


type SetStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export let setStatus = (status: string): SetStatusACType => ({type: SET_STATUS, status});


type UpdateProfileSuccessACType = {
    type: typeof UPDATE_PROFILE_SUCCESS
    values: ProfileDataType
}
export let updateProfileSuccess = (values: ProfileDataType): UpdateProfileSuccessACType => ({
    type: UPDATE_PROFILE_SUCCESS,
    values
});


type SetEditModeACType = {
    type: typeof SET_EDIT_MODE
    editMode: boolean
}
export let setEditMode = (editMode: boolean): SetEditModeACType => ({type: SET_EDIT_MODE, editMode});


type AddPostACType = {
    type: typeof ADD_POST
    post: string
}
export let addPost = (post: string): AddPostACType => ({type: ADD_POST, post});


export type ChangeIsOwnerACType = {
    type: typeof IS_OWNER
    isOwner: boolean
}
export let changeIsOwner = (isOwner: boolean): ChangeIsOwnerACType => ({type: IS_OWNER, isOwner});


type initialStateType = typeof initialState;

type actionsType = UpdatePhotoSuccessACType | RequestProfileACType | FetchingACType
    | SetStatusACType | UpdateProfileSuccessACType | SetEditModeACType | AddPostACType | ChangeIsOwnerACType


let initialState = {

    profileData: null as ProfileDataType | null,
    PostsData: [{post: "Hi", id: 1}] as Array<PostDataType>,
    isFetching: false,
    status: "",
    photos: {large: null, small: null} as PhotosType | undefined,
    isOwner: false,
    editMode: false
}


const profileReducer = (state = initialState, action: actionsType): initialStateType => {


    switch (action.type) {

        case ADD_POST :
            return {
                ...state,
                PostsData: [...state.PostsData, {post: action.post, id: 2}]
            };

        case SET_PROFILE :
            return {...state, profileData: action.data};

        case FETCHING :
            return {...state, isFetching: !state.isFetching};

        case SET_STATUS :
            return {...state, status: action.status}

        case UPDATE_PHOTO_SUCCESS :
            return {...state, photos: action.photos}

        case UPDATE_PROFILE_SUCCESS :
            return {...state, profileData: action.values}

        case IS_OWNER :
            return {...state, isOwner: action.isOwner}

        case SET_EDIT_MODE :
            return {...state, editMode: action.editMode}

        default :
            return state;
    }

}


export let setProfileTC = (userId: number, isAuth: boolean, myId: number) => async (dispatch: Function) => {

    dispatch(fetching());

    if (isAuth && !userId)
        userId = myId

    let data = await profileAPI.setProfile(userId)
    dispatch(updatePhotoSuccess(data.photos))
    dispatch(requestProfile(data));
    dispatch(fetching());
}

export let updateProfileTC = (values: ProfileDataType, myId: number | null) => async (dispatch: Function) => {
    let data = await profileAPI.updateProfile(values)
    if (data.resultCode === 0) {
        let data = await profileAPI.setProfile(myId)
        dispatch(updateProfileSuccess(data))
        dispatch(setEditMode(false))
    } else {
        dispatch(stopSubmit("profileInfo", {_error: data.messages[0]}));
        dispatch(setEditMode(true))
    }
}

export let setStatusTC = (userId: number, myId: number) => async (dispatch: Function) => {
    if (!userId)
        userId = myId;

    let status = await profileAPI.getStatus(userId)
    dispatch(setStatus(status));
}

export let updateStatusTC = (status: string) => async (dispatch: Function) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export let updatePhotoTC = (photo: any, myId: number) => async (dispatch: Function) => {
    let data = await profileAPI.updatePhoto(photo)
    if (data.resultCode === 0) {
        let data = await profileAPI.getPhoto(myId)
        dispatch(updatePhotoSuccess(data))
    }
}


export default profileReducer;