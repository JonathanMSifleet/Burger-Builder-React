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
import * as actionTypes from '../../store/actions/actionTypes';

interface IProps {
  history: any;
  ings: { [type: string]: number };
  onIngredientAdded(): any;
  onIngredientRemoved(): any;
  price: number;
}

interface IState {
  ingredients: { [type: string]: number };
  totalPrice: number;
}

class BurgerBuilder extends Component<IProps> {
  state = {
    error: null as any,
    ingredients: null as any,
    loading: false,
    purchasing: false,
    totalPrice: 4
  };

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get(
  //       'https://react-project-776bc-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
  //     );
  //     this.setState({ ingredients: response.data });
  //   } catch (e) {
  //     this.setState({ error: true });
  //   }
  // }

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
      ...this.props.ings
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

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
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

const mapStateToProps = (state: IState) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; ingredientName: any }) => any
) => {
  return {
    onIngredientAdded: (ingredientName: string) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName: string) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
