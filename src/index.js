import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import ReactManager from './components/ReactManager';

ReactDOM.render(
  <Router>
    <ReactManager />
  </Router>
, document.getElementById('root'));
