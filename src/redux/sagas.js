/**
 * Created by 12072 on 06/03/17.
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { get } from './ApiClient';
import categoryConstants from './constants/category';


export function* fetchCategory(action) {
    yield put({ type: categoryConstants.FETCH_CATEGORY_PENDING });
    try {
        const category = yield call(get, action.url);
        yield put({ type: categoryConstants.FETCH_CATEGORY_SUCCESS, category });
    } catch(e) {
        yield put({ type: categoryConstants.FETCH_CATEGORY_REJECTED })
    }
}

export function* watchFetchCategory() {
    yield takeLatest('FETCH_CATEGORY', fetchCategory)
}

export default function* rootSaga() {
    yield [
        watchFetchCategory()
    ]
}