import {authAPI, GetToken} from "../API/API";
import {changeDateToLongFormat} from "../utils/changeDate";
import {getTokenFromLocalStorage, saveTokenToLocalStorage} from "../utils/LocalStorage";


const SET_IS_AUTH = `RUNNER/IS_AUTH`;
const SET_CURRENT_USER = `RUNNER/SET_CURRENT_USER`;
const SET_CURRENT_USER_JOGS = `RUNNER/SET_CURRENT_USER_JOGS`;
const ADD_NEW_JOG_DATA = `RUNNER/ADD_NEW_JOG_DATA`;
const TAKE_ERROR = `RUNNER/TAKE_ERROR`;
const SET_LOADING = `RUNNER/IS_LOADING`;
const SET_FILTER_JOGS = `RUNNER/SET_FILTER_JOGS`;
const UPDATE_ITEM_OF_JOGS = `RUNNER/UPDATE_ITEM_OF_JOGS`;


export const setIsAuthAC = isAuth => ({type: SET_IS_AUTH, partOfObject: {isAuth}});
export const setCurrentUserAC = user => ({type: SET_CURRENT_USER, user});
export const setCurrentUserJogsAC = jogs => ({type: SET_CURRENT_USER_JOGS, jogs});
export const addNewJogDataAC = newJogData => ({type: ADD_NEW_JOG_DATA, newJogData});
export const takeErrorAC = error => ({type: TAKE_ERROR, partOfObject: {error}});
export const setLoadingAC = isLoading => ({type: SET_LOADING, partOfObject: {loading: isLoading}});
export const setFilterJogsAC = filterJogs => ({type: SET_FILTER_JOGS, filterJogs});
export const updateItemOfJogs = updateJog => ({type: UPDATE_ITEM_OF_JOGS, updateJog});


const GetDataAfterCheckToken = token => async dispatch => {
    try {
        dispatch(setIsAuthAC(true));
        dispatch(setLoadingAC(false)); // turn on preloader
        let currentUser = await authAPI.getCurrentUser(token);
        await dispatch(setCurrentUserAC(currentUser));
        await dispatch(GetRunnerData(token, currentUser.id));
        dispatch(setLoadingAC(true)); // turn off preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const AuthorizationCheckThunk = (firstBoot = false) => async dispatch => {
    try {
        let token = getTokenFromLocalStorage();

        if (token === null && firstBoot === false) {
            let newToken = await GetToken(`hello`);
            if (newToken) {
                await saveTokenToLocalStorage(newToken);
                dispatch(GetDataAfterCheckToken(newToken));
            }
        }

        token !== null && dispatch(GetDataAfterCheckToken(token));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

const GetRunnerData = (token, currentUserId) => async dispatch => {
    try {
        let data = await authAPI.getDataCurrentUser(token);
        let runnerData = await data.reverse().filter(item => item.user_id === currentUserId);
        let testData = await runnerData.filter(item => item.id >= 1450);
        console.log(`runnerData`, runnerData);
        console.log(`testData`, currentUserId, testData);
        await dispatch(setCurrentUserJogsAC(testData));
        await dispatch(setFilterJogsAC(testData));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const AddJogThunk = (distance = 0, time = 0, date = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAC(false)); // turn on preloader
        // change dd.mm.yyyy to Sat Dec 14 2019 22:36:34 GMT+0300 (Moscow Standard Time)
        let changeDate = date !== '' ? changeDateToLongFormat(date) : new Date();

        let newJog = {date: `${changeDate}`, time: time, distance: distance};
        let response = await authAPI.addNewJog(getTokenFromLocalStorage(), newJog);

        let newItemOfJog = {
            id: response.id,
            user_id: getState().partOfTheState.currentUser.id,
            distance: distance,
            time: time,
            date: changeDate.getTime() / 1000,
        };
        await dispatch(addNewJogDataAC(newItemOfJog));
        dispatch(setLoadingAC(true)); // turn off preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const FilterDataOfJogs = (leftBorder = '', rightBorder = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAC(false)); // turn on preloader

        let changLeftBorder = leftBorder !== '' ? changeDateToLongFormat(leftBorder).getTime() : '';
        let changRightBorder = rightBorder !== '' ? changeDateToLongFormat(rightBorder).getTime() : '';
        let userJogs = await getState().partOfTheState.currentUserJogs;

        let filterData = await userJogs.filter(item => {
            if (changLeftBorder !== '' && changRightBorder !== '') {
                if (item.date * 1000 >= changLeftBorder && item.date * 1000 <= changRightBorder) return true;
                else return false;
            }

            if (changLeftBorder === '' && changRightBorder !== '') {
                if (item.date * 1000 <= changRightBorder) return true;
                else return false;
            }

            if (changLeftBorder !== '' && changRightBorder === '') {
                if (item.date * 1000 >= changLeftBorder) return true;
                else return false;
            }
            if (changLeftBorder === '' && changRightBorder === '') return true;
        });

        // set filter array
        await dispatch(setFilterJogsAC(filterData));
        dispatch(setLoadingAC(true)); // turn of preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const UpdateJogThunk = (distance = 0, time = 0, date = '', jogId) => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAC(false)); // turn on preloader

        let changeDate = date !== '' ? changeDateToLongFormat(date) : new Date();
        let newJog = {
            date: `${changeDate}`,
            time: time,
            distance: distance,
            jog_id: jogId,
            user_id: getState().partOfTheState.currentUser.id,
        };
        let response = await authAPI.updateJog(getTokenFromLocalStorage(), newJog);

        let updateItemOfJog = {
            id: response.id,
            user_id: getState().partOfTheState.currentUser.id,
            distance: distance,
            time: time,
            date: changeDate.getTime() / 1000,
        };
        await dispatch(updateItemOfJogs(updateItemOfJog));
        dispatch(setLoadingAC(true)); // turn off preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};


let initialState = {
    isAuth: false,
    currentUser: null,
    currentUserJogs: [],
    jogsForFilter: [],
    error: null,
    loading: true,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
        case TAKE_ERROR:
        case SET_LOADING:
            return {
                ...state,
                ...action.partOfObject,
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
        case SET_FILTER_JOGS:
            return {
                ...state,
                jogsForFilter: [...action.filterJogs]
            };
        case UPDATE_ITEM_OF_JOGS:
            return {
                ...state,
                currentUserJogs: state.currentUserJogs.map(item => {
                    if (item.id === action.updateJog.id) return {...action.updateJog};
                    else return item;
                })
            };
        default: {
            return state;
        }
    }
};
export default Reducer;