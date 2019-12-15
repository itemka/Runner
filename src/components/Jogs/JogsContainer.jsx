import React, {useState} from "react";
import {NothingIsThere} from "./NothingIsThere/NothingIsThere";
import {connect} from "react-redux";
import EditFormContainer from "./FormEdit/EditFormContainer";
import {getCurrentUserJogs, getJogsForFilter, getLoading} from "../../Redux/Selectors";
import {FilterDataOfJogs} from "../../Redux/Reducer";
import {Preloader} from "../Preloader/Preloader";
import {FilterContainer} from "./Filter/FilterContainer";
import {Jogs} from "./Jogs";

const JogsContainer = ({filter, turnOnEditForm, activateEditForm, currentUserJogs, FilterDataOfJogs, loading, jogsForFilter}) => {
    let [jogForUpdate, setJogForUpdate] = useState(null);
    let jogsArray = filter ? jogsForFilter : currentUserJogs;
    return (
        <div>
            {turnOnEditForm
                ? <EditFormContainer jogForUpdate={jogForUpdate}
                                     setJogForUpdate={setJogForUpdate}
                                     activateEditForm={activateEditForm}/>
                : <>
                    {filter && <FilterContainer FilterDataOfJogs={FilterDataOfJogs}/>}

                    {!loading ? <Preloader/>
                        : currentUserJogs.length === 0
                            ? <NothingIsThere activateEditForm={activateEditForm}/>
                            : <Jogs jogsArray={jogsArray}
                                    activateEditForm={activateEditForm}
                                    setJogForUpdate={setJogForUpdate}/>
                    }
                </>
            }
        </div>
    )
};

let mapStateToProps = state => ({
    currentUserJogs: getCurrentUserJogs(state),
    loading: getLoading(state),
    jogsForFilter: getJogsForFilter(state)
});
export default connect(mapStateToProps, {FilterDataOfJogs})(JogsContainer)