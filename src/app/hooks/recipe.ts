import { useContext, useEffect } from "react";
import { RecipesContext } from "../context/recipecontext";

export const useAuth = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
