import { useState, useEffect, useContext, useCallback } from "react";
import { View, TextInput, SafeAreaView, StatusBar, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useFocusEffect } from "expo-router";
import { RecipesContext } from "../../context/recipecontext";
import { Ionicons } from "@expo/vector-icons";
import { RecipeCard } from "../components/card-recipe";
import { Recipe } from "@/src/types/recipe";

export default function Recipes() {
  const router = useRouter();
  const { 
    recipes, 
    searchRecipes, 
    fetchAllRecipes,
    isFavorite,
    saveFavorite,
    removeFavorite
  } = useContext(RecipesContext);
  
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<{ [id: number]: boolean }>({});
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const loadFavorites = useCallback(async () => {
    const favStatus: { [id: number]: boolean } = {};
    for (const recipe of filteredRecipes) {
      favStatus[recipe.id] = await isFavorite(recipe.id);
    }
    setFavorites(favStatus);
  }, [filteredRecipes, isFavorite]);

  useEffect(() => {
    const initializeData = async () => {
      await fetchAllRecipes();
      setFilteredRecipes(recipes);
    };
    initializeData();
  }, []);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleSearch = async () => {
    if (search.trim() === "") {
      await fetchAllRecipes();
    } else {
      await searchRecipes(search);
    }
  };

  const toggleFavorite = async (recipe: Recipe) => {
    const isFav = favorites[recipe.id];
    if (isFav) {
      await removeFavorite(recipe.id);
    } else {
      await saveFavorite(recipe);
    }
    setFavorites(prev => ({ ...prev, [recipe.id]: !isFav }));
  };

  const handlePressRecipe = (id: number) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff9f0" />
      <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            style={styles.homeButton} 
            onPress={() => router.push("/")}
          >
            <Ionicons name="home-outline" size={30} color="#e9941e" />
          </TouchableOpacity>
          <LinearGradient colors={["#FFFFFF", "#fff9f0"]} style={styles.searchContainer}>
            <LinearGradient colors={["#f5b461", "#e9941e"]} style={styles.searchIconContainer}>
              <Ionicons name="search" size={20} color="#fff" />
            </LinearGradient>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar receitas"
              placeholderTextColor="#a1887f"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => {
                setSearch("");
                fetchAllRecipes();
              }} style={styles.clearButton}>
                <LinearGradient colors={["#ff9a8b", "#ff6b6b"]} style={styles.clearGradient}>
                  <Ionicons name="close" size={16} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={favorites[item.id] || false}
              onPress={() => handlePressRecipe(item.id)}
              onToggleFavorite={() => toggleFavorite(item)}
            />
          )}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff9f0",
  },
  container: {
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff9f0",
    marginTop: 30
  },
  homeButton: {
    padding: 5,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  searchIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#5D4037",
  },
  clearButton: {
    marginLeft: 8,
  },
  clearGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: "#e9941e",
    fontWeight: "500",
  }
});