import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
 
export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const [searchShop, setSearchShop] = useState("");
  const navigation = useNavigation();
 
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const saved = await AsyncStorage.getItem("shoppingList");
        if (saved) {
          const parsed = JSON.parse(saved);
          const sorted = parsed.sort((a, b) => a.purchased - b.purchased);
          setItems(sorted);
        }
      };
      loadData();
    }, [])
  );
 
  const saveItems = async (newItems) => {
    setItems(newItems);
    await AsyncStorage.setItem("shoppingList", JSON.stringify(newItems));
  };
 
  const handleToggle = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    const sorted = updated.sort((a, b) => a.purchased - b.purchased);
    saveItems(sorted);
  };
 
  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };
 
  const filteredItems = items.filter((item) =>
    searchShop
      ? item.store.toLowerCase().includes(searchShop.toLowerCase())
      : true
  );
 
  const sections = [{ title: "Moja lista zakupów", data: filteredItems }];
 
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Lista Zakupów</Text>
 
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.addText}>+ Dodaj</Text>
      </TouchableOpacity>
 
      <Text style={styles.filterLabel}>Filtruj po sklepie:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa sklepu"
        value={searchShop}
        onChangeText={setSearchShop}
      />
 
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              styles.listItem,
              item.purchased && { backgroundColor: "#e1f8dc" },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  name: item.name,
                  price: item.price,
                  store: item.store,
                })
              }
            >
              <Text
                style={[
                  styles.itemText,
                  item.purchased && {
                    textDecorationLine: "line-through",
                    color: "#555",
                  },
                ]}
              >
                {item.name} – {item.price} zł ({item.store})
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleToggle(item.id)}>
                <Text style={styles.markDone}>✔</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.remove}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#3366ff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  addText: { color: "white", fontWeight: "bold", fontSize: 16 },
  filterLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginBottom: 5,
  },
  listItem: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { fontSize: 16 },
  actions: { flexDirection: "row", gap: 10 },
  markDone: { fontSize: 18, color: "green" },
  remove: { fontSize: 18, color: "red", marginLeft: 10 },
});
 