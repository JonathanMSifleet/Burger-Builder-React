import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES: { [key: string]: number } = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5
};

const initialState = {
  error: false,
  ingredients: null as any,
  totalPrice: 4
};

const reducer = (
  state = initialState,
  action: { type: string; ingredientName: string; ingredients: any }
): any => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // override property:
          // [property to override]: newValue
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
  }
  return state;
};

export default reducer;
