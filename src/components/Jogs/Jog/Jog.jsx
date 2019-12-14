import React from "react";
import css from "./Jog.module.css";
import jogImg from "./../../../Files/Images/jog.svg";
import {formatDate} from "../../../Redux/AuthReducer";

export const Jog = ({item}) => {
    let date = formatDate(item.date);
    return (
        <div className={css.jog}>
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