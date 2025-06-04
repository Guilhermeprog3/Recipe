import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

type RecipesContextProps = {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  fetchAllRecipes: () => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  getRecipeById: (id: number) => Promise<void>;
};

export const RecipesContext = createContext<RecipesContextProps>(
  {} as RecipesContextProps
);

export const RecipesProvider = ({ children }: PropsWithChildren) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  async function fetchAllRecipes() {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  }

  async function searchRecipes(query: string) {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Erro ao buscar receitas com filtro:', error);
    }
  }

  async function getRecipeById(id: number) {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da receita:', error);
    }
  }

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        selectedRecipe,
        fetchAllRecipes,
        searchRecipes,
        getRecipeById,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
