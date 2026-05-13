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

export default function Navbar({
  search,
  setSearch,
  isLoggedIn,
  selectedCategory,
  setSelectedCategory,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { name: "Frontend", icon: "monitor" },
    { name: "Backend", icon: "server" },
    { name: "Banco", icon: "database" },
    { name: "Segurança", icon: "shield" },
    { name: "Cloud", icon: "cloud" },
    { name: "Mobile", icon: "smartphone" },
    { name: "API", icon: "share-2" },
    { name: "Git", icon: "git-branch" },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {/* LOGO */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>
            Fatec
            <Text style={styles.brandTextLight}>
              Glossary
            </Text>
          </Text>
        </View>

        {/* SEARCH */}
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
              <Feather
                name="x"
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>
          {/* CATEGORIES */}
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() =>
                setShowCategories(!showCategories)
              }
            >
              <Feather
                name="grid"
                size={18}
                color="#3B57A1"
              />

              <Text style={styles.categoryButtonText}>
                CATEGORIAS
              </Text>
            </TouchableOpacity>

            {/* DROPDOWN */}
            {showCategories && (
              <View style={styles.dropdown}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryItem,

                      selectedCategory ===
                        category.name && {
                        backgroundColor:
                          "#3B57A1",
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory(
                        category.name
                      );

                      setShowCategories(false);
                    }}
                  >
                    <Feather
                      name={category.icon}
                      size={16}
                      color={
                        selectedCategory ===
                        category.name
                          ? "#FFF"
                          : "#3B57A1"
                      }
                    />

                    <Text
                      style={[
                        styles.categoryItemText,

                        selectedCategory ===
                          category.name && {
                          color: "#FFF",
                        },
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* PROFILE */}
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.profileButton}
            >
              <Feather
                name="user"
                size={22}
                color="#FFF"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },

  navbar: {
    height: 90,
    backgroundColor: "#3B57A1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  brandContainer: {
    marginRight: 30,
  },

  brandText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: -1,
  },

  brandTextLight: {
    fontWeight: "300",
    color: "#D6DFFF",
  },

  searchContainer: {
    flex: 1,
    height: 52,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },

  searchContainerFocused: {
    backgroundColor: "#FFF",
    borderColor: "#A3B9FF",
  },

  searchIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",

    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },

  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  categoryButtonText: {
    color: "#3B57A1",
    fontWeight: "bold",
    fontSize: 13,
  },

  dropdown: {
    position: "absolute",
    top: 65,
    right: 0,
    width: 340,

    backgroundColor: "#FFF",
    borderRadius: 28,

    padding: 18,

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,

    zIndex: 999,
  },

  categoryItem: {
    width: "47%",
    height: 48,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#EEF3FF",

    borderRadius: 16,

    marginBottom: 12,
    gap: 8,
  },

  categoryItemText: {
    color: "#3B57A1",
    fontWeight: "600",
    fontSize: 14,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,

    backgroundColor: "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",
  },
});