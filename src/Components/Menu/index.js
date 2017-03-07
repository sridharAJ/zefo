/**
 * Created by 12072 on 03/03/17.
 */
import React, { Component } from 'react';
import './index.css';
import Item from './item';
import Immutable from 'immutable';
import { updateFilter } from '../../redux/actions/category';
import { browserHistory } from 'react-router';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.handleMenuFilterChange = this.handleMenuFilterChange.bind(this);
    }

    queryStringBuilder(filter) {
        const filters = filter.get('filters') || [];
        const sortBy = filter.get('sortBy');
        const queryString = ['filter'];
        filters.forEach((value, key) => {
            value.get('items').forEach((filterItem, filterItemKey) => {
                queryString.push(`${encodeURIComponent(`filter.${key}[]`)}=${filterItemKey}`);
            });
        });
        sortBy && queryString.push(`sortBy=${sortBy}`);
        queryString.push(`redirect=false`);
        return queryString.join('&');
    }

    handleMenuFilterChange(filter) {
        console.log("filter", filter)
        const filterObject = this.props.filterObject.setIn(['filters', filter.value], Immutable.fromJS(filter));
        const qs = this.queryStringBuilder(filterObject);
        this.props.dispatch(updateFilter(filter));
        browserHistory.push(`/bangalore/category/beds?${qs}`);
    }

    render() {
        const filters = this.props.filterObject.get('filters');
        return (
            <div className="menu">
                {
                    this.props.filterList.map((item) => {
                        const filter = filters.get(item.get('value')) ?
                                            filters.get(item.get('value')) :
                                            Immutable.fromJS({value: item.get('value'), items: {}});
                        return (
                            <Item key={item.get('value')} item={item} filter={filter} menuFilterChange={this.handleMenuFilterChange} />
                        )
                    })
                }
            </div>
        );
    }
}

Menu.defaultProps = {
    filterList: Immutable.List([]),
    filterObject: Immutable.Map({})
}

export default Menu;
