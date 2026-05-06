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
  const [panelAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  const isMobile = SCREEN_WIDTH < 600;
  const isTablet = SCREEN_WIDTH >= 600 && SCREEN_WIDTH < 1024;

  const panelWidth = isMobile
    ? SCREEN_WIDTH
    : isTablet
      ? SCREEN_WIDTH * 0.5
      : SCREEN_WIDTH * 0.33;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data?.cards) setCards(sortCards(data.cards));
      })
      .catch(() => {
        const mockData = [
          {
            word: "API",
            translation: "Interface de Prog.",
            desc: "Ponte entre softwares.",
            icon: "code",
            pronunciation: "/ˌeɪ.piːˈaɪ/",
          },
          {
            word: "Cloud",
            translation: "nuvem",
            desc: "Servidores remotos.",
            icon: "cloud",
            pronunciation: "/klaʊd/",
          },
          {
            word: "Database",
            translation: "banco de dados",
            desc: "Dados estruturados.",
            icon: "database",
            pronunciation: "/ˈdeɪtəbeɪs/",
          },
          {
            word: "Deploy",
            translation: "implantar",
            desc: "Colocar em produção.",
            icon: "send",
            pronunciation: "/dɪˈplɔɪ/",
          },
          {
            word: "Download",
            translation: "baixar",
            desc: "Baixar arquivos.",
            icon: "download",
            pronunciation: "/ˌdaʊnˈloʊd/",
          },
          {
            word: "Framework",
            translation: "estrutura",
            desc: "Conjunto de ferramentas.",
            icon: "layers",
            pronunciation: "/ˈfreɪmwɜːrk/",
          },
        ];
        setCards(sortCards(mockData));
      });
  }, []);

  const sortCards = (list) => {
    return [...list].sort((a, b) => a.word.localeCompare(b.word));
  };

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

  // Agrupa os itens por letra inicial
  const groupCardsByLetter = (data) => {
    return data.reduce((groups, card) => {
      const letter = card.word.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(card);
      return groups;
    }, {});
  };

  const renderContent = () => {
    // Se estiver pesquisando, renderiza grid único
    if (search.length > 0) {
      return (
        <View style={styles.grid}>
          {filteredCards.map((card, index) => renderSingleCard(card, index))}
        </View>
      );
    }

    // Se não, renderiza seções com sub-grids
    const grouped = groupCardsByLetter(filteredCards);
    return Object.keys(grouped)
      .sort()
      .map((letter) => (
        <View key={letter} style={styles.sectionContainer}>
          <View style={styles.alphabetHeader}>
            <Text style={styles.alphabetText}>{letter}</Text>
            <View style={styles.alphabetLine} />
          </View>
          <View style={styles.grid}>
            {grouped[letter].map((card, index) =>
              renderSingleCard(card, `${letter}-${index}`),
            )}
          </View>
        </View>
      ));
  };

  const renderSingleCard = (card, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.card,
        {
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
      <View
        style={[
          styles.cardIconWrapper,
          selectedCard?.word === card.word && styles.cardIconWrapperActive,
        ]}
      >
        <Feather
          name={card.icon || "box"}
          size={22}
          color={selectedCard?.word === card.word ? "#FFF" : "#3B57A1"}
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

      {!selectedCard && <Feather name="chevron-right" size={18} color="#ccc" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar search={search} setSearch={setSearch} isLoggedIn={true} />
      <View style={styles.mainLayout}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            !isMobile && selectedCard && { marginRight: panelWidth },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Biblioteca de Termos</Text>
          {renderContent()}
        </ScrollView>

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
  container: { flex: 1, backgroundColor: "#F0F2F5" },
  mainLayout: { flex: 1, flexDirection: "row", overflow: "hidden" },
  scrollContent: { padding: 25 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 10,
  },

  sectionContainer: { marginBottom: 30 },
  alphabetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    gap: 15,
  },
  alphabetText: { fontSize: 22, fontWeight: "900", color: "#3B57A1" },
  alphabetLine: { flex: 1, height: 1.5, backgroundColor: "#E0E0E0" },

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
    shadowRadius: 8,
    elevation: 3,
  },
  cardActive: {
    backgroundColor: "#3B57A1",
    borderColor: "#3B57A1",
    transform: [{ scale: 1.02 }],
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
  cardIconWrapperActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardSubtitle: { fontSize: 14, color: "#777", marginTop: 2 },
});
