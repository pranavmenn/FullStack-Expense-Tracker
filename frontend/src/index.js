import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter  } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store'
const token = localStorage.getItem('JWT');

const store = configureStore()



axios.defaults.baseURL = 'https://localhost:4000/api';
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(req =>{
    console.log('Axios Request Config: '.padEnd(25, ' '),req)
    return req;
}, error => {
   console.log('Axios Error: '.padEnd(25, ' '), error);
   return Promise.reject(error); //passing the error further
});

axios.interceptors.response.use(res => {
    console.log('Axios Response Config: '.padEnd(25, ' '), res)

    return res;
}, error => {
    console.log('Axios Error: '.padEnd(25, ' '), error);
    return Promise.reject(error);
});


ReactDOM.render(<Provider store={store}>><BrowserRouter><App />  </BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
