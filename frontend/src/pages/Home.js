import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Navbar from "../components/Navbar";
import { Feather } from "@expo/vector-icons"; 

const { width } = Dimensions.get("window");

export default function Home() {
  const [cards, setCards] = useState([]);

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
          { title: "Upload", desc: "enviar", icon: "upload" },
          { title: "Cloud", desc: "nuvem", icon: "cloud" },
          { title: "Image", desc: "imagem", icon: "image" },
        ]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Uso Comum</Text>
        <View style={styles.hr} />

        <View style={styles.grid}>
          {cards.map((card, index) => (
            <TouchableOpacity key={index} style={styles.card}>

              <Feather
                name={card.icon || "box"}
                size={20}
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
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e6e6e6",
    },
  
    content: {
      padding: 10,
    },
  
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
  
    hr: {
      height: 1,
      backgroundColor: "#ccc",
      marginBottom: 15,
    },
  
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  
    card: {
      width: (width - 50) / 4,
      backgroundColor: "#f5f5f5",
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
  
      flexDirection: "row",
      alignItems: "center",
  
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
  
    icon: {
      marginRight: 8,
    },
  
    cardTitle: {
      fontSize: 12,
      fontWeight: "600",
    },
  
    cardText: {
      fontSize: 10,
      color: "#666",
    },
  });