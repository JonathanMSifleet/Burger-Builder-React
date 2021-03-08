// @ts-expect-error
import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

class BurgerBuilder extends Component {
  render(): JSX.Element {
    return (
      <Auxiliary>
        <div>Burger</div>
        <div>Build Controls</div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
