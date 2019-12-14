import React from "react";
import {SessionWindow} from "./SessionWindow";
import {connect} from "react-redux";
import {AuthorizationCheckThunk} from "../../Redux/AuthReducer";

class SessionWindowContainer extends React.Component {
    render() {
        return <SessionWindow authorizationCheck={this.props.AuthorizationCheckThunk}/>
    }
}

// let mapStateToProps = state => ({
//     isAuth: state.authState.isAuth
// });
export default connect(null, {AuthorizationCheckThunk})(SessionWindowContainer)