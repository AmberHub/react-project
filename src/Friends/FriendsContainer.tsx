import React, {useEffect} from "react"
import { connect } from "react-redux"
import {
    getCountFriends, getCurrentPageFriends,
    getCurrentPortionFriends,
    getFriends, getIsFetchingFriends,
    getPageFriends,
    getTotalCountOfFriends
} from "../Selectors/friendsSelectors";
import {AppStateType, UsersType} from "../utils/types";
import Friends from "./Friends";
import {changePageFriends, changePortionFriends, setFriendsTC} from "../Redux/friendsReducer";
import { compose } from "redux";
import {withAuth} from "../HOC/AuthHOC";
import {getIsAuth} from "../Selectors/authSelectors";
import {getFollowInProgress} from "../Selectors/usersSelectors"
import {followTC} from "../Redux/usersReducer";
import Preloader from "../utils/Preloader";

type PropsType = ConnectedType & DispatchType & OwnPropsType

type ConnectedType = {
    friends : UsersType[] | null
    followInProgress : Array<number>
    totalCountPage : number
    currentPortion : number
    count : number
    currentPage : number
    page: number
    isFetching : boolean
}

type DispatchType = {
    setFriendsTC : (page : number, count : number, isChangingPage : boolean, searchName?: string) => void
    changePageFriends : (page : number) => void
    changePortionFriends : (portion : number) => void
    followTC: (op: boolean, id: number, isFriendsPage?: boolean) => void
}
type OwnPropsType = {

}
type ConnectedPropsForAuthType = {
    isAuth : boolean
}
type DispatchPropsForAuthType = {

}

const FriendsContainer: React.FC<PropsType> = ({setFriendsTC, isFetching,  page, count,
                                                   changePageFriends, ...props}) => {

    useEffect(() => {
        setFriendsTC( 1, count, false)
        changePageFriends(1)
    }, [])

    let changePageFriendsForPaginator = ( page: number ) => {
        setFriendsTC( page, count, true)
    }

    return<>
        {
            isFetching ? <Preloader /> :
            <Friends {...props} page={page} count={count} changePageFriends={changePageFriendsForPaginator}/>
        }
    </>
}

let mapStateToProps = (state: AppStateType) => ({
    friends : getFriends(state),
    followInProgress : getFollowInProgress(state),
    page : getPageFriends(state),
    count : getCountFriends(state),
    totalCountPage: getTotalCountOfFriends(state),
    currentPortion : getCurrentPortionFriends(state),
    currentPage : getCurrentPageFriends(state),
    isFetching : getIsFetchingFriends(state)
})

let authMapStateToProps = (state: AppStateType) => ({
    isAuth : getIsAuth(state)
})


export default compose(
    connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, {}),
    withAuth,
    connect(mapStateToProps, { setFriendsTC, followTC, changePortionFriends, changePageFriends })
)(FriendsContainer)