import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const FAVORITES_KEY = '@favorites';


type RecipesContextProps = {
  recipes: Recipe[];
  favorites: Recipe[];
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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchAllRecipes();
    loadFavorites();
  }, []);

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

  async function getRecipeById(id: number): Promise<Recipe | null> {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      if (!response.ok) {
        console.error(`Error fetching recipe ${id}: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data as Recipe;
    } catch (error) {
      console.error('Erro ao buscar detalhes da receita:', error);
      return null;
    }
  }

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const getFavorites = async (): Promise<Recipe[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Erro ao obter favoritos:', e);
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
    } catch (e) {
      console.error('Erro ao salvar favorito:', e);
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
        recipes,
        favorites,
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