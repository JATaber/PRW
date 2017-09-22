import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MdSearch from 'react-icons/lib/md/search'

class Nav extends Component{
    render(){
        return(
            <nav className="navBar">
                <h1>Welcome to Go Pin</h1>
                <ul>
                    <NavLink to="/"><li>HOME</li></NavLink>
                    <NavLink to="/Search"><li>{MdSearch} SEARCH</li></NavLink>
                </ul>
            </nav>
        );
    }
}

export default Nav;