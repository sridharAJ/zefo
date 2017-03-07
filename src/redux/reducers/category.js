/**
 * Created by 12072 on 06/03/17.
 */
import Immutable from 'immutable';
import categoryConstants from '../constants/category';

const initState = Immutable.fromJS({
    filterObject: {},
    filterList: [],
    productsList: [],
    title: "",
    loading: false
});

const Category = (state = initState, action) => {
    let nextState;
    switch (action.type) {
        case categoryConstants.FETCH_CATEGORY_PENDING:
            nextState = state.set('loading', true);
            return nextState;
        case categoryConstants.FETCH_CATEGORY_SUCCESS:
            const category = action.category;
            nextState = state.set('filterObject', Immutable.fromJS(category.filterObject));
            nextState = nextState.set('filterList', Immutable.fromJS(category.filterList));
            nextState = nextState.set('productsList', Immutable.fromJS(category.productsList));
            nextState = nextState.set('title', Immutable.fromJS(category.title));
            nextState = nextState.set('loading', false);
            return nextState;
        case categoryConstants.FETCH_CATEGORY_REJECTED:
            nextState = state.set('loading', false);
            return nextState;
        case categoryConstants.UPDATE_FILTER:
            const filter = Immutable.fromJS(action.filter);
            nextState = state.setIn(['filterObject', 'filters', filter.get('value')], filter);
            return nextState;
        default:
            return state;
    }
};


export default Category;