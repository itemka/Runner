import React from "react";
import css from "./Jogs.module.css";
import addImg from "../../Files/Images/add.svg";
import {JogContainer} from "./Jog/JogContainer";

export const Jogs = ({jogsArray, activateEditForm, setJogForUpdate}) => {
    let jogs = jogsArray.map(item => <JogContainer key={item.id} item={item}
                                                   activateEditForm={activateEditForm}
                                                   setJogForUpdate={setJogForUpdate}/>);
    return (
        <>
            <div className={css.jogs}>{jogs}</div>
            <img onClick={() => activateEditForm(true)} className={css.addImg} src={addImg} alt=""/>
        </>
    )
};