/**
 * Created by 12072 on 03/03/17.
 */
import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, RectShape} from 'react-placeholder/lib/placeholders';
import GridItem from './item';
import _ from 'lodash'

import './index.css';

const awesomePlaceholder  = (
    <div className='grid-placeholder grid-placeholder-animation'>
        <RectShape color="#ddd" style={{width: '320px', height: '210px', marginBottom: '10px'}}/>
        <TextBlock color="#ddd" style={{marginTop: '10px'}} rows={4} />
    </div>
);

class Grid extends Component {
    render() {
        const {loading, productsList} = this.props;

        return (
            <div className="grid">
                {
                    loading && _.times(12, (i) => (
                        <div key={i} className="grid-item grid-item-placeholder">
                            <ReactPlaceholder customPlaceholder={awesomePlaceholder} ready={false}>
                                <div></div>
                            </ReactPlaceholder>
                        </div>
                    ))
                }
                {
                    !loading && productsList.map((product) => {
                        return (
                            <GridItem city={this.props.city} key={product.get('id')} product={product}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default Grid;
