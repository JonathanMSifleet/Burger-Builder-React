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
import * as actions from '../../store/actions/index';

interface IProps {
  error: boolean;
  history: any;
  ingredients: { [type: string]: number };
  isAuthenticated: boolean;
  onIngredientAdded(): void;
  onIngredientRemoved(): void;
  onInitIngredients(): void;
  onInitPurchase(): void;
  onSetAuthRedirectPath(path: string): void;
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
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = (): void => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (): void => {
    this.props.onInitPurchase();
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
            isAuth={this.props.isAuthenticated}
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
  auth: { token: string };
}) => {
  return {
    error: state.burgerBuilder.error,
    ingredients: state.burgerBuilder.ingredients,
    isAuthenticated: state.auth.token !== null,
    price: state.burgerBuilder.totalPrice
  };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    onIngredientAdded: (ingredientName: string) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName: string) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) =>
      dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
