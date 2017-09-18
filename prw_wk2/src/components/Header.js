import React, { Component } from 'react';
import Nav from './Nav';

import FaMoney from 'react-icons/lib/fa/money';

class Header extends Component {
    render(){
        return(
            <div className="headerBG">
            <header>
                <span><FaMoney /></span>
                <h1>Money Matters</h1>
                <Nav />
            </header>
            </div>
        );
    }
}

export default Header;