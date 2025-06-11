import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const FAVORITES_KEY = '@favorites';

type RecipesContextProps = {
  fetchAllRecipes: () => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  getRecipeById: (id: number) => Promise<Recipe | null>;
  getFavorites: () => Promise<Recipe[]>;
  saveFavorite: (recipe: Recipe) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
};

export const RecipesContext = createContext<RecipesContextProps>(
  {} as RecipesContextProps
);

export const RecipesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  async function fetchAllRecipes() {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  }

  async function searchRecipes(query: string) {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error('Erro ao buscar receitas com filtro:', error);
    }
  }

  async function getRecipeById(id: number): Promise<Recipe | null> {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      return data as Recipe;
    } catch (error) {
      console.error('Erro ao buscar detalhes da receita:', error);
      return null;
    }
  }


  const getFavorites = async (): Promise<Recipe[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Erro ao obter favoritos:', error);
      return [];
    }
  };

  const saveFavorite = async (recipe: Recipe) => {
    try {
      const currentFavorites = await getFavorites();
      const isAlreadyFavorite = currentFavorites.some(fav => fav.id === recipe.id);
      if (!isAlreadyFavorite) {
        const newFavorites = [...currentFavorites, recipe];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      const currentFavorites = await getFavorites();
      const newFavorites = currentFavorites.filter((item: Recipe) => item.id !== id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Erro ao remover favorito:', e);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((item: Recipe) => item.id === id);
  };

  return (
    <RecipesContext.Provider
      value={{
        fetchAllRecipes,
        searchRecipes,
        getRecipeById,
        getFavorites,
        saveFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};