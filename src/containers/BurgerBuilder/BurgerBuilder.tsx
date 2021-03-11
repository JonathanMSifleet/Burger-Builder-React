// @ts-ignore
import React, { Component } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const INGREDIENT_PRICES: { [key: string]: number } = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0
    },
    loading: false,
    purchasable: false,
    purchasing: false,
    totalPrice: 4
  };

  updatePurchaseState(ingredients: {
    bacon?: number;
    cheese?: number;
    meat?: number;
    salad?: number;
  }): void {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        // @ts-ignore
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type: string): void => {
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
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = (type: string): void => {
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
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = (): void => {
    this.setState({ ...this.state, purchasing: true });
  };

  purchaseCancelHandler = (): void => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async (): Promise<void> => {
    this.setState({ loading: true });
    // .json required for Firebase
    // best to calculate the price on the server
    const order = {
      customer: {
        address: {
          postCode: 'qwerty',
          street: 'Test',
          country: 'UK'
        },
        email: 'test@gmail.com',
        name: 'Jon'
      },
      ingredients: this.state.ingredients,
      price: this.state.totalPrice
    };

    try {
      const response = await axios.post('/orders.json', order);
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false, purchasing: false });
    }
  };

  render(): JSX.Element {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (const key in disabledInfo) {
      // @ts-ignore
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Auxiliary>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredient}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
