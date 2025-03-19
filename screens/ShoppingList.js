import React, { useState, useLayoutEffect } from 'react';
import { View, Text, SectionList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function ShoppingList({ navigation }) {
  const [products, setProducts] = useState([{ title: "Zakupy", data: [] }]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterStore, setFilterStore] = useState('');

  // Додавання кнопки "Dodaj Produkt" у навігацію
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Dodaj Produkt" onPress={() => setShowInput(true)} />,
    });
  }, [navigation]);

  // Додавання нового продукту
  const addProduct = () => {
    if (name && price && store) {
      const newProduct = { id: Date.now(), name, price: parseFloat(price), store, bought: false };
      setProducts([{ title: "Zakupy", data: [newProduct, ...products[0].data] }]);
      setName('');
      setPrice('');
      setStore('');
      setShowInput(false);
    }
  };

  // Видалення продукту
  const removeProduct = (id) => {
    const updatedProducts = products[0].data.filter(product => product.id !== id);
    setProducts([{ title: "Zakupy", data: updatedProducts }]);
  };

  // Позначення продукту як "куплений"
  const toggleBought = (id) => {
    const updatedProducts = products[0].data.map(product =>
      product.id === id ? { ...product, bought: !product.bought } : product
    );

    updatedProducts.sort((a, b) => a.bought - b.bought);
    
    setProducts([{ title: "Zakupy", data: updatedProducts }]);
  };

  // Фільтрація за ціною та магазином
  const filteredProducts = products[0].data.filter(product => {
    const matchPrice = filterPrice ? product.price <= parseFloat(filterPrice) : true;
    const matchStore = filterStore ? product.store.toLowerCase().includes(filterStore.toLowerCase()) : true;
    return matchPrice && matchStore;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista Zakupów</Text>

      {/* Поля для додавання нового продукту */}
      {showInput && (
        <View>
          <TextInput placeholder="Nazwa produktu" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Cena" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Sklep" value={store} onChangeText={setStore} style={styles.input} />
          <Button title="Dodaj" onPress={addProduct} />
        </View>
      )}

      {/* Поля фільтрації */}
      <Text style={styles.filterLabel}>Filtruj produkty:</Text>
      <TextInput 
        placeholder="Cena max" 
        value={filterPrice} 
        onChangeText={setFilterPrice} 
        keyboardType="numeric" 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Sklep" 
        value={filterStore} 
        onChangeText={setFilterStore} 
        style={styles.input} 
      />

      {/* Відображення списку товарів */}
      <SectionList
        sections={[{ title: "Zakupy", data: filteredProducts }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item, item.bought ? styles.boughtItem : null]}>
            <Text style={item.bought ? styles.boughtText : null}>
              {item.name} - {item.price} zł ({item.store})
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => toggleBought(item.id)} style={styles.boughtButton}>
                <Text style={styles.boughtText}>{item.bought ? "✔ Kupione" : "Kup"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeProduct(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

// Стилі
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  filterLabel: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#ddd', padding: 5, marginTop: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  boughtItem: { backgroundColor: '#d4edda' },
  buttons: { flexDirection: 'row', gap: 10 },
  boughtButton: { backgroundColor: '#28a745', padding: 5, borderRadius: 5 },
  boughtText: { color: 'white', fontSize: 16 },
  deleteButton: { backgroundColor: '#ff4444', padding: 5, borderRadius: 5 },
  deleteText: { color: 'white', fontSize: 18 },
});

