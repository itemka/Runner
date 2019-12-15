import React from "react";
import css from "./Jog.module.css";
import jogImg from "./../../../Files/Images/jog.svg";

export const Jog = ({item, date, updateJog}) => {
    return (
        <div className={css.jog} onClick={() => updateJog()}>
            <img src={jogImg} className={css.jogImg} alt="jog"/>
            <div className={css.jogData}>
                <span className={css.dataItem}><span className={css.dataItemColor}>{date}</span></span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Speed: <span className={css.dataItemColor}>15</span>
                </span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Distance: <span className={css.dataItemColor}>{item.distance} km</span>
                </span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Time: <span className={css.dataItemColor}>{item.time} min</span>
                </span>
            </div>
        </div>
    )
};