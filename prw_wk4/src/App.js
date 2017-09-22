import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="cont">
              <Header />
              <Main />
              <Footer />
          </div>
      </Router>
    );
  }
}

export default App;
