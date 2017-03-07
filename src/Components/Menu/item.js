/**
 * Created by 12072 on 03/03/17.
 */
import React, { Component } from 'react';
import './item.css';
import MultiSelect from '../MultiSelect';
import Immutable from 'immutable';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.multiselectChange = this.multiselectChange.bind(this);
    }

    multiselectChange(filterObject) {
        this.props.menuFilterChange(filterObject);
    }

    onMouseLeave() {
        this.setState({
            hover: false
        });
    }

    onMouseOver() {
        this.setState({
            hover: true
        });
    }

    getMenuItemByType() {
        const { item, filter } = this.props;
        switch (item.get('type')) {
            case 'multiSelection':
                return(<MultiSelect item={item} filter={filter} multiselectChange={this.multiselectChange} />)
            default:
                return null;
        }
    }

    render() {
        const style = {
            display: this.state.hover ? 'flex' : 'none'
        };
        const { item } = this.props;
        return (
            <div className={`menu-wrapper ${this.state.hover ? 'menu-wrapper-hover' : ''}`} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                <div className="menu-item">
                    {item.get('label')}
                </div>
                <div style={style} className="hide-border"></div>
                <div style={style} className="menu-hover">
                    {this.getMenuItemByType()}
                </div>
            </div>
        );
    }
}

Item.defaultProps = {
    filter: Immutable.Map({}),
    item: Immutable.fromJS({}),
    menuFilterChange: () => {}
};

export default Item;
