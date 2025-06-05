// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filterStore, setFilterStore] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "products"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    });

    return () => unsubscribe();
  }, []);

  const toggleBought = async (id, current) => {
    try {
      await updateDoc(doc(db, "products", id), {
        isBought: !current,
      });
    } catch (error) {
      Alert.alert("Błąd", error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      Alert.alert("Błąd", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Błąd", error.message);
    }
  };

  const filtered = products.filter((p) =>
    filterStore
      ? p.store.toLowerCase().includes(filterStore.toLowerCase())
      : true
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Button
          title="➕ Dodaj"
          onPress={() => navigation.navigate("AddProduct")}
        />
        <Button title="🚪 Wyloguj" color="gray" onPress={handleLogout} />
      </View>

      <TextInput
        placeholder="Filtruj po sklepie"
        value={filterStore}
        onChangeText={setFilterStore}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Brak produktów</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>
                {item.store} | {item.price} zł
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => toggleBought(item.id, item.isBought)}
              >
                <Text style={{ fontSize: 18 }}>
                  {item.isBought ? "✅" : "🛒"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                <Text style={{ color: "red", marginLeft: 10 }}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fdfdfd" },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
  },
  item: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  info: { fontSize: 13, color: "#777" },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "gray",
    fontStyle: "italic",
  },
});
