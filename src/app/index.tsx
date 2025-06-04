import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff9f0" />
      <LinearGradient colors={["#fff9f0", "#fdebd0", "#facf7d"]} style={styles.container}>
        <View style={styles.decorativeElements}>
          <LinearGradient
            colors={["rgba(233,148,30,0.1)", "rgba(233,148,30,0.05)"]}
            style={[styles.circle, styles.circle1]}
          />
          <LinearGradient
            colors={["rgba(233,148,30,0.08)", "rgba(233,148,30,0.03)"]}
            style={[styles.circle, styles.circle2]}
          />
          <LinearGradient
            colors={["rgba(233,148,30,0.06)", "rgba(233,148,30,0.02)"]}
            style={[styles.circle, styles.circle3]}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.logoSection}>
            <LinearGradient colors={["#FFFFFF", "#fff9f0"]} style={styles.logoContainer}>
              <Ionicons name="restaurant" size={60} color="#e9941e" />
            </LinearGradient>
            <Text style={styles.appName}>Chef's Kitchen</Text>
          </View>
          <View style={styles.welcomeSection}>
            <Text style={styles.title}>Bem-vindo ao mundo dos sabores!</Text>
            <Text style={styles.subtitle}>
              Descubra receitas deliciosas e transforme sua cozinha em um verdadeiro laboratório
              gastronômico
            </Text>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => router.push("/(screens)/recipes")}
            >
              <LinearGradient colors={["#f5b461", "#e9941e"]} style={styles.buttonGradient}>
                <Ionicons name="restaurant-outline" size={24} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Explorar Receitas</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    position: "relative",
  },
  decorativeElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle: {
    position: "absolute",
    borderRadius: 1000,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    top: 200,
    right: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  logoSection: {
    alignItems: "center",
    marginTop: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e9941e",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  welcomeSection: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(233,148,30,0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#8D6E63",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  featuresPreview: {
    alignItems: "center",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: "center",
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  featureText: {
    fontSize: 14,
    color: "#8D6E63",
    fontWeight: "600",
  },
  actionSection: {
    gap: 16,
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  buttonIcon: {
    marginRight: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  secondaryButtons: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  secondaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 8,
  },
  secondaryButtonText: {
    color: "#5D4037",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e9941e",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#8D6E63",
    marginTop: 2,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(233,148,30,0.3)",
  },
})