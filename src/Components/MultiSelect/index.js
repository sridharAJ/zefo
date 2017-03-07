/**
 * Created by 12072 on 04/03/17.
 */
import React, { Component } from 'react';
import './index.css';
import CheckBox from '../CheckBox';
import Immutable from 'immutable';

class MultiSelect extends Component {

    render() {
        const { item } = this.props;
        const itemList = item.get('itemList') || item.get('children');
        return (
            <div className={`multi-select ${this.props.className}`}>
                {
                    itemList && itemList.map((filterItem) => {
                        return (
                            <MultiSelectItem
                                key={filterItem.get('value')}
                                {...this.props}
                                filterItem={filterItem}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

MultiSelect.defaultProps = {
    item: Immutable.fromJS({}),
    filter: Immutable.fromJS({}),
    multiselectChange: () => {}
};

class MultiSelectItem extends Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    flattenNestedSelection(selectedList, flattenList) {
        selectedList.forEach((item) => {
            const value = item.get('value');
            const disabled = item.get('disabled');
            if(!disabled) {
                flattenList[value] = {
                    value
                };
                if(item.get('children')) {
                    this.flattenNestedSelection(item.get('children'), flattenList);
                }
            }
        })
    }

    handleOnChange(isChecked, selectedValue) {
        const { filterItem, filter } = this.props;
        const itemList = filterItem.get('itemList') || filterItem.get('children');
        const flattenObj = {};

        //Adding the current select
        flattenObj[selectedValue] = {
            value: selectedValue
        };

        //Check for any nested items
        if(itemList) {
            this.flattenNestedSelection(itemList, flattenObj);
        }

        //Override the existing filter with current selected filter
        const updatedFilter = {
            value: filter.get('value'),
            items: {
                ...filter.get('items').toJS(),
                ...flattenObj
            }
        };

        //Remove the filters if isChecked is false
        if(!isChecked) {
            for(var key in flattenObj) {
                if(flattenObj.hasOwnProperty(key))
                    delete updatedFilter.items[key];
            }
        }

        this.props.multiselectChange(updatedFilter);
    }

    render() {
        const { filterItem, filter, multiselectChange } = this.props;
        const filterItemValue = filterItem.get('value');
        const disabled = filterItem.get('disabled');
        const filterValue = filter.getIn(['items', filterItemValue, 'value']) || "";
        const checked = filterItemValue === filterValue;

        return (
            <div>
                <CheckBox checked={checked} onChange={this.handleOnChange} value={filterItemValue} disabled={disabled}>
                    {filterItem.get('text')}
                </CheckBox>
                {
                    filterItem.get('children') ?
                        <MultiSelect
                            className={"multi-select-children"}
                            filter={filter}
                            item={filterItem}
                            multiselectChange={multiselectChange}
                        />
                        : null
                }
            </div>
        )
    }
}

export default MultiSelect;