import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (
  state: { ingredients: any; totalPrice: any; error?: boolean },
  action: { type?: string; ingredientName: any; ingredients?: any }
) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    building: true,
    ingredients: updatedIngredients,
    // @ts-expect-error can be used as index
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (
  state: { ingredients: any; totalPrice: any; error?: boolean },
  action: { type?: string; ingredientName: any; ingredients?: any }
) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    building: true,
    ingredients: updatedIngs,
    // @ts-expect-error can be used as index
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (
  state: { ingredients: null; totalPrice: number; error: boolean },
  action: { type?: string; ingredientName?: string; ingredients: any }
) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    building: false,
    error: false,
    totalPrice: 4
  });
};

const fetchIngredientsFailed = (
  state: { ingredients: null; totalPrice: number; error: boolean },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _action: { type: string; ingredientName: string; ingredients: any }
) => {
  return updateObject(state, { error: true });
};

const reducer = (
  state = initialState,
  action: { type: string; ingredientName: string; ingredients: any }
): { ingredients: null; totalPrice: number; error: boolean } => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
