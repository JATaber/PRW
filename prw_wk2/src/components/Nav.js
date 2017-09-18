import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Overivew from '../pages/Overview';
import Expenses from '../pages/Expenses';
import Income from '../pages/Income';

class Nav extends Component {
    render(){
        return(
            <nav className="navBar">
                <ul>
                    <NavLink to="/" ><li>Overview</li></NavLink>
                    <NavLink to="/Expenses"><li>Expenses</li></NavLink>
                    <NavLink to="/Income"><li>Income</li></NavLink>
                </ul>
            </nav>
        );
    }
}

export default Nav;