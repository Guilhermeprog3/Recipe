import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDE7" />
      <LinearGradient colors={["#FFFDE7", "#FFF9C4", "#FFECB3"]} style={styles.container}>
        <LinearGradient colors={["#FFD54F", "#FFCA28", "#FFC107"]} style={styles.headerGradient}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <LinearGradient colors={["#FFFFFF", "#FFFDE7"]} style={styles.logoContainer}>
                <Ionicons name="restaurant" size={40} color="#FF8F00" />
              </LinearGradient>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Chef's Kitchen</Text>
                <Text style={styles.headerSubtitle}>Sobre o aplicativo</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={["#FFFFFF", "#FFFDE7"]} style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <LinearGradient colors={["#8BC34A", "#AED581"]} style={styles.cardIcon}>
                <Ionicons name="information-circle" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>Sobre o App de Receitas</Text>
            </View>

            <Text style={styles.description}>
              Um aplicativo que foi criado para ajudar os usuários a encontrar receitas de diferentes tipos de pratos.
            </Text>

            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <LinearGradient colors={["#FFB74D", "#FF9800"]} style={styles.featureIcon}>
                  <Ionicons name="search" size={20} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Busca Inteligente</Text>
                  <Text style={styles.featureDescription}>Encontre receitas por ingredientes ou nome</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <LinearGradient colors={["#FF6B6B", "#E91E63"]} style={styles.featureIcon}>
                  <Ionicons name="heart" size={20} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Favoritos</Text>
                  <Text style={styles.featureDescription}>Salve suas receitas preferidas</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#FFFFFF", "#FFF8E1"]} style={styles.apiCard}>
            <View style={styles.cardHeader}>
              <LinearGradient colors={["#FF8A65", "#FF7043"]} style={styles.cardIcon}>
                <Ionicons name="cloud" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>Fonte dos Dados</Text>
            </View>

            <Text style={styles.apiDescription}>
              Utilizamos a API do DummyJSON para fornecer uma variedade incrível de receitas para todos os gostos,
              ocasiões e níveis de habilidade culinária.
            </Text>

            <LinearGradient colors={["#E3F2FD", "#BBDEFB"]} style={styles.apiInfo}>
              <Ionicons name="server" size={20} color="#1976D2" />
              <Text style={styles.apiText}>API: DummyJSON Recipes</Text>
            </LinearGradient>
          </LinearGradient>

          <LinearGradient colors={["#E1F5FE", "#B3E5FC"]} style={styles.developerCard}>
            <View style={styles.cardHeader}>
              <LinearGradient colors={["#29B6F6", "#0288D1"]} style={styles.cardIcon}>
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
  mainCard: {
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
  cardIcon: {
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
  apiCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  apiDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5D4037",
    marginBottom: 16,
    textAlign: "justify",
  },
  apiInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  apiText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
  },
  developerCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  developerName: {
    fontSize: 18,
    color: "#1565C0",
    fontWeight: "600",
    textAlign: "center",
  },
})
