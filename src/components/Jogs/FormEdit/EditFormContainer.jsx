import React, {useState} from "react";
import css from "./EditForm.module.css";
import {EditForm} from "./EditForm";
import {connect} from "react-redux";
import {AddJogThunk, UpdateJogThunk} from "../../../Redux/Reducer";
import {formatDate} from "../../../utils/changeDate";

const EditFormContainer = ({activateEditForm, AddJogThunk, setJogForUpdate, jogForUpdate = null, UpdateJogThunk}) => {
    let [updatedDistance, updatedTime, updatedDate] = ['', '', ''];
    if (jogForUpdate !== null) {
        [updatedDistance, updatedTime, updatedDate] = [
            jogForUpdate.distance, jogForUpdate.time, formatDate(jogForUpdate.date)
        ]
    }

    let [distance, setDistance] = useState(updatedDistance);
    let [time, setTime] = useState(updatedTime);
    let [date, setDate] = useState(updatedDate);
    let getDistance = event => setDistance(event.currentTarget.value);
    let getTime = event => setTime(event.currentTarget.value);
    let getDate = event => setDate(event.currentTarget.value);
    let buttonName = updatedDate === '' ? 'Save' : 'Update';

    let buttonClick = () => {
        if (jogForUpdate === null) {
            AddJogThunk(+distance, +time, date);
            setJogForUpdate(null);
            activateEditForm(false);
        } else {
            UpdateJogThunk(+distance, +time, date, jogForUpdate.id);
            setJogForUpdate(null);
            activateEditForm(false);
        }
    };
    let Cancel = () => {
        setJogForUpdate(null);
        activateEditForm(false);
    };

    return (
        <div className={css.EditFormContainer}>
            <EditForm distance={distance} time={time} date={date} buttonName={buttonName}
                      getDistance={getDistance} Cancel={Cancel} getTime={getTime}
                      getDate={getDate} buttonClick={buttonClick}/>
        </div>
    )
};

export default connect(null, {AddJogThunk, UpdateJogThunk})(EditFormContainer)