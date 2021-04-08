// @ts-expect-error react required
import React, { Component } from 'react';

const asyncComponent = (importComponent: () => Promise<any>): any => {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component as any;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
