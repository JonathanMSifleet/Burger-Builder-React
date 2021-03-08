// @ts-expect-error
import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addIngredientHandler = (type: any): void => {
    // @ts-ignore
    let count = this.state.ingredients[type];
    count++;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // @ts-ignore
    updatedIngredients[type] = count;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  removeIngredient = (type: any) => {
    // @ts-ignore
    let count = this.state.ingredients[type];
    if (count <= 0) {
      return;
    }
    count--;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // @ts-ignore
    updatedIngredients[type] = count;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  render(): JSX.Element {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (const key in disabledInfo) {
      // @ts-ignore
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredient}
          disabled={disabledInfo}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
