/**
 * Created by 12072 on 06/03/17.
 */
import categoryConstants from '../constants/category';

export const fetchCategoryAPI = (url) => ({
   type: categoryConstants.FETCH_CATEGORY,
    url
});

export const updateFilter = (filter) => ({
    type: categoryConstants.UPDATE_FILTER,
    filter
});