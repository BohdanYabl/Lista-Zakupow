import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
 
export default function AddProductScreen() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shop, setShop] = useState("");
  const navigation = useNavigation();
 
  const handleAdd = async () => {
    if (!product || !amount || !shop) return;
 
    const entry = {
      id: Date.now(),
      name: product,
      price: parseFloat(amount),
      store: shop,
      purchased: false,
    };
 
    const saved = await AsyncStorage.getItem("shoppingList");
    const list = saved ? JSON.parse(saved) : [];
    await AsyncStorage.setItem(
      "shoppingList",
      JSON.stringify([entry, ...list])
    );
 
    Alert.alert("Dodano produkt");
    navigation.goBack();
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj produkt</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>+ Dodaj</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3366ff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});