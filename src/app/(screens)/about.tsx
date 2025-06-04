import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient 
        colors={["#fff9f0", "#fdebd0", "#facf7d"]} 
        style={styles.container}
      >
        <LinearGradient 
          colors={["#facf7d", "#f5b461", "#e9941e"]} 
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <LinearGradient 
              colors={["#FFFFFF", "#fff9f0"]} 
              style={styles.logoContainer}
            >
              <Ionicons name="restaurant" size={40} color="#e9941e" />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Chef's Kitchen</Text>
              <Text style={styles.headerSubtitle}>Sobre o aplicativo</Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <LinearGradient 
            colors={["#FFFFFF", "#fff9f0"]} 
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <LinearGradient 
                colors={["#f5b461", "#e9941e"]} 
                style={styles.iconContainer}
              >
                <Ionicons name="information-circle" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>Sobre o App de Receitas</Text>
            </View>

            <Text style={styles.description}>
              Um aplicativo criado para ajudar os usuários a encontrar receitas de diferentes tipos de pratos.
            </Text>
          </LinearGradient>

          <LinearGradient 
            colors={["#FFFFFF", "#fff9f0"]} 
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <LinearGradient 
                colors={["#f5b461", "#e9941e"]} 
                style={styles.iconContainer}
              >
                <Ionicons name="cloud" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>Fonte dos Dados</Text>
            </View>

            <Text style={styles.description}>
              Utilizamos a API do DummyJSON para fornecer nossa variedade de receitas.
            </Text>

            <View style={styles.apiInfo}>
              <Ionicons name="server" size={20} color="#e9941e" />
              <Text style={styles.apiText}>API: DummyJSON Recipes</Text>
            </View>
          </LinearGradient>

          <LinearGradient 
            colors={["#FFFFFF", "#fff9f0"]} 
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <LinearGradient 
                colors={["#f5b461", "#e9941e"]} 
                style={styles.iconContainer}
              >
                <Ionicons name="person" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>Desenvolvedor</Text>
            </View>
            <Text style={styles.developerName}>Guilherme Silva Rios</Text>
          </LinearGradient>
        </ScrollView>
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
  headerGradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    flex: 1,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D4037",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5D4037",
    marginBottom: 20,
    textAlign: "justify",
  },
  featuresContainer: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: "#8D6E63",
  },
  apiInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff0e1",
  },
  apiText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#5D4037",
  },
  developerName: {
    fontSize: 18,
    color: "#e9941e",
    fontWeight: "600",
    textAlign: "center",
  },
})