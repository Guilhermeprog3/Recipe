import { useState, useEffect, useContext } from "react"
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity,SafeAreaView,StatusBar,ActivityIndicator,} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams } from "expo-router"
import { isFavorite, saveFavorite, removeFavorite } from "../../Utils/favorite"
import { RecipesContext } from "../../context/recipecontext"
import { Ionicons } from "@expo/vector-icons"

export default function RecipeDetails() {
  const { id } = useLocalSearchParams()
  const { selectedRecipe, getRecipeById } = useContext(RecipesContext)
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const recipeId = Number(id)
      getRecipeById(recipeId).then(() => {
        isFavorite(recipeId).then(setIsFav)
        setLoading(false)
      })
    }
  }, [id])

  const toggleFavorite = async () => {
    if (!selectedRecipe) return

    if (isFav) {
      await removeFavorite(selectedRecipe.id)
    } else {
      await saveFavorite(selectedRecipe)
    }
    setIsFav(!isFav)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.loadingContainer}>
          <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color="#fff" />
          </LinearGradient>
          <Text style={styles.loadingText}>Preparando receita...</Text>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  if (!selectedRecipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.container}>
          <Text style={styles.errorText}>Receita não encontrada</Text>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDE7" />
      <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedRecipe.image }} style={styles.image} resizeMode="cover" />
            <LinearGradient
              colors={["transparent", "rgba(255,193,7,0.1)", "rgba(255,152,0,0.6)"]}
              style={styles.imageGradient}
            />
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
              <LinearGradient
                colors={isFav ? ["#FF6B6B", "#E91E63"] : ["rgba(255,255,255,0.95)", "rgba(255,249,196,0.9)"]}
                style={styles.favoriteGradient}
              >
                <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "#fff" : "#FF8F00"} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <LinearGradient colors={["#FFFFFF", "#FFFDE7"]} style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{selectedRecipe.name}</Text>
              <View style={styles.headerTags}>
                <LinearGradient colors={["#8BC34A", "#AED581"]} style={styles.tag}>
                  <Ionicons name="leaf" size={14} color="#fff" />
                  <Text style={styles.tagText}>Fresco</Text>
                </LinearGradient>
                <LinearGradient colors={["#FFB74D", "#FF9800"]} style={styles.tag}>
                  <Ionicons name="flame" size={14} color="#fff" />
                  <Text style={styles.tagText}>Fácil</Text>
                </LinearGradient>
              </View>
            </View>

            <LinearGradient colors={["#FFFFFF", "#FFF8E1"]} style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.sectionIcon}>
                  <Ionicons name="list" size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Ingredientes</Text>
              </View>
              <View style={styles.ingredientsList}>
                {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                  <View key={index} style={styles.ingredientItem}>
                    <LinearGradient colors={["#8BC34A", "#AED581"]} style={styles.ingredientBullet} />
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            <LinearGradient colors={["#FFFFFF", "#FFF8E1"]} style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient colors={["#FF8A65", "#FF7043"]} style={styles.sectionIcon}>
                  <Ionicons name="restaurant" size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Modo de Preparo</Text>
              </View>
              <View style={styles.instructionsList}>
                {Array.isArray(selectedRecipe.instructions)
                  ? selectedRecipe.instructions.map((instruction: string, index: number) => (
                      <View key={index} style={styles.instructionItem}>
                        <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>{index + 1}</Text>
                        </LinearGradient>
                        <Text style={styles.instructionText}>{instruction}</Text>
                      </View>
                    ))
                  : (
                      <View style={styles.instructionItem}>
                        <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>1</Text>
                        </LinearGradient>
                        <Text style={styles.instructionText}>{selectedRecipe.instructions}</Text>
                      </View>
                    )}
              </View>
            </LinearGradient>
          </LinearGradient>
        </ScrollView>
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
  errorText: {
    fontSize: 18,
    color: "#8D6E63",
    textAlign: "center",
    marginTop: 50,
  },
  imageContainer: {
    position: "relative",
    height: 300,
    margin: 20,
    marginBottom: 0,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  favoriteGradient: {
    padding: 12,
    borderRadius: 25,
  },
  contentContainer: {
    margin: 20,
    marginTop: 10,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
    lineHeight: 34,
  },
  headerTags: {
    flexDirection: "row",
    gap: 10,
  },
  tag: {
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
  section: {
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D4037",
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: "#5D4037",
    flex: 1,
    lineHeight: 22,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 16,
    color: "#5D4037",
    flex: 1,
    lineHeight: 24,
  },
})
