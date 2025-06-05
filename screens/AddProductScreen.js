// screens/AddProductScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db, auth } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");

  const saveProduct = async () => {
    if (!name || !price || !store) {
      Alert.alert("Błąd", "Uzupełnij wszystkie pola");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        store,
        isBought: false,
        userId: auth.currentUser.uid,
        createdAt: Date.now(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd zapisu", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nazwa produktu"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Cena"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Sklep"
        style={styles.input}
        value={store}
        onChangeText={setStore}
      />
      <Button title="Zapisz" onPress={saveProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
});
