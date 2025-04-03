import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
export default function App() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shop, setShop] = useState("");
  const [searchShop, setSearchShop] = useState("");
 
  useEffect(() => {
    const getSaved = async () => {
      const saved = await AsyncStorage.getItem("shoppingList");
      if (saved) setItems(JSON.parse(saved));
    };
    getSaved();
  }, []);
 
  useEffect(() => {
    AsyncStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);
 
  const handleAdd = () => {
    if (!product || !amount || !shop) return;
 
    const entry = {
      id: Date.now(),
      name: product,
      price: parseFloat(amount),
      store: shop,
      purchased: false,
    };
 
    setItems((prev) => [entry, ...prev]);
    setProduct("");
    setAmount("");
    setShop("");
  };
 
  const handleToggle = (id) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, purchased: !i.purchased } : i
    );
    updated.sort((a, b) => a.purchased - b.purchased);
    setItems(updated);
  };
 
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
 
  const filteredItems = items.filter((item) =>
    searchShop
      ? item.store.toLowerCase().includes(searchShop.toLowerCase())
      : true
  );
 
  const sections = [
    {
      title: "Moja lista zakupów",
      data: filteredItems,
    },
  ];
 
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Lista Zakupów</Text>
 
      {/* Додавання товару */}
      <TextInput
        style={styles.input}
        placeholder="Nazwa produktu"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={styles.input}
        placeholder="Cena"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sklep"
        value={shop}
        onChangeText={setShop}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>+ Dodaj</Text>
      </TouchableOpacity>
 
      {/* Фільтр по магазину */}
      <Text style={styles.filterLabel}>Filtruj po sklepie:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa sklepu"
        value={searchShop}
        onChangeText={setSearchShop}
      />
 
      {/* Список */}
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
    </SafeAreaView>
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
  },
  itemText: { fontSize: 16 },
  actions: { flexDirection: "row", gap: 10 },
  markDone: { fontSize: 18, color: "green" },
  remove: { fontSize: 18, color: "red", marginLeft: 10 },
});