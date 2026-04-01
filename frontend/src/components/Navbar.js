import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <TextInput
        placeholder="Pesquise palavras"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VER CATEGORIAS</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    backgroundColor: "#3B57A1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#3B57A1",
    fontWeight: "bold",
    fontSize: 12,
  },
});