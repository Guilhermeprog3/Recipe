"use client"

import { useState, useEffect, useContext } from "react"
import {View,Text,FlatList,StyleSheet,TextInput,TouchableOpacity,Image,ActivityIndicator,Dimensions,SafeAreaView,StatusBar} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { isFavorite, saveFavorite, removeFavorite } from "../Utils/favorite"
import { RecipesContext } from "../context/recipecontext"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")
const numColumns = width > 500 ? 2 : 1

export default function Recipes() {
  const { recipes, searchRecipes, fetchAllRecipes } = useContext(RecipesContext)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<{ [id: number]: boolean }>({})

  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    if (recipes.length > 0) {
      loadFavorites()
    }
  }, [recipes])

  const loadRecipes = async () => {
    setLoading(true)
    await fetchAllRecipes()
    setLoading(false)
  }

  const loadFavorites = async () => {
    const favStatus: { [id: number]: boolean } = {}
    for (const recipe of recipes) {
      favStatus[recipe.id] = await isFavorite(recipe.id)
    }
    setFavorites(favStatus)
  }

  const handleSearch = async () => {
    setLoading(true)
    await searchRecipes(search)
    setLoading(false)
  }

  const toggleFavorite = async (recipe: any) => {
    const isFav = favorites[recipe.id]
    if (isFav) {
      await removeFavorite(recipe.id)
    } else {
      await saveFavorite(recipe)
    }
    setFavorites((prev) => ({ ...prev, [recipe.id]: !isFav }))
  }

  const renderRecipeCard = ({ item, index }) => (
    <View style={[styles.recipeCard, { marginRight: numColumns > 1 && index % numColumns === 0 ? 12 : 0 }]}>
      <Link href={`/recipes/${item.id}`} asChild>
        <TouchableOpacity style={styles.cardContent} activeOpacity={0.9}>
          <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.cardGradient}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} resizeMode="cover" />
              <LinearGradient
                colors={["transparent", "rgba(255,193,7,0.1)", "rgba(255,152,0,0.8)"]}
                style={styles.imageGradient}
              />
              <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item)}>
                <LinearGradient
                  colors={
                    favorites[item.id] ? ["#FF6B6B", "#E91E63"] : ["rgba(255,255,255,0.95)", "rgba(255,249,196,0.9)"]
                  }
                  style={styles.favoriteGradient}
                >
                  <Ionicons
                    name={favorites[item.id] ? "heart" : "heart-outline"}
                    size={22}
                    color={favorites[item.id] ? "#fff" : "#FF8F00"}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.recipeTag}>
                <LinearGradient colors={["#8BC34A", "#AED581"]} style={styles.tagGradient}>
                  <Ionicons name="leaf" size={14} color="#fff" />
                  <Text style={styles.tagText}>Fresco</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Link>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDE7" />
      <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.container}>
        <View style={styles.searchWrapper}>
          <LinearGradient colors={["#FFFFFF", "#FFFDE7"]} style={styles.searchContainer}>
            <LinearGradient colors={["#FFB74D", "#FF9800"]} style={styles.searchIconContainer}>
              <Ionicons name="search" size={20} color="#fff" />
            </LinearGradient>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar receitas deliciosas..."
              placeholderTextColor="#A1887F"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                <LinearGradient colors={["#FF8A80", "#FF5722"]} style={styles.clearGradient}>
                  <Ionicons name="close" size={16} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.loadingSpinner}>
              <ActivityIndicator size="large" color="#fff" />
            </LinearGradient>
            <Text style={styles.loadingText}>Preparando delícias...</Text>
          </View>
        ) : recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <LinearGradient colors={["#FFE082", "#FFCC02"]} style={styles.emptyIcon}>
              <Ionicons name="restaurant-outline" size={40} color="#fff" />
            </LinearGradient>
            <Text style={styles.noResults}>Nenhuma receita encontrada</Text>
            <TouchableOpacity onPress={loadRecipes}>
              <LinearGradient colors={["#8BC34A", "#AED581"]} style={styles.refreshButton}>
                <Ionicons name="refresh" size={20} color="#fff" style={styles.refreshIcon} />
                <Text style={styles.refreshButtonText}>Recarregar Receitas</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecipeCard}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={styles.recipeList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontStyle: "italic",
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
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
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  favoriteGradient: {
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
  recipeTag: {
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
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "500",
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
