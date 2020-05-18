import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders'
import {Route} from 'react-router-dom';


class App extends Component{



  render() {
    return (
    <div>
      <Layout>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/orders" exact component={Orders}/>
      </Layout>
    </div>);
  }
}

export default App;
