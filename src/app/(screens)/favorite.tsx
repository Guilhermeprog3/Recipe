import { useCallback, useContext } from "react";
import { View, FlatList, SafeAreaView, StatusBar, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RecipesContext } from "../../context/recipecontext";
import { RecipeCard } from "../components/card-recipe";

export default function Favorites() {
  const router = useRouter();
  const { 
    favorites, 
    getFavorites, 
    removeFavorite,
    isFavorite
  } = useContext(RecipesContext);

  const loadFavoritesData = useCallback(async () => {
    await getFavorites();
  }, [getFavorites]);

  useFocusEffect(
    useCallback(() => {
      loadFavoritesData();
    }, [loadFavoritesData])
  );

  const handleRemoveFavorite = async (id: number) => {
    await removeFavorite(id);
    await loadFavoritesData();
  };

  const handlePressRecipe = (id: number) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff9f0" />
      <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.statsContainer}>
            <LinearGradient colors={["#FFFFFF", "#fff9f0"]} style={styles.statsCard}>
              <Ionicons name="heart" size={24} color="#ff7e5f" />
              <Text style={styles.statsNumber}>{favorites.length}</Text>
              <Text style={styles.statsLabel}>Receitas Favoritas</Text>
            </LinearGradient>
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                isFavorite={isFavorite(item.id)}
                onPress={() => handlePressRecipe(item.id)}
                onToggleFavorite={() => handleRemoveFavorite(item.id)}
              />
            )}
            contentContainerStyle={styles.recipeList}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    paddingVertical: 20,
  },
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5D4037",
    marginHorizontal: 8,
  },
  statsLabel: {
    fontSize: 16,
    color: "#8D6E63",
    fontWeight: "500",
  },
  recipeList: {
    paddingBottom: 20,
  },
});