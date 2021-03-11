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
    error: '',
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

  async componentDidMount(): Promise<void> {
    try {
      const response = await axios.get(
        'https://react-project-776bc-default-rtdb.europe-west1.firebasedatabase.app/ingredient'
      );
      this.setState({ ingredients: response.data });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  updatePurchaseState(ingredients: ingredients): void {
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

  removeIngredientHandler = (type: string): void => {
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
      await axios.post('/orders.json', order);
    } catch (e) {
      this.setState({ error: e.message });
    }
    this.setState({ loading: false, purchasing: false });
  };

  render(): JSX.Element {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (const key in disabledInfo) {
      // @ts-ignore
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Auxiliary>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

type ingredients = {
  bacon?: number;
  cheese?: number;
  meat?: number;
  salad?: number;
};

export default BurgerBuilder;
