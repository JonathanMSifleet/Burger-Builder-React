// @ts-ignore
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render(): JSX.Element {
    return (
      <div>
        {/* could use switch instead of exact */}
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
