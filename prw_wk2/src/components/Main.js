import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Overview from '../pages/Overview';
import Expenses from '../pages/Expenses';
import Income from '../pages/Income';

class Main extends Component {
    render(){
        return(
            <section>
                <Route exact path = '/' component={Overview} />
                <Route exact path = '/Expenses' component={Expenses} />
                <Route exact path = '/Income' component={Income} />
            </section>
        );
    }
}

export default Main;