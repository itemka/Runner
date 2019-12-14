import React from 'react';
import {EditForm} from "./EditForm";
import {connect} from "react-redux";
import {AddJogThunk} from "../../../Redux/Reducer";

const EditFormContainer = (props) => {
    return <EditForm activateAdd={props.activateAdd}
                     addJogThunk={props.AddJogThunk}/>
};

export default connect(null, {AddJogThunk})(EditFormContainer)