import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './redux/configure-store';
import AppRoutes from './routes';
import './index.css';
const store = configureStore({});
// store.dispatch({type: 'FETCH_CATEGORY', url: '/proxy/bangalore/category/beds?redirect=false'});
ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={browserHistory} routes={AppRoutes} />
        </Provider>
    ),
    document.getElementById('root')
);
