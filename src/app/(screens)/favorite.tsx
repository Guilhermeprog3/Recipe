import { useCallback, useContext, useEffect, useState } from "react";
import { View, FlatList, SafeAreaView, StatusBar, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RecipesContext } from "../../context/recipecontext";
import { RecipeCard } from "../components/card-recipe";
import { Recipe } from "@/src/types/recipe";

export default function Favorites() {
  const router = useRouter();
  const {  
    getFavorites, 
    removeFavorite,
    isFavorite
  } = useContext(RecipesContext);
  
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavoritesData = useCallback(async () => {
    try {
      setLoading(true);
      const favorites = await getFavorites();
      setFavoriteRecipes(Array.isArray(favorites) ? favorites : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavoriteRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [getFavorites]);

  useFocusEffect(
    useCallback(() => {
      loadFavoritesData();
    }, [loadFavoritesData])
  );

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavorite(id);
      await loadFavoritesData();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handlePressRecipe = (id: number) => {
    router.push(`/recipes/${id}`);
  };

  const RenderRecipeItem = ({ item }: { item: Recipe }) => {
    const [isFav, setIsFav] = useState(true);

    useEffect(() => {
      const verifyFavorite = async () => {
        try {
          const favStatus = await isFavorite(item.id);
          setIsFav(favStatus);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };
      verifyFavorite();
    }, [item.id]);

    return (
      <RecipeCard
        recipe={item}
        isFavorite={isFav}
        onPress={() => handlePressRecipe(item.id)}
        onToggleFavorite={() => handleRemoveFavorite(item.id)}
      />
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text>Carregando favoritos...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff9f0" />
      <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.statsContainer}>
            <LinearGradient colors={["#FFFFFF", "#fff9f0"]} style={styles.statsCard}>
              <Ionicons name="heart" size={24} color="#ff7e5f" />
              <Text style={styles.statsNumber}>{favoriteRecipes.length}</Text>
              <Text style={styles.statsLabel}>Receitas Favoritas</Text>
            </LinearGradient>
          </View>

          <FlatList
            data={favoriteRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderRecipeItem item={item} />}
            contentContainerStyle={styles.recipeList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="heart-dislike-outline" size={50} color="#e9941e" />
                <Text style={styles.emptyText}>Nenhuma receita favoritada</Text>
              </View>
            }
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});