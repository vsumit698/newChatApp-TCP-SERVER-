import React from 'react';
import ReactDOM from 'react-dom';
import './app.global.css';
import {BrowserRouter} from 'react-router-dom';
import App from './AppContainer/app';

ReactDOM.render(<BrowserRouter ><App /></BrowserRouter>,document.getElementById('root'));
