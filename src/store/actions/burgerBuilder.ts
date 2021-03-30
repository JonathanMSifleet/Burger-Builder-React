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
