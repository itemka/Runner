import React from "react";
import css from "./Jogs.module.css";
import {Filter} from "./Filter/Filter";
import {Jog} from "./Jog/Jog";
import addImg from "../../Files/Images/add.svg";
import {EditForm} from "./FormEdit/EditForm";
import {NothingIsThere} from "./NothingIsThere/NothingIsThere";
import {connect} from "react-redux";

const Jogs = ({filter, add, activateAdd, currentUserJogs}) => {
    let jogs = currentUserJogs.map(item => <Jog key={item.id} item={item}/>);
    return (
        <>
            <div>{add
                ? <div className={css.EditForm}><EditForm activateAdd={activateAdd}/></div>
                : <>
                    <div>{filter && <Filter/>}</div>
                    {currentUserJogs.length !== 0
                        ? <>
                            <div className={css.jogs}>{jogs}</div>
                            <img onClick={() => activateAdd(true)} className={css.addImg} src={addImg} alt=""/>
                        </>
                        : <>
                            <div className={css.nothingIsThere}><NothingIsThere activateAdd={activateAdd}/></div>
                        </>
                    }
                </>
            }</div>
        </>
    )
};
let mapStateToProps = state => ({
    currentUserJogs: state.authState.currentUserJogs
});
export default connect(mapStateToProps, {})(Jogs)