import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import axios from 'axios';
import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      currentProduct: null
    }
    this.getInventory = this.getInventory.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }
  setProduct(product) {
    this.setState({currentProduct: product});
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory() {
    axios.get('/api/inventory')
    .then(response => {
      this.setState({inventory: response.data});
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <>
      <HashRouter>
        <Switch>
          <Route path='/edit/:id' render={() => <><Form currentProduct={this.state.currentProduct} get={this.getInventory} /></>}></Route>
          <Route path='/add' render={() => <><Form currentProduct={this.state.currentProduct} get={this.getInventory} /></>}></Route>
          <Route path='/' render={() => <div><Dashboard inventory={this.state.inventory} get={this.getInventory} setProduct={this.setProduct}/></div>} />
        </Switch>
      </HashRouter>
        <Header />
      </>
    );
  }
}

export default App;
