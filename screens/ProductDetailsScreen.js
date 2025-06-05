// screens/ProductDetailScreen.js
import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  const toggleStatus = async () => {
    try {
      await updateDoc(doc(db, "products", product.id), {
        isBought: !product.isBought,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd", error.message);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Usuń produkt",
      `Czy na pewno chcesz usunąć: ${product.name}?`,
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "products", product.id));
              navigation.goBack();
            } catch (error) {
              Alert.alert("Błąd", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!product) return <Text style={styles.text}>Brak danych produktu</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.text}>Cena: {product.price} zł</Text>
      <Text style={styles.text}>Sklep: {product.store}</Text>
      <Text style={styles.text}>
        Status: {product.isBought ? "Kupione ✅" : "Do kupienia 🛒"}
      </Text>

      <View style={styles.buttonBlock}>
        <Button
          title={
            product.isBought ? "Oznacz jako niekupione" : "Oznacz jako kupione"
          }
          onPress={toggleStatus}
        />
      </View>

      <Button title="🗑 Usuń produkt" color="red" onPress={confirmDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  buttonBlock: {
    marginVertical: 20,
  },
});
