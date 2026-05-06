import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";

// Pegamos a largura da tela para os cálculos de responsividade
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SidePanel({ selectedCard, panelAnim, onClose }) {
  if (!selectedCard) return null;

  // Lógica de largura responsiva
  // Se for celular (menor que 600px): ocupa 100%
  // Se for tablet (entre 600px e 1024px): ocupa 50%
  // Se for desktop (maior que 1024px): mantém os 400px fixos
  const getPanelWidth = () => {
    if (SCREEN_WIDTH < 600) return SCREEN_WIDTH; // Mobile: 100%
    if (SCREEN_WIDTH < 1024) return SCREEN_WIDTH * 0.5; // Tablet: 50% (2 colunas)
    return SCREEN_WIDTH * 0.333; // Desktop: ~33.3% (Exatamente 1 coluna de cards)
  };

  function falar() {
    if (!selectedCard?.word) return;
    Speech.speak(selectedCard.word, { language: "en-US", rate: 0.85 });
  }

  return (
    <Animated.View
      style={[
        styles.sidePanel,
        {
          width: getPanelWidth(),
          transform: [{ translateX: panelAnim }],
        },
      ]}
    >
      {/* Botão de Fechar fixo no topo */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={24} color="#333" />
      </TouchableOpacity>

      {/* ScrollView para garantir que o conteúdo seja acessível em telas baixas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.panelHeader}>
          <View style={styles.largeIconCircle}>
            <Feather
              name={selectedCard.icon || "box"}
              size={40}
              color="#4A90E2"
            />
          </View>
          <Text style={styles.panelTitle}>{selectedCard.word}</Text>
          <Text style={styles.panelPronunciation}>
            {selectedCard.pronunciation}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>TRADUÇÃO</Text>
          <Text style={styles.translationText}>{selectedCard.translation}</Text>

          <Text style={styles.label}>DEFINIÇÃO</Text>
          <Text style={styles.descriptionText}>{selectedCard.desc}</Text>
        </View>

        <TouchableOpacity style={styles.audioButton} onPress={falar}>
          <Feather name="volume-2" size={20} color="#fff" />
          <Text style={styles.audioButtonText}>Ouvir Pronúncia</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidePanel: {
    height: "100%", // Sempre ocupa a altura total
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderLeftColor: "#EEE",
    position: "absolute", // Garante que ele fique sobreposto em telas pequenas
    right: 0,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: -10, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  scrollContainer: {
    padding: 30,
    paddingTop: 10, // Menos padding no topo pois o botão de fechar já tem padding
    paddingBottom: 50, // Espaço extra no fim para o scroll não ficar colado
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 20,
    zIndex: 10,
  },
  panelHeader: { alignItems: "center", marginTop: 10 },
  largeIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  panelTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },
  panelPronunciation: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "500",
    marginTop: 4,
  },
  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 30 },
  infoSection: { marginBottom: 30 }, // Alterado de flex:1 para marginBottom para funcionar com o ScrollView
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BBB",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 25,
  },
  descriptionText: { fontSize: 16, color: "#555", lineHeight: 24 },
  audioButton: {
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 15,
    gap: 12,
  },
  audioButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
