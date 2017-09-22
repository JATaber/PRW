import React, { Component } from 'react';
import Nav from './Nav';
import GoPin from 'react-icons/lib/go/pin';

class Header extends Component{
    render(){
        return(
            <div className="headerBG">
                <header>
                    <span><GoPin />Go Pin</span>
                    <Nav />
                </header>
            </div>
        );
    }
}

export default Header;