import {API, GetToken} from "../API/API";
import {changeDateToLongFormat, plusDaysToDate} from "../utils/changeDate";
import {getTokenFromLocalStorage, saveTokenToLocalStorage} from "../utils/LocalStorage";


const SET_IS_AUTH = `RUNNER/IS_AUTH`;
const SET_CURRENT_USER = `RUNNER/SET_CURRENT_USER`;
const SET_CURRENT_USER_JOGS = `RUNNER/SET_CURRENT_USER_JOGS`;
const ADD_NEW_JOG_DATA = `RUNNER/ADD_NEW_JOG_DATA`;
const TAKE_ERROR = `RUNNER/TAKE_ERROR`;
const SET_LOADING = `RUNNER/IS_LOADING`;
const UPDATE_ITEM_OF_JOGS = `RUNNER/UPDATE_ITEM_OF_JOGS`;
const SET_CURRENT_PAGE = `RUNNER/SET_CURRENT_PAGE`;
const SET_JOGS_TO_RENDER = `RUNNER/SET_JOGS_TO_RENDER`;
const SET_PAGES_COUNTER_ARRAY = `RUNNER/SET_PAGES_COUNTER_ARRAY`;
const SET_JOGS_TO_RENDER_ON_SCREEN = `RUNNER/SET_JOGS_TO_RENDER_ON_SCREEN`;
const SET_PORTION_NUMBER_FOR_PAGINATOR = `RUNNER/SET_PORTION_NUMBER_FOR_PAGINATOR`;
const SET_CURRENT_NUMBER_FOR_PAGINATOR = `RUNNER/SET_CURRENT_NUMBER_FOR_PAGINATOR`;


export const setIsAuthAC = isAuth => ({type: SET_IS_AUTH, partOfObject: {isAuth}});
export const setCurrentUserAC = user => ({type: SET_CURRENT_USER, user});
export const setCurrentUserJogsAC = jogs => ({type: SET_CURRENT_USER_JOGS, jogs});
export const addNewJogDataAC = newJogData => ({type: ADD_NEW_JOG_DATA, newJogData});
export const takeErrorAC = error => ({type: TAKE_ERROR, partOfObject: {error}});
export const setLoadingAC = isLoading => ({type: SET_LOADING, partOfObject: {loading: isLoading}});
export const updateItemOfJogs = updateJog => ({type: UPDATE_ITEM_OF_JOGS, updateJog});
export const setCurrentPage = currentPage => ({type: SET_CURRENT_PAGE, partOfObject: {currentPage}});
export const setJogsToRender = jogsToRender => ({type: SET_JOGS_TO_RENDER, jogsToRender});
export const setPagesCounterArray = pagesCounterArray => ({type: SET_PAGES_COUNTER_ARRAY, pagesCounterArray});
export const setJogsToRenderOnScreen = jogsToRenderOnScreen => ({
    type: SET_JOGS_TO_RENDER_ON_SCREEN,
    jogsToRenderOnScreen
});
export const setCurrentPortionForPaginator = currentPortionForPaginator => ({
    type: SET_CURRENT_NUMBER_FOR_PAGINATOR,
    partOfObject: {currentPortionForPaginator}
});


const GetDataAfterCheckToken = token => async dispatch => {
    try {
        dispatch(setIsAuthAC(true));
        dispatch(setLoadingAC(false)); // turn on preloader
        let currentUser = await API.getCurrentUser(token);
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
        let data = await API.getDataCurrentUser(token);
        let runnerData = await data.reverse().filter(item => item.user_id === currentUserId);
        await dispatch(setCurrentUserJogsAC(runnerData));
        await dispatch(SetJogsToRender(runnerData));
        await dispatch(SetCurrentPageThunk(1, runnerData));
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
        let response = await API.addNewJog(getTokenFromLocalStorage(), newJog);

        let newItemOfJog = {
            id: response.id,
            user_id: getState().partOfTheState.currentUser.id,
            distance: distance,
            time: time,
            date: changeDate.getTime() / 1000,
        };

        await dispatch(addNewJogDataAC(newItemOfJog));
        await dispatch(SetCurrentPageThunk(1)); // set array to render
        await dispatch(SetPortionNumberForPaginator(1));

        dispatch(setLoadingAC(true)); // turn off preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};


export const FilterDataOfJogs = (leftBorder = '', rightBorder = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoadingAC(false)); // turn on preloader

        let changLeftBorder = leftBorder !== '' ? changeDateToLongFormat(leftBorder).getTime() : '';
        let changRightBorder = rightBorder !== '' ? plusDaysToDate(changeDateToLongFormat(rightBorder), 1) : '';
        let userJogs = await getState().partOfTheState.currentUserJogs;

        let filterData = await userJogs.filter(item => {
            if (changLeftBorder !== '' && changRightBorder !== '') {
                if (item.date * 1000 >= changLeftBorder && item.date * 1000 < changRightBorder) return true;
                else return false;
            }

            if (changLeftBorder === '' && changRightBorder !== '') {
                if (item.date * 1000 < changRightBorder) return true;
                else return false;
            }

            if (changLeftBorder !== '' && changRightBorder === '') {
                if (item.date * 1000 >= changLeftBorder) return true;
                else return false;
            }
            if (changLeftBorder === '' && changRightBorder === '') return true;
        });
        await dispatch(SetJogsToRender(filterData));
        await dispatch(SetCurrentPageThunk(1, filterData));

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
        let response = await API.updateJog(getTokenFromLocalStorage(), newJog);

        let updateItemOfJog = {
            id: response.id,
            user_id: getState().partOfTheState.currentUser.id,
            distance: distance,
            time: time,
            date: changeDate.getTime() / 1000,
        };
        await dispatch(updateItemOfJogs(updateItemOfJog));
        await dispatch(SetCurrentPageThunk(getState().partOfTheState.currentPage)); // set array to render

        dispatch(setLoadingAC(true)); // turn off preloader
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const SetJogsToRender = arrayToRender => async (dispatch, getState) => {
    try {
        // calculate count of pages
        let pagesCounter = await Math.ceil(arrayToRender.length / getState().partOfTheState.pageSize);
        let pagesCounterArray = [];
        for (let i = 1; i <= pagesCounter; i++) pagesCounterArray.push(i);
        await dispatch(setPagesCounterArray(pagesCounterArray));
        await dispatch(setJogsToRender(arrayToRender));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const SetCurrentPageThunk = (currentPage, jogsToRender = null) => async (dispatch, getState) => {
    try {
        await dispatch(setCurrentPage(currentPage));
        let pageSize = getState().partOfTheState.pageSize;
        let jogs = jogsToRender === null ? getState().partOfTheState.jogsToRender : jogsToRender;

        let arrayToRender = await jogs.filter((item, index) => {
            if (index >= (currentPage - 1) * pageSize && index <= currentPage * pageSize - 1) return true;
            else return false;
        });

        await dispatch(setJogsToRenderOnScreen(arrayToRender));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

export const SetPortionNumberForPaginator = currentPortion => async (dispatch) => {
    try {
        await dispatch(setCurrentPortionForPaginator(currentPortion));
    } catch (err) {
        dispatch(takeErrorAC(err))
    }
};

let initialState = {
    isAuth: false,
    currentUser: null,
    currentUserJogs: [],
    error: null,
    loading: true,

    jogsToRender: [],
    jogsToRenderOnScreen: [],

    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    pagesCounterArray: [],
    currentPortionForPaginator: 1
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
        case TAKE_ERROR:
        case SET_LOADING:
        case SET_CURRENT_PAGE:
        case SET_PORTION_NUMBER_FOR_PAGINATOR:
        case SET_CURRENT_NUMBER_FOR_PAGINATOR:
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
                currentUserJogs: [...action.jogs],
                totalUsersCount: action.jogs.length
            };
        case ADD_NEW_JOG_DATA:
            return {
                ...state,
                currentUserJogs: [action.newJogData, ...state.currentUserJogs],
                jogsToRender: [action.newJogData, ...state.jogsToRender]
            };
        case UPDATE_ITEM_OF_JOGS:
            return {
                ...state,
                currentUserJogs: state.currentUserJogs.map(item => {
                    if (item.id === action.updateJog.id) return {...action.updateJog};
                    else return item;
                }),
                jogsToRender: state.jogsToRender.map(item => {
                    if (item.id === action.updateJog.id) return {...action.updateJog};
                    else return item;
                })
            };
        case SET_JOGS_TO_RENDER:
            return {
                ...state,
                jogsToRender: [...action.jogsToRender]
            };
        case SET_PAGES_COUNTER_ARRAY:
            return {
                ...state,
                pagesCounterArray: [...action.pagesCounterArray]
            };
        case SET_JOGS_TO_RENDER_ON_SCREEN:
            return {
                ...state,
                jogsToRenderOnScreen: [...action.jogsToRenderOnScreen]
            };
        default: {
            return state;
        }
    }
};
export default Reducer;