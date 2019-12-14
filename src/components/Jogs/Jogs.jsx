import React from "react";
import css from "./Jogs.module.css";
import {Filter} from "./Filter/Filter";
import {Jog} from "./Jog/Jog";
import addImg from "../../Files/Images/add.svg";
import {NothingIsThere} from "./NothingIsThere/NothingIsThere";
import {connect} from "react-redux";
import EditFormContainer from "./FormEdit/EditFormContainer";
import {getCurrentUserJogs, getJogsForFilter, getLoading} from "../../Redux/Selectors";
import {FilterDataOfJogs} from "../../Redux/Reducer";
import {Preloader} from "../Preloader/Preloader";

const Jogs = ({filter, add, activateAdd, currentUserJogs, FilterDataOfJogs, loading, jogsForFilter}) => {
    let jogsArray = filter ? jogsForFilter : currentUserJogs;
    let jogs = jogsArray.map(item => <Jog key={item.id} item={item}/>);
    return (
        <>
            <div>{add
                ? <div className={css.EditForm}><EditFormContainer activateAdd={activateAdd}/></div>
                : <>
                    <div>{filter && <Filter FilterDataOfJogs={FilterDataOfJogs}/>}</div>
                    {loading
                        ? currentUserJogs.length !== 0
                            ? <>
                                <div className={css.jogs}>{jogs}</div>
                                <img onClick={() => activateAdd(true)} className={css.addImg} src={addImg} alt=""/>
                            </>
                            : <>
                                <div className={css.nothingIsThere}><NothingIsThere activateAdd={activateAdd}/></div>
                            </>
                        : <Preloader/>
                    }
                </>
            }</div>
        </>
    )
};

let mapStateToProps = state => ({
    currentUserJogs: getCurrentUserJogs(state),
    loading: getLoading(state),
    jogsForFilter: getJogsForFilter(state)
});
export default connect(mapStateToProps, {FilterDataOfJogs})(Jogs)