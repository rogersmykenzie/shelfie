import React, { Component } from 'react';
import Product from '../../Components/Product/Product';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: []
        }
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(id) {
        axios.delete('/api/product/' + id)
        .then(response => {
            this.props.get();
        }).catch(err => console.log(err));
    }
    render() {
        let arr = this.props.inventory.map(val => {
            return <Product name={val.name} price={val.price} img={val.img} id={val.id} key={val.id} delete={this.deleteProduct} setProduct={this.props.setProduct}/>
        })
        return(
            <div>
                {arr}
            </div>
        )
    }
}