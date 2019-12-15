import React from "react";
import {SessionWindow} from "./SessionWindow";
import {connect} from "react-redux";
import {AuthorizationCheckThunk} from "../../Redux/Reducer";

const SessionWindowContainer = ({AuthorizationCheckThunk}) => {
    return <SessionWindow authorizationCheck={AuthorizationCheckThunk}/>
};

export default connect(null, {AuthorizationCheckThunk})(SessionWindowContainer)