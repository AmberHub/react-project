import React, {useEffect, ChangeEvent} from 'react';
import Profile from "./Profile";
import Preloader from "../utils/Preloader";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    updatePhotoTC,
    setProfileTC,
    setStatusTC,
    updateStatusTC,
    fetching,
    changeIsOwner
} from "../Redux/profileReducer";
import {compose} from "redux";
import {withAuth} from "../HOC/AuthHOC"
import {
    getIsOwner, getPhotos, getPostData, getIsFetching, getProfileData,
    getStatus
} from "../Selectors/profileSelectors";
import {getIsAuth, getUserId} from "../Selectors/authSelectors";
import {AppStateType, PhotosType, ProfileDataType, PostDataType} from "../utils/types"


type PropsType = ConnectedPropsType & DispatchPropsType & OwnPropsType

type ConnectedPropsType = {
    PostsData: Array<PostDataType> | null
    isFetching: boolean
    profileData: ProfileDataType | null
    status: string | null
    isAuth: boolean
    myId: number | null
    photos: PhotosType | null
    isOwner: boolean
}

type DispatchPropsType = {
    setProfileTC: (userId: number | null, isAuth: boolean, myId: number | null) => void
    setStatusTC: (userId: number | null, myId?: number | null) => void
    updateStatusTC: (status: string | null) => void
    fetching: () => void
    changeIsOwner: (isOwner: boolean) => void
    updatePhotoTC: (file: File | null, myId: number | null) => void
}

type OwnPropsType = {
    match: any
}

type ConnectedPropsForAuthType = {
    isAuth: boolean
}

type DispatchPropsForAuthType = {}

const ProfileContainer: React.FC<PropsType> = ({updatePhotoTC, setProfileTC, isAuth,
                                                   setStatusTC, changeIsOwner, myId,
                                                   match, isOwner, profileData, ...props}) => {

    useEffect(() => {
        setProfileTC(match.params.userId,
            isAuth, myId);
        setStatusTC(match.params.userId, myId);
        changeIsOwner(false);
    }, [])

    useEffect(() => {
        if (!match.params.userId) {
            setProfileTC(match.params.userId,
                isAuth, myId);
            setStatusTC(myId);
            changeIsOwner(true);
        }
    }, [match.params.userId])

    let selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null)
            updatePhotoTC(e.target.files[0], myId)
    }

    return <> {!profileData ? <Preloader/>
        : <Profile {...props} userId={match.params.userId}
                   profileData={profileData}
                   isOwner={isOwner} selectPhoto={selectPhoto}/>} </>

};

let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
        PostsData: getPostData(state),
        isFetching: getIsFetching(state),
        profileData: getProfileData(state),
        status: getStatus(state),
        isAuth: getIsAuth(state),
        myId: getUserId(state),
        photos: getPhotos(state),
        isOwner: getIsOwner(state)

});


let authMapStateToProps = (state: AppStateType): ConnectedPropsForAuthType => ({
    isAuth: getIsAuth(state)
});


export default compose(
    withRouter,
    connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, {}),
    withAuth,
    connect(mapStateToProps,
        {changeIsOwner, updatePhotoTC, fetching, setProfileTC, setStatusTC, updateStatusTC})
    )(ProfileContainer);