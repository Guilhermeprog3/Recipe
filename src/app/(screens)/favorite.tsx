import { useState, useCallback, useContext } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useFocusEffect, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { RecipesContext } from "../../context/recipecontext"

const numColumns = 1

export default function Favorites() {
  const router = useRouter()
  const { 
    favorites, 
    getFavorites, 
    removeFavorite 
  } = useContext(RecipesContext)
  const [loading, setLoading] = useState(true)

  const loadFavoritesData = useCallback(async () => {
    setLoading(true)
    await getFavorites()
    setLoading(false)
  }, [getFavorites])

  useFocusEffect(
    useCallback(() => {
      loadFavoritesData()
    }, [loadFavoritesData])
  )

  const handleRemoveFavorite = async (id: number) => {
    await removeFavorite(id)
    await loadFavoritesData() 
  }

  const handlePressRecipe = (id: number) => {
    router.push(`/recipes/${id}`)
  }

  const renderFavoriteCard = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.recipeCard, { marginRight: numColumns > 1 && index % numColumns === 0 ? 12 : 0 }]}>
      <TouchableOpacity 
        style={styles.cardContent} 
        activeOpacity={0.9}
        onPress={() => handlePressRecipe(item.id)}
      >
        <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.cardGradient}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} resizeMode="cover" />
            <LinearGradient
              colors={["transparent", "rgba(250,207,125,0.1)", "rgba(233,148,30,0.8)"]}
              style={styles.imageGradient}
            />
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.removeGradient}>
                <Ionicons name="heart-dislike" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.favoriteTag}>
              <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.tagGradient}>
                <Ionicons name="heart" size={14} color="#fff" />
                <Text style={styles.tagText}>Favorito</Text>
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff9f0" />
      <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.loadingSpinner}>
              <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>
            <Text style={styles.loadingText}>Carregando favoritos...</Text>
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <LinearGradient colors={["#f5b461", "#e9941e"]} style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={40} color="#fff" />
            </LinearGradient>
            <Text style={styles.noResults}>Nenhuma receita favoritada ainda</Text>
            <Text style={styles.emptySubtext}>Explore receitas e adicione suas favoritas aqui!</Text>
          </View>
        ) : (
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
              renderItem={renderFavoriteCard}
              numColumns={numColumns}
              key={numColumns}
              contentContainerStyle={styles.recipeList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  )
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
  recipeCard: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
  },
  imageContainer: {
    position: "relative",
    height: 180,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  removeGradient: {
    padding: 8,
    borderRadius: 20,
  },
  recipeInfo: {
    padding: 16,
    paddingTop: 8,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 8,
    lineHeight: 24,
  },
  favoriteTag: {
    alignSelf: "flex-start",
  },
  tagGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#8D6E63",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noResults: {
    fontSize: 20,
    color: "#8D6E63",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#A1887F",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  refreshIcon: {
    marginRight: 8,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})