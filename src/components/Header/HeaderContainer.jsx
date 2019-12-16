import React from "react";
import {Header} from "./Header";
import {withRouter} from "react-router-dom";

const HeaderContainer = props => {
    let newPath = props.location.pathname.replace(`/`, ``);
    return <Header {...props} newPath={newPath}/>
};

export default withRouter(HeaderContainer);