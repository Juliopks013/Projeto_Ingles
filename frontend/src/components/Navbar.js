import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function Navbar({ search, setSearch }) {
  return (
    <View style={styles.navbar}>
      
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.svg')}
            style={styles.logo}
          />
        </View>
      </View>

      <TextInput
        placeholder="Pesquise palavras"
        placeholderTextColor="#999"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

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
    paddingHorizontal: 12,
  },

  logoWrapper: {
    width: 60,
    height: 100,
    justifyContent: "center",
    marginRight: 10,
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: -30,
  },

  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },

  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#E5E5E5",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#3B57A1",
    fontWeight: "bold",
    fontSize: 12,
  },
});