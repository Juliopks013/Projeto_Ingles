import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Navbar({ search, setSearch, isLoggedIn }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.navbar}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>
          Fatec<Text style={styles.brandTextLight}>Glossary</Text>
        </Text>
      </View>

      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <Feather
          name="search"
          size={20}
          color={isFocused ? "#3B57A1" : "#999"}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="O que você está procurando hoje?"
          placeholderTextColor="#999"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {search !== "" && (
          <TouchableOpacity
            onPress={() => setSearch("")}
            style={{ padding: 5 }}
          >
            <Feather name="x" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Feather name="grid" size={18} color="#3B57A1" />
          <Text style={styles.categoryButtonText}>CATEGORIAS</Text>
        </TouchableOpacity>

        {isLoggedIn && (
          <TouchableOpacity style={styles.profileButton}>
            <Feather name="user" size={22} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 90,
    backgroundColor: "#3B57A1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  brandContainer: { marginRight: 30 },
  brandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: -1,
  },
  brandTextLight: { fontWeight: "300", color: "#D1D1D1" },
  searchContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  searchContainerFocused: { backgroundColor: "#FFF", borderColor: "#A3B9FF" },
  searchIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    ...Platform.select({ web: { outlineStyle: "none" } }),
  },
  actionsContainer: { flexDirection: "row", alignItems: "center", gap: 15 },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  categoryButtonText: { color: "#3B57A1", fontWeight: "bold", fontSize: 13 },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
