// @ts-expect-error
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

interface IProps extends RouteComponentProps {
  onTryAutoSignup(): void;
}

class App extends Component<IProps> {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(): JSX.Element {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
