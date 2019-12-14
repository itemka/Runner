import React, {useState} from "react";
import css from "./Runner.module.css";
import {SessionWindow} from "../SessionWindow/SessionWindow";
import {Info} from "../Info/Info";
import Jogs from "../Jogs/Jogs";
import {MobileMenu} from "../Jogs/MobileMenu/MobileMenu";
import {Redirect, Route, Switch} from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import SessionWindowContainer from "../SessionWindow/SessionWindowContainer";

export const Runner = ({isAuth}) => {
    let [filter, setFilter] = useState(false);
    let [add, setAdd] = useState(false);
    let [mobileMenu, setMobileMenu] = useState(false);

    let activateFilter = bool => setFilter(bool);
    let activateAdd = bool => setAdd(bool);
    let activateMobileMenu = bool => setMobileMenu(bool);

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
                                   render={() => <Jogs filter={filter} add={add} activateAdd={activateAdd}/>}/>
                            <Route path='/info' render={() => <Info/>}/>
                            <Route path='/contactUs' render={() => <></>}/>
                            <Route path='/session'
                                   render={() => <div className={css.underHeader}><SessionWindow/></div>}/>
                            <Route path='*' render={() => <Redirect to={'/'}/>}/>
                        </Switch>
                    }
                </>
                : <MobileMenu activateMobileMenu={activateMobileMenu}/>
            }
        </div>
    )
};