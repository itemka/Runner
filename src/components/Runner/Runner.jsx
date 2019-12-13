import React from "react";
import css from "./Runner.module.css";
import {HeaderContainer} from "../Header/HeaderContainer";
import {SessionWindow} from "../SessionWindow/SessionWindow";
import {Info} from "../Info/Info";
import {NothingIsThere} from "../NothingIsThere/NothingIsThere";
import {FormEdit} from "../FormEdit/FormEdit";

export const Runner = () => {
    return (
        <div className={css.Runner}>
            <HeaderContainer/>
            {/*<div className={css.underHeader}>*/}
            {/*    <SessionWindow/>*/}
            {/*</div>*/}
            <div className={css.underHeader}>
                <FormEdit/>
            </div>
            {/*<div className={css.underHeader}>*/}
            {/*    <Info/>*/}
            {/*</div>*/}
            {/*<div className={css.underHeaderSad}>*/}
            {/*    <NothingIsThere/>*/}
            {/*</div>*/}
        </div>
    )
};