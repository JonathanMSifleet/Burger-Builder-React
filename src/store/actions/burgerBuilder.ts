import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (
  ingredientName: string
): { ingredientName: string; type: string } => {
  return {
    ingredientName,
    type: actionTypes.ADD_INGREDIENT
  };
};

export const removeIngredient = (
  ingredientName: string
): { ingredientName: string; type: string } => {
  return {
    ingredientName,
    type: actionTypes.REMOVE_INGREDIENT
  };
};

const setIngredients = (ingredients: any) => {
  return {
    ingredients,
    type: actionTypes.SET_INGREDIENTS
  };
};

export const fetchIngredientsFailed = (): { type: string } => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async (
    dispatch: (arg0: { ingredients?: any; type: string }) => void
  ): Promise<void> => {
    try {
      const response = await axios.get(
        'https://react-project-776bc-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
      );
      dispatch(setIngredients(response.data));
    } catch (e) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
