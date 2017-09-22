import React, { Component } from 'react';
import {
    Route
} from 'react-router-dom';
import PgHome from '../pages/PgHome';
import PgSearch from '../pages/PgSearch';


class Main extends Component{
    render() {
        return(
          <section>
              <Route exact path = '/' component={PgHome} />
              <Route exact path = '/Search' component={PgSearch} />
          </section>
        );
    }
}

export default Main;