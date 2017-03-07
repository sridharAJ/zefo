/**
 * Created by 12072 on 06/03/17.
 */
import React from 'react';
import { Route } from 'react-router';
import Category from './pages/Category';
import App from './App';

const AppRoutes = (
    <Route path='/' component={App}>
        <Route path={':city/category/:category'} component={Category}/>
    </Route>
);

export default AppRoutes;