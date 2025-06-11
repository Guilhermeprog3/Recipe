import { useState, useEffect, useContext } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { RecipesContext } from "../../../context/recipecontext"
import { Ionicons } from "@expo/vector-icons"
import { Recipe } from "@/src/types/recipe"
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

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
  const router = useRouter()

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return
      const recipeId = Number(id)
      const fetchedRecipe = await getRecipeById(recipeId)
      setRecipeData(fetchedRecipe)
      if (fetchedRecipe) {
        const favoriteStatus = await isFavorite(fetchedRecipe.id)
        setIsFav(favoriteStatus)
      }
    }

    loadRecipe()
  }, [id])

  const toggleFavorite = async () => {
    if (!recipeData) return

    if (isFav) {
      await removeFavorite(recipeData.id)
    } else {
      await saveFavorite(recipeData)
    }
    setIsFav(!isFav)
  }

  if (!recipeData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#fff", "#f8f8f8"]} style={styles.emptyContainer}>
          <View style={styles.loadingContent}>
            <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
            <Text style={styles.emptyText}>Nenhuma receita encontrada</Text>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButtonEmpty}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.backButtonEmptyText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: recipeData.image }} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
          />
          
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={toggleFavorite}
            >
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={28} 
                color={isFav ? "#FF5252" : "#fff"} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipeData.name}</Text>
            <View style={styles.recipeMeta}>
              <View style={styles.metaItem}>
                <FontAwesome5 name="clock" size={14} color="#fff" />
                <Text style={styles.metaText}>30 min</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="kitchen" size={24} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>Ingredientes</Text>
            </View>
            <View style={styles.ingredientsList}>
              {recipeData.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="list-alt" size={24} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>Modo de Preparo</Text>
            </View>
            <View style={styles.instructionsList}>
              {Array.isArray(recipeData.instructions) 
                ? recipeData.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.instructionText}>{instruction}</Text>
                    </View>
                  ))
                : (
                    <View style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>1</Text>
                      </View>
                      <Text style={styles.instructionText}>{recipeData.instructions}</Text>
                    </View>
                  )
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  backButtonEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  backButtonEmptyText: {
    color: "#fff",
    marginLeft: 8,
    fontFamily: 'Poppins_500Medium',
  },
  imageContainer: {
    height: 350,
    width: '100%',
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  favoriteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    fontFamily: 'Poppins_700Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
    fontFamily: 'Poppins_500Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    padding: 25,
    paddingTop: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FFEBEE',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  ingredientsList: {
    marginLeft: 5,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginTop: 8,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    flex: 1,
    fontFamily: 'Poppins_400Regular',
  },
  instructionsList: {
    marginLeft: 5,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
  instructionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    flex: 1,
    fontFamily: 'Poppins_400Regular',
  },
})