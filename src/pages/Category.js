/**
 * Created by 12072 on 03/03/17.
 */
import React, { Component } from 'react';
import Menu from '../Components/Menu';
import Grid from '../Components/Grid';
import { connect } from 'react-redux';
import { fetchCategoryAPI } from '../redux/actions/category';

class Category extends Component {

    componentDidMount() {
        const qs = this.props.location.search ? this.props.location.search : `?&redirect=false`;
        this.props.dispatch(fetchCategoryAPI(`/proxy/bangalore/category/beds${qs}`));
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search !== nextProps.location.search) {
            nextProps.dispatch(fetchCategoryAPI(`/proxy/bangalore/category/beds${nextProps.location.search}`));
        }
    }

    render() {
        const { filterList, filterObject, productsList, dispatch, loading, params } = this.props;
        return (
            <div className="category">
                <Menu filterList={filterList} filterObject={filterObject} dispatch={dispatch} />
                <Grid productsList={productsList} loading={loading} city={params.city} />
            </div>
        );
    }
}

export default connect((state) => {
    const category = state.category;
    return {
        filterList: category.get('filterList'),
        filterObject: category.get('filterObject'),
        productsList: category.get('productsList'),
        loading: category.get('loading')
    }
})(Category);
