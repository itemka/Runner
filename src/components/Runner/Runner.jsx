import React from "react";
import css from "./Runner.module.css";
import {Info} from "../Info/Info";
import {MobileMenu} from "../Jogs/MobileMenu/MobileMenu";
import {Redirect, Route, Switch} from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import SessionWindowContainer from "../SessionWindow/SessionWindowContainer";
import JogsContainer from "../Jogs/JogsContainer";

export const Runner = ({isAuth, filter, turnOnEditForm, mobileMenu, activateFilter, activateEditForm, activateMobileMenu}) => {
    return (
        <div className={css.Runner}>
            {!mobileMenu
                ? <>
                    <HeaderContainer filter={filter} isAuth={isAuth} activateFilter={activateFilter}
                                     activateMobileMenu={activateMobileMenu}/>
                    {!isAuth
                        ? <div className={css.underHeader}><SessionWindowContainer/></div>
                        : <Switch>
                            <Route exact path='/' render={() => <Redirect to={'/jogs'}/>}/>
                            <Route path='/jogs'
                                   render={() => <JogsContainer filter={filter} turnOnEditForm={turnOnEditForm}
                                                                activateEditForm={activateEditForm}/>}/>
                            <Route path='/info' render={() => <Info/>}/>
                            <Route path='/contactUs' render={() => <></>}/>
                            <Route path='/session'
                                   render={() => <div className={css.underHeader}><SessionWindowContainer/></div>}/>
                            <Route path='*' render={() => <Redirect to={'/'}/>}/>
                        </Switch>
                    }
                </>
                : <MobileMenu activateMobileMenu={activateMobileMenu}/>
            }
        </div>
    )
};