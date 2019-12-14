import React, {Component} from "react";
import {Runner} from "./Runner";
import {connect} from "react-redux";
import {CheckAuthorisationAtFirstBoot} from "../../Redux/Reducer";
import {getIsAuth} from "../../Redux/Selectors";

class RunnerContainer extends Component {
    componentDidMount() {
        this.props.CheckAuthorisationAtFirstBoot();
    }

    render() {
        return <Runner isAuth={this.props.isAuth}/>
    }
}

let mapStateToProps = state => ({isAuth: getIsAuth(state)});
export default connect(mapStateToProps, {CheckAuthorisationAtFirstBoot})(RunnerContainer)