/**
 * Created by 12072 on 05/03/17.
 */
import React, { Component } from 'react';
import './index.css';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        this.props.onChange(e.target.checked, e.target.value)
    }

    render() {
        return (
            <div className={`check-box ${this.props.disabled ? 'check-box-disabled' : ''}`} >
                <input className="check-box-element" type="checkbox" onChange={this.handleOnChange} value={this.props.value} checked={this.props.checked} disabled={this.props.disabled}/>{this.props.children}
            </div>
        )
    }
}

CheckBox.defaultProps = {
    onChange: () => {}
};

export default CheckBox;