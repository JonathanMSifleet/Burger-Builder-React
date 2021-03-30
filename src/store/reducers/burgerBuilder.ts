import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES: { [key: string]: number } = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

const initialState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 4
};

const reducer = (
  state = initialState,
  action: { type: string; ingredientName: string }
): any => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // override property:
          // [property to override]: newValue
          // @ts-expect-error string CAN be used as index
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // @ts-expect-error string CAN be used as index
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
  }
  return state;
};

export default reducer;
