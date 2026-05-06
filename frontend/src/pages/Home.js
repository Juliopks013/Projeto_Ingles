import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import SidePanel from "../components/SidePanel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState("");

  // Inicia com SCREEN_WIDTH para garantir que comece totalmente escondido à direita
  const [panelAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  // Lógica de Responsividade centralizada
  const isMobile = SCREEN_WIDTH < 600;
  const isTablet = SCREEN_WIDTH >= 600 && SCREEN_WIDTH < 1024;

  // O SidePanel ocupará 1/3 em telas grandes, 1/2 em tablets e 1/1 em mobile
  const panelWidth = isMobile
    ? SCREEN_WIDTH
    : isTablet
      ? SCREEN_WIDTH * 0.5
      : SCREEN_WIDTH * 0.33;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data?.cards) setCards(data.cards);
      })
      .catch(() => {
        // Mock de dados para teste caso a API falhe
        setCards([
          {
            word: "Download",
            translation: "baixar",
            desc: "Transferir dados de um servidor.",
            icon: "download",
            pronunciation: "/ˌdaʊnˈloʊd/",
          },
          {
            word: "Upload",
            translation: "enviar",
            desc: "Enviar dados para um servidor.",
            icon: "upload",
            pronunciation: "/ˈʌpˌloʊd/",
          },
          {
            word: "Cloud",
            translation: "nuvem",
            desc: "Armazenamento remoto de dados.",
            icon: "cloud",
            pronunciation: "/klaʊd/",
          },
          {
            word: "Database",
            translation: "banco de dados",
            desc: "Conjunto estruturado de dados.",
            icon: "database",
            pronunciation: "/ˈdeɪtəbeɪs/",
          },
        ]);
      });
  }, []);

  function togglePanel(card) {
    if (card) {
      setSelectedCard(card);
      Animated.timing(panelAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(panelAnim, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setSelectedCard(null));
    }
  }

  const normalizeText = (t = "") =>
    t
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCards = cards.filter((c) => {
    const content = `${c.word} ${c.translation} ${c.desc}`;
    return normalizeText(content).includes(normalizeText(search));
  });

  return (
    <View style={styles.container}>
      <Navbar search={search} setSearch={setSearch} isLoggedIn={true} />

      <View style={styles.mainLayout}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            // Apenas "empurra" o conteúdo se NÃO for mobile
            !isMobile && selectedCard && { marginRight: panelWidth },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Biblioteca de Termos</Text>

          <View style={styles.grid}>
            {filteredCards.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  {
                    // Lógica de largura dos cards:
                    // Se o painel abrir no Desktop: 2 colunas (48%)
                    // Se estiver fechado no Desktop: 3 colunas (31%)
                    // Tablet/Mobile: 1 coluna (100%)
                    width:
                      selectedCard && !isMobile
                        ? "48%"
                        : SCREEN_WIDTH > 1024
                          ? "31%"
                          : "100%",
                  },
                  selectedCard?.word === card.word && styles.cardActive,
                ]}
                onPress={() => togglePanel(card)}
              >
                <View style={styles.cardIconWrapper}>
                  <Feather
                    name={card.icon || "box"}
                    size={22}
                    color={
                      selectedCard?.word === card.word ? "#fff" : "#3B57A1"
                    }
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.cardTitle,
                      selectedCard?.word === card.word && { color: "#fff" },
                    ]}
                  >
                    {card.word}
                  </Text>
                  <Text
                    style={[
                      styles.cardSubtitle,
                      selectedCard?.word === card.word && { color: "#dae8ff" },
                    ]}
                  >
                    {card.translation}
                  </Text>
                </View>

                {/* Mostra a seta apenas se nenhum card estiver selecionado para limpar o visual */}
                {!selectedCard && (
                  <Feather name="chevron-right" size={18} color="#ccc" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Painel Lateral Independente */}
        <SidePanel
          selectedCard={selectedCard}
          panelAnim={panelAnim}
          onClose={() => togglePanel(null)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  mainLayout: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden", // Garante que o painel não crie barra de rolagem horizontal
  },
  scrollContent: {
    padding: 25,
    // Transição suave para o redimensionamento na Web
    transitionProperty: "margin-right, width",
    transitionDuration: "0.3s",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardActive: {
    backgroundColor: "#3B57A1",
    borderColor: "#3B57A1",
    elevation: 6,
    transform: [{ scale: 1.02 }], // Leve destaque ao selecionar
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
    textTransform: "capitalize",
  },
});
