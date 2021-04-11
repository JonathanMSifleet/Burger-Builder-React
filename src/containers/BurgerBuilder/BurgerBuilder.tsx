// @ts-ignore
import React, { useEffect, useState } from 'react';
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
  propsError: boolean;
  history: any;
  propsIngredients: { [type: string]: number };
  isAuthenticated: boolean;
  onIngredientAdded(): void;
  onIngredientRemoved(): void;
  onInitIngredients(): void;
  onInitPurchase(): void;
  onSetAuthRedirectPath(path: string): void;
  price: number;
}

const burgerBuilder: React.FC<IProps> = ({
  history,
  isAuthenticated,
  onIngredientAdded,
  onIngredientRemoved,
  onInitIngredients,
  onInitPurchase,
  onSetAuthRedirectPath,
  price,
  propsError,
  propsIngredients
}) => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    onInitIngredients();
  }, []);

  const updatePurchaseState = (ingredients: {
    [type: string]: number;
  }): boolean => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = (): void => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = (): void => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = (): void => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disabledInfo = {
    ...propsIngredients
  };
  for (const key in disabledInfo) {
    // @ts-ignore
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = propsError ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (propsIngredients) {
    burger = (
      <Auxiliary>
        <Burger ingredients={propsIngredients} />
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
          price={price}
          purchasable={updatePurchaseState(propsIngredients)}
        />
      </Auxiliary>
    );
    orderSummary = (
      <OrderSummary
        ingredients={propsIngredients}
        price={price.toFixed(2)}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Auxiliary>
      <Modal modalClosed={purchaseCancelHandler} show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

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
)(withErrorHandler(burgerBuilder, axios));
