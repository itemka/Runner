import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/Store";
import {RunnerContainer} from "./components/Runner/RunnerContainer";

const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <RunnerContainer/>
            </Provider>
        </HashRouter>
    );
};

export default App;
