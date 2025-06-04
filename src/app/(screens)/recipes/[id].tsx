import { useState, useEffect, useContext } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { RecipesContext } from "../../../context/recipecontext"
import { Ionicons } from "@expo/vector-icons"

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string | string[];
  image: string;
};

export default function RecipeDetails() {
  const { id } = useLocalSearchParams()
  const { 
    getRecipeById,
    isFavorite,
    saveFavorite,
    removeFavorite
  } = useContext(RecipesContext)
  
  const [recipeData, setRecipeData] = useState<Recipe | null>(null)
  const [isFav, setIsFav] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      const recipeId = Number(id)
      loadRecipe(recipeId)
    } else {
        setIsLoading(false) 
    }
  }, [id])

  const loadRecipe = async (recipeId: number) => {
    try {
      setIsLoading(true)
      const fetchedRecipe = await getRecipeById(recipeId)
      setRecipeData(fetchedRecipe)

      if (fetchedRecipe) {
        const favoriteStatus = await isFavorite(fetchedRecipe.id)
        setIsFav(favoriteStatus)
      }
    } catch (error) {
      console.error("Erro ao carregar receita:", error)
      setRecipeData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = async () => {
    if (!recipeData) return

    try {
      if (isFav) {
        await removeFavorite(recipeData.id)
      } else {
        await saveFavorite(recipeData)
      }
      setIsFav(!isFav)
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error)
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#FF8F00" />
          <Text style={styles.loadingText}>Carregando receita...</Text>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  if (!recipeData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={[styles.container, styles.loadingContainer]}>
          <Text style={styles.errorText}>Receita não encontrada</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.errorBackButton}>
            <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.errorBackButtonGradient}>
             <Text style={styles.backButtonText}>Voltar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDE7" />
      <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,249,196,0.8)"]} style={styles.backButtonGradient}>
            <Ionicons name="arrow-back-outline" size={28} color="#FF8F00" />
          </LinearGradient>
        </TouchableOpacity>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: recipeData.image }} style={styles.image} resizeMode="cover" />
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
              <Text style={styles.title}>{recipeData.name}</Text>
            </View>

            <LinearGradient colors={["#FFFFFF", "#FFF8E1"]} style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient colors={["#FFD54F", "#FFCA28"]} style={styles.sectionIcon}>
                  <Ionicons name="list" size={20} color="#fff" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Ingredientes</Text>
              </View>
              <View style={styles.ingredientsList}>
                {recipeData.ingredients.map((ingredient: string, index: number) => (
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
                {Array.isArray(recipeData.instructions)
                  ? recipeData.instructions.map((instruction: string, index: number) => (
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
                        <Text style={styles.instructionText}>{recipeData.instructions}</Text>
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
    backgroundColor: "#FFFDE7",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#8D6E63",
    fontWeight: "500",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#8D6E63",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  errorBackButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  errorBackButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: "#5D4037",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + 15,
    left: 20,
    zIndex: 10,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
     shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonGradient: {
    padding: 10,
    borderRadius: 25,
  },
  imageContainer: {
    position: "relative",
    height: 300,
    marginHorizontal: 20,
    marginTop: (StatusBar.currentHeight || 0) + 70,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteGradient: {
    padding: 12,
    borderRadius: 25,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: -20,
    paddingTop: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
    lineHeight: 34,
    textAlign: 'center',
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