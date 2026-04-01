import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "../components/Navbar";

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home")
      .then((res) => res.json())
      .then((data) => setCards(data.cards))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Uso Comum</Text>

        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    color: "#666",
  },
});