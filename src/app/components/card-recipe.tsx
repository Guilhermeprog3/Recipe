import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from "@/src/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const RecipeCard = React.memo(({ 
  recipe, 
  isFavorite, 
  onPress, 
  onToggleFavorite 
}: RecipeCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.recipeCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        {recipe.image && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: recipe.image }} 
              style={styles.recipeImage} 
              resizeMode="cover"
            />
          </View>
        )}
        
        <View style={styles.textContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.recipeName} numberOfLines={1}>{recipe.name}</Text>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? "#e9941e" : "#9E9E9E"}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.recipeMeta}>
            <Text style={styles.metaText}>{recipe.prepTimeMinutes} min</Text>
            <Text style={styles.metaText}>•</Text>
          </View>
          
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginRight: 6,
  },
  favoriteButton: {
    padding: 4,
  },
  recipeDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  }
});