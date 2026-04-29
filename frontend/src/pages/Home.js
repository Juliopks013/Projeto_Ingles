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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.cards) {
          setCards(data.cards);
        } else {
          throw new Error("Sem dados");
        }
      })
      .catch(() => {
        setCards([
          { title: "Download", desc: "baixar", icon: "download" },
          { title: "Upload", desc: "enviar", icon: "upload" },
          { title: "Image", desc: "imagem", icon: "image" },
          { title: "Cloud", desc: "nuvem", icon: "cloud" },
          { title: "Feedback", desc: "avaliação", icon: "message-circle" },
        ]);
      });
  }, []);

  function openModal(card) {
    setSelectedCard(card);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedCard(null);
    Speech.stop();
  }

  function falar() {
    if (!selectedCard) return;

    const texto = `${selectedCard.word}`;

    Speech.speak(texto, {
      language: "en-US",
      rate: 0.9,
    });
  }

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.word}>Uso Comum</Text>
        <View style={styles.hr} />

        <View style={styles.grid}>
          {cards.map((card, index) => (
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

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
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

  card: {
    width: (width - 60) / 5,
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

  modalBox: {
    width: "30%",
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