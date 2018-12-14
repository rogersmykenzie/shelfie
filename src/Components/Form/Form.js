import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            input1: '',
            input2: '',
            input3: '',
            currentProduct: null,
            toggle: true
        }
        this.updateInput1 = this.updateInput1.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateInput3 = this.updateInput3.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.currentProduct !== this.props.currentProduct) {
            this.setState({currentProduct: this.props.currentProduct, toggle: false});
        }
    }

    updateInput1(e) {
        this.setState({input1: e.target.value});
    }
    updateInput2(e) {
        this.setState({input2: e.target.value});
    }
    updateInput3(e) {
        this.setState({input3: e.target.value});
    }
    handleCancel() {
        this.setState({input1: '', input2: '', input3: ''});
    }
    addProduct() {
        console.log('worked')
        axios.post('/api/product', {name: this.state.input1, price: this.state.input2, img: this.state.input3})
        .then(response => {
            this.props.get();
            this.handleCancel();
        })
    }
    updateProduct(id) {
        console.log('working')
        axios.put('/api/products/' + id, {name: this.state.input1, price: this.state.input2, img: this.state.input3})
        .then(response => {
            this.setState({toggle: true});
            this.props.get();
            this.handleCancel();
        })
    }
    render() {
        return(
            <div>
                <input onChange={(e)=> this.updateInput1(e)} value={this.state.input1}></input>
                <input onChange={(e) => this.updateInput2(e)} value={this.state.input2}></input>
                <input onChange={e => this.updateInput3(e)} value={this.state.input3}></input>
                <button onClick={() => this.handleCancel()}>Cancel</button>
                {this.state.toggle ? <button onClick={() => this.addProduct()}>Add to Inventory</button> : <button onClick={() => this.updateProduct(this.state.currentProduct)}>Save Changes</button>}
            </div>
        )
    }
}