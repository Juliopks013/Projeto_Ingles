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
  }

  function gerarPronuncia(word) {
    const dict = {
      feedback: "fi-di-be-ki",
      download: "daun-loud",
      upload: "ap-loud",
      image: "i-me-dji",
      cloud: "cláud",
      cursos: "cur-sos",
      projetos: "pro-je-tos",
      comunidade: "co-mu-ni-da-de",
      code: "koud",
      users: "iú-zers",
    };

    return dict[word.toLowerCase()] || "pronúncia não disponível";
  }

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Uso Comum</Text>
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
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardText}>{card.desc}</Text>
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

            {/* BOTÃO X */}
            <TouchableOpacity
              onPress={closeModal}
              style={styles.closeIcon}
            >
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>

            {selectedCard && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedCard.title}
                </Text>

                <Text style={styles.modalSubtitle}>
                  Significado:
                </Text>
                <Text style={styles.modalText}>
                  {selectedCard.desc}
                </Text>

                <Text style={styles.modalSubtitle}>
                  Como fala:
                </Text>
                <Text style={styles.modalText}>
                  {gerarPronuncia(selectedCard.title)}
                </Text>
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
    width: (width - 60) / 3,
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
    minHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 22,
    paddingTop: 35,
    elevation: 8,
  },

  closeIcon: {
    position: "absolute",
    top: 10,
    right: 12,
    padding: 5,
  },

  closeIconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    color: "#444",
  },

  modalText: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
});