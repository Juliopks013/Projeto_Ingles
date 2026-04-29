import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Navbar from "../components/Navbar";
import { Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";

const { width } = Dimensions.get("window");

export default function Home() {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [columns, setColumns] = useState(1);
  const [search, setSearch] = useState("");

  // =========================
  // CARREGAR DADOS
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data?.cards) {
          setCards(data.cards);
        } else {
          throw new Error("Sem dados");
        }
      })
      .catch(() => {
        setCards([
          { word: "Download", translation: "baixar", desc: "baixar arquivo", icon: "download" },
          { word: "Upload", translation: "enviar", desc: "enviar arquivo", icon: "upload" },
          { word: "Image", translation: "imagem", desc: "imagem", icon: "image" },
          { word: "Cloud", translation: "nuvem", desc: "armazenamento", icon: "cloud" },
          { word: "Feedback", translation: "avaliação", desc: "opinião", icon: "message-circle" },
        ]);
      });
  }, []);

  // =========================
  // RESPONSIVIDADE
  // =========================
  useEffect(() => {
    function updateLayout() {
      const w = Dimensions.get("window").width;

      if (w >= 1200) setColumns(5);
      else if (w >= 900) setColumns(3);
      else if (w >= 600) setColumns(2);
      else setColumns(1);
    }

    updateLayout();

    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription?.remove();
  }, []);

  // =========================
  // MODAL CONTROL
  // =========================
  function openModal(card) {
    setSelectedCard(card);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedCard(null);

    if (Speech?.stop) Speech.stop();
  }

  // =========================
  // AUDIO
  // =========================
  function falar() {
    if (!selectedCard?.word) return;

    Speech.speak(selectedCard.word, {
      language: "en-US",
      rate: 0.9,
    });
  }

  // =========================
  // SEARCH (case + accent safe)
  // =========================
  const normalizeText = (text = "") =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCards = cards.filter((card) => {
    const text = `
      ${card.word || ""}
      ${card.translation || ""}
      ${card.desc || ""}
    `;

    return normalizeText(text).includes(normalizeText(search));
  });

  return (
    <View style={styles.container}>
      <Navbar search={search} setSearch={setSearch} />

      {/* <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
          Columns: {columns}
        </Text> */}

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.word}>Uso Comum</Text>
        <View style={styles.hr} />

        <View style={styles.grid}>
          {filteredCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => openModal(card)}
            >
              <Feather
                name={card.icon || "box"}
                size={28}
                color="#4A90E2"
                style={styles.icon}
              />

              <View>
                <Text style={styles.cardTitle}>{card.word} ({card.pronunciation})</Text>
                <Text style={styles.cardText}>Tradução: {card.translation}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            {/* X */}
            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>

            {selectedCard && (
              <>

                <View style={styles.modalHeader}>
                  <Feather
                    name={selectedCard.icon || "box"}
                    size={40}
                    color="#4A90E2"
                  />

                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modalTitle}>
                      {selectedCard.word} ({selectedCard.pronunciation})
                    </Text>
                    <Text style={styles.modalSubtitleSmall}>
                      Tradução: {selectedCard.translation}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedCard.desc}
                </Text>

                <TouchableOpacity style={styles.audioButton} onPress={falar}>
                  <Feather name="play" size={20} color="#fff" />
                  <Text style={styles.audioText}>Escutar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },

  content: {
    padding: 15,
  },

  hr: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // 🔥 RESPONSIVO REAL
  card: {
    width: "30%",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  icon: {
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  cardText: {
    fontSize: 13,
    color: "#666",
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔥 responsivo (mobile + tablet)
  modalBox: {
    width: "50%",
    maxWidth: 500, // desktop/tablet
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 10,
  },

  closeIcon: {
    position: "absolute",
    top: 10,
    right: 12,
  },

  closeIconText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  modalSubtitleSmall: {
    fontSize: 14,
    color: "#777",
  },

  modalDescription: {
    fontSize: 16,
    color: "#4A90E2",
    marginBottom: 30,
  },

  audioButton: {
    backgroundColor: "#3B5BA9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    gap: 10,
  },

  audioText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});