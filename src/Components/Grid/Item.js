/**
 * Created by 12072 on 03/03/17.
 */
import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

class GridItem extends Component {

    getRupee(price) {
        const number = Number(price);
        return number.toLocaleString('en-IN', {
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'INR'
        });
    }

    getProductURL(productName, productID) {
        return `https://www.gozefo.com/${this.props.city}/product/${productName.replace(/ /g, '-')}-${productID}`
    }

    render() {
        const { product } = this.props;
        const productName = product.get('name');
        const productID = product.get('id');
        return (
            <div className="grid-item">
                <div className={'product-img'}>
                    <a target="_blank" href={this.getProductURL(productName, productID)}>
                        <LazyLoad height={200}>
                            <img width="100%" alt={productName} src={product.get('imageLink')} />
                        </LazyLoad>
                    </a>
                </div>
                <div className="prod-details">
                    <div className="prod-title">{productName}</div>
                    <span className="prod-condition">{product.get('condition')}</span>
                    <div>
                        <span className="prod-offer-price">{this.getRupee(product.get('offerPrice'))}</span>
                        <span className="prod-price">{this.getRupee(product.get('price'))}</span>
                        <span className="prod-discount">({product.get('discount')} % off)</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default GridItem;