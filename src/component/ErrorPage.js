import React from "react";
import '../css/style.scss';
import '../css/dstyle.scss';
import epage from '../img/404.png';

const ErrorPage = () => {

    return (
    <div className="s-message">
        <img src={epage}/>
    </div>
    
    );

}

export default ErrorPage;
