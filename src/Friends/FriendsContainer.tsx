import React, {ChangeEvent, useEffect, useState} from "react"
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
import {followTC, setUsersTC} from "../Redux/usersReducer";
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
    setFriendsTC : (page : number, count : number, isChangingPage : boolean, isFetching : boolean, searchName?: string) => void
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
                                                   changePageFriends, followTC, ...props}) => {

    useEffect(() => {
        setFriendsTC( 1, count, false, true)
        changePageFriends(1)
    }, [])

    let [valueOfSearchFriends, setValueOfSearchFriends] = useState("")

    let changePageFriendsForPaginator = ( page: number ) => {
        debugger
        setFriendsTC( page, count, true, true, valueOfSearchFriends)
    }

    let follow = (op: boolean, id: number) => {
        followTC(op, id, true)
    }

    let searchUsers = (element : ChangeEvent<HTMLInputElement>) => {
        setValueOfSearchFriends(element.target.value)
        setFriendsTC(1, count, false, false, element.target.value)
    }

    return<>
        {
            isFetching ? <Preloader /> :
            <Friends {...props}
                     page={page}
                     count={count}
                     changePageFriends={changePageFriendsForPaginator}
                     follow={follow}
                     valueOfSearchFriends={valueOfSearchFriends}
                     searchUsers={searchUsers}/>
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
    connect(mapStateToProps, { setFriendsTC, followTC, changePortionFriends, changePageFriends }),
    connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, {}),
    withAuth
)(FriendsContainer)