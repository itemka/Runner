import {authAPI, GetToken} from "../API/API";


export const saveTokenToLocalStorage = token => localStorage.setItem("access-token", JSON.stringify(token));
export const getTokenFromLocalStorage = () => JSON.parse(localStorage.getItem("access-token"));

const SET_IS_AUTH = `RUNNER/IS_AUTH`;
const SET_CURRENT_USER = `RUNNER/SET_CURRENT_USER`;
const SET_CURRENT_USER_JOGS = `RUNNER/SET_CURRENT_USER_JOGS`;
const ADD_NEW_JOG_DATA = `RUNNER/ADD_NEW_JOG_DATA`;
const TAKE_ERROR = `RUNNER/TAKE_ERROR`;
const SET_LOADING = `RUNNER/IS_LOADING`;
const SET_FILTER_JOGS = `RUNNER/SET_FILTER_JOGS`;

export const setIsAuthAC = isAuth => ({type: SET_IS_AUTH, isAuth});
export const setCurrentUserAC = user => ({type: SET_CURRENT_USER, user});
export const setCurrentUserJogsAC = jogs => ({type: SET_CURRENT_USER_JOGS, jogs});
export const addNewJogDataAC = newJogData => ({type: ADD_NEW_JOG_DATA, newJogData});
export const takeErrorAC = error => ({type: TAKE_ERROR, error});
export const setLoadingAC = isLoading => ({type: SET_LOADING, isLoading});
export const setFilterJogsAC = filterJogs => ({type: SET_FILTER_JOGS, filterJogs});


const GetDataAfterCheckToken = token => async dispatch => {
    try {
        dispatch(setIsAuthAC(true));
        dispatch(setLoadingAC(false));
        let currentUser = await authAPI.getCurrentUser(token);
        await dispatch(setCurrentUserAC(currentUser));
        await dispatch(GetRunnerData(token, currentUser.id));
        dispatch(setLoadingAC(true));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const CheckAuthorisationAtFirstBoot = () => async dispatch => {
    try {
        let token = getTokenFromLocalStorage();
        if (token !== null) {

            dispatch(GetDataAfterCheckToken(token));

        }
    } catch (err) {
        dispatch(takeErrorAC(err))
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

export const AddJogThunk = (distance = 0, time = 0, date = new Date()) => async (dispatch, getState) => {
    try {
        // change dd.mm.yyyy to Sat Dec 14 2019 22:36:34 GMT+0300 (Moscow Standard Time)
        dispatch(setLoadingAC(false));
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
        await dispatch(addNewJogDataAC(newItemOfJog));
        dispatch(setLoadingAC(true));

    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const FilterDataOfJogs = (leftBorder = '', rightBorder = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAC(false));

        let changLeftBorder = leftBorder !== ''
            ? new Date(`${leftBorder}`.replace(/(\d+)\.(\d+)\.(\d+)/, "$3-$2-$1")).getTime()
            : '';
        let changRightBorder = rightBorder !== ''
            ? new Date(`${rightBorder}`.replace(/(\d+)\.(\d+)\.(\d+)/, "$3-$2-$1")).getTime()
            : '';
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
        dispatch(setLoadingAC(true));
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
        case TAKE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.isLoading
            };
        case SET_FILTER_JOGS:
            return {
                ...state,
                jogsForFilter: [...action.filterJogs]
            };
        default: {
            return state;
        }
    }
};
export default Reducer;