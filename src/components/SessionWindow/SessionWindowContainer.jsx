import React from "react";
import {SessionWindow} from "./SessionWindow";
import {connect} from "react-redux";
import {AuthorizationCheckThunk} from "../../Redux/Reducer";

class SessionWindowContainer extends React.Component {
    render() {
        return <SessionWindow authorizationCheck={this.props.AuthorizationCheckThunk}/>
    }
}

export default connect(null, {AuthorizationCheckThunk})(SessionWindowContainer)