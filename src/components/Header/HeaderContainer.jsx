import React, {Component} from "react";
import css from "./Header.module.css";
import {Header} from "./Header";
import {withRouter} from "react-router-dom";

class HeaderContainer extends Component {
    render() {
        return (
            <>
                <Header {...this.props}/>
            </>

        )
    }
}

export default withRouter(HeaderContainer);