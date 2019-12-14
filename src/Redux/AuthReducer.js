import {authAPI, GetToken} from "../API/API";

export const formatDate = el => {
    let date = new Date(el);
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();
    if (yyyy < 10) yyyy = '0' + yyyy;
    console.log(`${dd}.${mm}.${yyyy}`);
    return `${dd}.${mm}.${yyyy}`;
};

export const saveTokenToLocalStorage = token => localStorage.setItem("access-token", JSON.stringify(token));
export const getTokenFromLocalStorage = () => JSON.parse(localStorage.getItem("access-token"));

const SET_IS_AUTH = `RUNNER/IS_AUTH`;
const SET_CURRENT_USER = `RUNNER/SET_CURRENT_USER`;
const SET_CURRENT_USER_JOGS = `RUNNER/SET_CURRENT_USER_JOGS`;

export const setIsAuthAC = isAuth => ({type: SET_IS_AUTH, isAuth});
export const setCurrentUserAC = user => ({type: SET_CURRENT_USER, user});
export const setCurrentUserJogsAC = jogs => ({type: SET_CURRENT_USER_JOGS, jogs});


export const CheckAutorisationAtFirstBoot = () => async dispatch => {
    try {
        let token = getTokenFromLocalStorage();
        if (token !== null) {


            dispatch(setIsAuthAC(true));
            let currentUser = await authAPI.getCurrentUser(token);
            dispatch(setCurrentUserAC(currentUser));
            dispatch(GetRunnerData(token, currentUser.id));
            console.log(`other: `, token);
            console.log(currentUser);
        }
    } catch (err) {
        console.log(err);
    }
};

export const AuthorizationCheckThunk = () => async dispatch => {
    try {
        let token = getTokenFromLocalStorage();
        if (token === null) {
            let newToken = await GetToken(`hello`);
            if (newToken) {
                await saveTokenToLocalStorage(newToken);


                dispatch(setIsAuthAC(true));
                let currentUser = await authAPI.getCurrentUser(newToken);
                dispatch(setCurrentUserAC(currentUser));
                dispatch(GetRunnerData(newToken, currentUser.id));
                console.log(`first: `, newToken);
                console.log(currentUser);
            }
        } else {


            dispatch(setIsAuthAC(true));
            let currentUser = await authAPI.getCurrentUser(token);
            dispatch(setCurrentUserAC(currentUser));
            dispatch(GetRunnerData(token, currentUser.id));
            console.log(`other: `, token);
            console.log(currentUser);
        }
    } catch (err) {
        console.log(err)
    }
};

const GetRunnerData = (token, currentUserId) => async dispatch => {
    try {
        let data = await authAPI.getDataCurrentUser(token);
        let runnerData = data.filter(item => item.user_id === currentUserId);
        let testData = runnerData.filter(item => item.id >= 395 && item.id <= 407);
        console.log(currentUserId, testData);
        dispatch(setCurrentUserJogsAC(testData));

    } catch (err) {
        console.log(err);
    }
};


let initialState = {
    isAuth: false,
    currentUser: null,
    currentUserJogs: [],
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            };
        case SET_CURRENT_USER_JOGS:
            return {
                ...state,
                currentUserJogs: [...action.jogs]
            };
        default: {
            return state;
        }
    }
};
export default AuthReducer;