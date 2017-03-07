/**
 * Created by 12072 on 03/03/17.
 */
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export default (initialState) => {
    const sagasMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, applyMiddleware(sagasMiddleware));
    sagasMiddleware.run(rootSaga);
    return store;
};