import React from "react";
import {Runner} from "./Runner";
import {connect} from "react-redux";
import {AuthorizationCheckThunk, SetCurrentPageThunk, SetJogsToRender} from "../../Redux/Reducer";
import {getCurrentUserJogs, getIsAuth} from "../../Redux/Selectors";

class RunnerContainer extends React.Component {
    componentDidMount() {
        this.props.AuthorizationCheckThunk(true);
    }

    state = {
        filter: false,
        turnOnEditForm: false,
        mobileMenu: false,
    };

    activateFilter = async bool => {
        this.setState({filter: bool});
        await this.props.SetJogsToRender(this.props.currentUserJogs);
        await this.props.SetCurrentPageThunk(1, this.props.currentUserJogs);
    };
    activateEditForm = bool => this.setState({turnOnEditForm: bool});
    activateMobileMenu = bool => this.setState({mobileMenu: bool});

    render() {
        return <Runner isAuth={this.props.isAuth} filter={this.state.filter}
                       turnOnEditForm={this.state.turnOnEditForm} mobileMenu={this.state.mobileMenu}
                       activateFilter={this.activateFilter.bind(this)}
                       activateEditForm={this.activateEditForm.bind(this)}
                       activateMobileMenu={this.activateMobileMenu.bind((this))}/>
    }
}

let mapStateToProps = state => ({isAuth: getIsAuth(state), currentUserJogs: getCurrentUserJogs(state)});
export default connect(mapStateToProps, {
    AuthorizationCheckThunk,
    SetJogsToRender,
    SetCurrentPageThunk
})(RunnerContainer)