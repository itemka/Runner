import React from "react";
import {Runner} from "./Runner";
import {connect} from "react-redux";
import {AuthorizationCheckThunk} from "../../Redux/Reducer";
import {getIsAuth} from "../../Redux/Selectors";

class RunnerContainer extends React.Component {
    componentDidMount() {
        this.props.AuthorizationCheckThunk(true);
    }

    state = {
        filter: false,
        turnOnEditForm: false,
        mobileMenu: false,
    };

    activateFilter = bool => this.setState({filter: bool});
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

let mapStateToProps = state => ({isAuth: getIsAuth(state)});
export default connect(mapStateToProps, {AuthorizationCheckThunk})(RunnerContainer)