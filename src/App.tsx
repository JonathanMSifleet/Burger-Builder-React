import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  onTryAutoSignup(): void;
}

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = ({ isAuthenticated, onTryAutoSignup }: IProps) => {
  useEffect(() => {
    onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props: any) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/checkout"
          component={(props: any) => <Checkout {...props} />}
        />
        <Route
          path="/orders"
          component={(props: any) => <Orders {...props} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={(props: any) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: { auth: { token: string } }) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
