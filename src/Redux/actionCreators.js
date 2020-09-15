const ADD_POST = "ADD_POST";

const ADD_MESSAGE = "ADD_MESSAGE";

const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";

const SET_USERS = "SET_USERS";

const CHANGE_PAGE = "CHANGE_PAGE";

const GET_TC = "GET_TC";

const FETCHING = "FETCHING";

const SET_PROFILE = "SET_PROFILE";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

const FOLLOWING = "FOLLOWING";

const GET_AUTH = "GET_AUTH";

const SET_STATUS = "SET_STATUS";

const LOGIN = "LOGIN";

const INITIALIZED = "INITIALIZED";

const CHANGE_PORTION = "CHANGE_PORTION";

const UPDATE_PHOTO_SUCCESS = "UPDATE_PHOTO_SUCCESS";




export let addMessage = (message) => ({ type : ADD_MESSAGE, message });

export let addPost = (post) => ({ type : ADD_POST, post });

export let follow = (userId) => ({ type : FOLLOW_UNFOLLOW, userId });

export let requestUsers = (newUsers) => ({ type : SET_USERS, newUsers });

export let changePage = (page) => ({type : CHANGE_PAGE, page});

export let requestTotalCountPage = (total) => ({type: GET_TC, totalCountPage : total});

export let fetching = () => ({type : FETCHING});

export let requestProfile = (data) => ({type : SET_PROFILE, data});

export let setAuthUserData = (data, isAuth) => ({type : SET_AUTH_USER_DATA, data, isAuth});

export let following = (userId, isFetching) => ({type : FOLLOWING, userId, isFetching});

export let setStatus = (status) => ({type : SET_STATUS, status});

export let login = (userId) => ({type : LOGIN, userId});

export let initialized = () => ({type : INITIALIZED});

export let changePortion = (currentPortion) => ({type : CHANGE_PORTION, currentPortion});

export let updatePhotoSuccess = (photos) => ({type : UPDATE_PHOTO_SUCCESS, photos});