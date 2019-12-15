import React from "react";
import {formatDate} from "../../../utils/changeDate";
import {Jog} from "./Jog";

export const JogContainer = ({item, activateEditForm, setJogForUpdate}) => {
    let date = formatDate(item.date);
    let updateJog = () => {
        activateEditForm(true);
        setJogForUpdate(item);
    };
    return <Jog item={item} date={date} updateJog={updateJog}/>
};