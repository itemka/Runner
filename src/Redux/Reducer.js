import {authAPI, GetToken} from "../API/API";


export const saveTokenToLocalStorage = token => localStorage.setItem("access-token", JSON.stringify(token));
export const getTokenFromLocalStorage = () => JSON.parse(localStorage.getItem("access-token"));

const SET_IS_AUTH = `RUNNER/IS_AUTH`;
const SET_CURRENT_USER = `RUNNER/SET_CURRENT_USER`;
const SET_CURRENT_USER_JOGS = `RUNNER/SET_CURRENT_USER_JOGS`;
const ADD_NEW_JOG_DATA = `RUNNER/ADD_NEW_JOG_DATA`;

export const setIsAuthAC = isAuth => ({type: SET_IS_AUTH, isAuth});
export const setCurrentUserAC = user => ({type: SET_CURRENT_USER, user});
export const setCurrentUserJogsAC = jogs => ({type: SET_CURRENT_USER_JOGS, jogs});
export const addNewJogDataAC = newJogData => ({type: ADD_NEW_JOG_DATA, newJogData});


const GetDataAfterCheckToken = token => async dispatch => {
    try {
        dispatch(setIsAuthAC(true));
        let currentUser = await authAPI.getCurrentUser(token);
        dispatch(setCurrentUserAC(currentUser));
        dispatch(GetRunnerData(token, currentUser.id));
    } catch (err) {
        console.log(err)
    }
};

export const CheckAuthorisationAtFirstBoot = () => async dispatch => {
    try {
        let token = getTokenFromLocalStorage();
        if (token !== null) {

            dispatch(GetDataAfterCheckToken(token));

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

                dispatch(GetDataAfterCheckToken(newToken));
            }
        } else {
            dispatch(GetDataAfterCheckToken(token));

        }
    } catch (err) {
        console.log(err)
    }
};

const GetRunnerData = (token, currentUserId) => async dispatch => {
    try {
        let data = await authAPI.getDataCurrentUser(token);
        let runnerData = data.reverse().filter(item => item.user_id === currentUserId);
        let testData = runnerData.filter(item => item.id >= 1440);
        console.log(`runnerData`, runnerData);
        console.log(`testData`, currentUserId, testData);
        dispatch(setCurrentUserJogsAC(testData));

    } catch (err) {
        console.log(err);
    }
};

export const AddJogThunk = (distance = 0, time = 0, date = new Date()) => async (dispatch, getState) => {
    try {
        // change dd.mm.yyyy to Sat Dec 14 2019 22:36:34 GMT+0300 (Moscow Standard Time)
        let changeDate = date !== ''
            ? new Date(`${date}`.replace(/(\d+)\.(\d+)\.(\d+)/, "$3-$2-$1"))
            : new Date();

        let newJog = {date: `${changeDate}`, time: time, distance: distance};
        let response = await authAPI.addNewJog(getTokenFromLocalStorage(), newJog);

        let newItemOfJog = {
            id: response.id,
            user_id: getState().partOfTheState.currentUser.id,
            distance: distance,
            time: time,
            date: changeDate.getTime() / 1000,
        };
        dispatch(addNewJogDataAC(newItemOfJog))

    } catch (err) {
        console.log(err)
    }
};


let initialState = {
    isAuth: false,
    currentUser: null,
    currentUserJogs: [],
};

const Reducer = (state = initialState, action) => {
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
        case ADD_NEW_JOG_DATA:
            return {
                ...state,
                currentUserJogs: [action.newJogData, ...state.currentUserJogs]
            };
        default: {
            return state;
        }
    }
};
export default Reducer;