import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      
      {/* LOGO */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>

      {/* INPUT */}
      <TextInput
        placeholder="Pesquise palavras"
        placeholderTextColor="#999"
        style={styles.input}
      />

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VER CATEGORIAS</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 100,
    backgroundColor: "#3B57A1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logoWrapper: {
    width: 70,
    height: 100,
    justifyContent: "center",
    marginRight: 10,
  },

  logoContainer: {
    width: 110,
    height: 110,
    backgroundColor: "#E5E5E5",
    borderRadius: 55,

    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    left: -50,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    transform: [{ translateX: 10 }],
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#E5E5E5",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  buttonText: {
    color: "#3B57A1",
    fontWeight: "bold",
    fontSize: 14,
  },
});