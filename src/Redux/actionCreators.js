const ADD_POST = "ADD_POST";

const CHANGE_POST_LETTER = "CHANGE_POST_LETTER";

const ADD_MESSAGE = "ADD_MESSAGE";

const CHANGE_MESSAGE_LETTER = "CHANGE_MESSAGE_LETTER";

const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";

const SET_USERS = "SET_USERS";

const CHANGE_PAGE = "CHANGE_PAGE";

const GET_TC = "GET_TC";

const FETCHING = "FETCHING";

const SET_PROFILE = "SET_PROFILE";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";


export let addMessage = () => ({ type : ADD_MESSAGE });

export let changeMessageLetter = (text) => ({ type : CHANGE_MESSAGE_LETTER, text });

export let addPost = () => ({ type : ADD_POST });

export let changePostLetter = (text) => ({ type : CHANGE_POST_LETTER, text });

export let follow = (userId) => ({ type : FOLLOW_UNFOLLOW, userId });

export let updateUsers = (newUsers) => ({ type : SET_USERS, newUsers });

export let changePage = (page) => ({type : CHANGE_PAGE, page});

export let getTotalCountPage = (total) => ({type: GET_TC, totalCountPage : total});

export let fetching = () => ({type : FETCHING});

export let setProfile = (data) => ({type : SET_PROFILE, data});

export let setAuthUserData = (data) => ({type : SET_AUTH_USER_DATA, data});