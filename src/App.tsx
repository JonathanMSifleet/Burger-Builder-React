// @ts-ignore
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render(): JSX.Element {
    return (
      <div>
        {/* could use switch instead of exact */}
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
