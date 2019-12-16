import React, {useState} from "react";
import {NothingIsThere} from "./NothingIsThere/NothingIsThere";
import {connect} from "react-redux";
import EditFormContainer from "./FormEdit/EditFormContainer";
import {getJogsToRenderOnScreen, getLoading,} from "../../Redux/Selectors";
import {FilterDataOfJogs} from "../../Redux/Reducer";
import {Preloader} from "../Preloader/Preloader";
import {FilterContainer} from "./Filter/FilterContainer";
import {Jogs} from "./Jogs";
import Paginator from "../Paginator/Paginator";

const JogsContainer = ({filter, turnOnEditForm, activateEditForm, jogsToRenderOnScreen, FilterDataOfJogs, loading,}) => {
    let [jogForUpdate, setJogForUpdate] = useState(null);
    return (
        <div>
            {turnOnEditForm
                ? <EditFormContainer jogForUpdate={jogForUpdate}
                                     setJogForUpdate={setJogForUpdate}
                                     activateEditForm={activateEditForm}/>
                : <>
                    {filter && <FilterContainer FilterDataOfJogs={FilterDataOfJogs}/>}

                    {!loading ? <Preloader/>
                        : jogsToRenderOnScreen.length === 0
                            ? <NothingIsThere activateEditForm={activateEditForm}/>
                            : <Jogs jogsArray={jogsToRenderOnScreen} activateEditForm={activateEditForm}
                                    setJogForUpdate={setJogForUpdate}/>
                    }

                </>
            }
            {jogsToRenderOnScreen.length !== 0 && !turnOnEditForm && <Paginator/>}
        </div>
    )
};

let mapStateToProps = state => ({
    jogsToRenderOnScreen: getJogsToRenderOnScreen(state),
    loading: getLoading(state),
});
export default connect(mapStateToProps, {FilterDataOfJogs})(JogsContainer)