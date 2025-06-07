import { useContext} from "react";
import { RecipesContext } from "../context/recipecontext";

export const useRecipe = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('DEUUU PAU');
  }
  return context;
}
