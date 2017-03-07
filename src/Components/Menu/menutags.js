/**
 * Created by 12072 on 07/03/17.
 */
import React, { Component } from 'react';
import Immutable from 'immutable';
import './menutags.css';

class MenuTags extends Component {

    render() {
        const { filterObject } = this.props;
        const filters = filterObject.get('filters') ? filterObject.get('filters') : Immutable.Map({});

        return (
            <div className="menu-tags">
                {
                    filters.valueSeq().map((filter) => {
                        const items = filter.get('items');
                        if(items) {
                            return (
                                items.valueSeq().map((item) => {
                                    return (
                                        <div className="menu-tags-item">
                                            {item.get('value')}
                                        </div>
                                    )
                                })
                            )
                        }

                        return null;
                    })
                }
            </div>
        )
    }
}

export default MenuTags;