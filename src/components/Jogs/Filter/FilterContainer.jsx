import React, {useState} from "react";
import {Filter} from "./Filter";

export const FilterContainer = ({FilterDataOfJogs}) => {
    let [leftBorder, setLeftBorder] = useState('');
    let [rightBorder, setRightBorder] = useState('');

    let checkLeftBorder = event => {
        setLeftBorder(event.currentTarget.value);
        event.currentTarget.value.length === 10 && FilterDataOfJogs(event.currentTarget.value, rightBorder);
        event.currentTarget.value.length === 0 && FilterDataOfJogs(event.currentTarget.value, rightBorder);
    };

    let checkRightBorder = event => {
        setRightBorder(event.currentTarget.value);
        event.currentTarget.value.length === 10 && FilterDataOfJogs(leftBorder, event.currentTarget.value);
        event.currentTarget.value.length === 0 && FilterDataOfJogs(leftBorder, event.currentTarget.value);
    };

    return <Filter leftBorder={leftBorder} checkLeftBorder={checkLeftBorder}
                   rightBorder={rightBorder} checkRightBorder={checkRightBorder}/>
};