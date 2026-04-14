import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      
      {/* WRAPPER */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
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
    overflow: "hidden",
  },

  logoWrapper: {
    width: 60,
    height: 80,
    justifyContent: "center",
    marginRight: 10,
  },

  logoContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#E5E5E5",
    borderRadius: 45,

    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    left: -45,

  },

  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    transform: [{ translateX: 5 }],
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