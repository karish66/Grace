import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import Test from './testing/model'
import Dashboard from './scenes/privateScene/Dashboard'
import { Provider } from 'react-redux';
import Template from './template'
// import {store} from './store';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store =  createStore(reducers, {}, applyMiddleware(reduxThunk)) 


ReactDOM.render(
    <Provider store = { store }>
        
        <Template/>
    </Provider>, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
