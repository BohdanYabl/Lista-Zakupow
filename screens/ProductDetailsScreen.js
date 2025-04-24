import React from "react";
import { View, Text, StyleSheet } from "react-native";
 
export default function ProductDetailsScreen({ route }) {
  const { name, price, store } = route.params;
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Szczegóły produktu</Text>
      <Text style={styles.text}>🛒 Nazwa: {name}</Text>
      <Text style={styles.text}>💰 Cena: {price} zł</Text>
      <Text style={styles.text}>🏬 Sklep: {store}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});