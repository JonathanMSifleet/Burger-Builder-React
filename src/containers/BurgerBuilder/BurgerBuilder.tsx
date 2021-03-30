// @ts-ignore
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

interface IProps {
  error: boolean;
  history: any;
  ingredients: { [type: string]: number };
  onIngredientAdded(): any;
  onIngredientRemoved(): any;
  onInitIngredients(): void;
  price: number;
}

class BurgerBuilder extends Component<IProps> {
  state = {
    error: (null as unknown) as boolean,
    ingredients: null as any,
    purchasing: false,
    totalPrice: 4
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients: { [type: string]: number }): boolean {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = (): void => {
    this.setState({ ...this.state, purchasing: true });
  };

  purchaseCancelHandler = (): void => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (): void => {
    this.props.history.push('/checkout');
  };

  render(): JSX.Element {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (const key in disabledInfo) {
      // @ts-ignore
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

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

const mapStateToProps = (state: {
  burgerBuilder: {
    error: boolean;
    ingredients: { [type: string]: number };
    totalPrice: number;
  };
}) => {
  return {
    error: state.burgerBuilder.error,
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    onIngredientAdded: (ingredientName: string) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName: string) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
