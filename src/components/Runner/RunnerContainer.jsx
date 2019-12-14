import React, {Component} from "react";
import {Runner} from "./Runner";
import {connect} from "react-redux";
import {CheckAutorisationAtFirstBoot} from "../../Redux/AuthReducer";

class RunnerContainer extends Component {
    componentDidMount() {
        this.props.CheckAutorisationAtFirstBoot();
    }

    render() {
        return <Runner isAuth={this.props.isAuth}/>
    }
}

let mapStateToProps = state => ({
    isAuth: state.authState.isAuth
});
export default connect(mapStateToProps, {CheckAutorisationAtFirstBoot})(RunnerContainer)