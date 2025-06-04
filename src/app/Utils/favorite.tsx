import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const saveFavorite = async (recipe: any) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = [...favorites, recipe];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (e) {
  }
};

export const removeFavorite = async (id: number) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (e) {
  }
};

export const isFavorite = async (id: number) => {
  try {
    const favorites = await getFavorites();
    return favorites.some((item: any) => item.id === id);
  } catch (e) {
    return false;
  }
};