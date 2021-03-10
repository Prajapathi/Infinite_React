import React from 'react';
import "./App.css";

const Header = (props) => {
    return (
        <header className="header">
            {props.children}
        </header>
    )
}

export default Header
