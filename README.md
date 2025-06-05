# 🛒 Aplikacja Lista Zakupów

Aplikacja mobilna do zarządzania listą zakupów, napisana w **React Native** z wykorzystaniem **Expo** i **Firebase**.  
Pozwala na dodawanie, usuwanie i oznaczanie produktów jako "kupione", filtrowanie po sklepie oraz bezpieczne logowanie.

---

## 📌 Funkcjonalności  

✅ **Dodawanie produktów** do listy zakupów  
✅ **Usuwanie produktów** jednym kliknięciem  
✅ **Oznaczanie produktów jako "kupione"** – przenosi je na koniec listy  
✅ **Filtrowanie produktów** po **sklepie**  
✅ **Bezpieczne logowanie i rejestracja** (Firebase Authentication)  
✅ **Przechowywanie danych użytkownika** (Cloud Firestore)  
✅ **Responsywny i prosty interfejs**  

---

## 🛠 Technologie  

- ⚛️ **React Native** – framework do budowania aplikacji mobilnych  
- 🚀 **Expo** – narzędzie do łatwego uruchamiania aplikacji  
- 🔥 **Firebase** – backend: Authentication + Cloud Firestore  
- 🧭 **React Navigation** – zarządzanie ekranami

---

## 🔧 Instalacja i uruchomienie  

1. **Zainstaluj Expo CLI** (jeśli jeszcze nie masz):  
   ```bash
   npm install -g expo-cli
   ```

2. **Sklonuj repozytorium**:  
   ```bash
   git clone https://github.com/TwojUser/Lista-Zakupow.git
   cd Lista-Zakupow
   ```

3. **Zainstaluj zależności**:  
   ```bash
   npm install
   ```

4. **Uruchom aplikację**:  
   ```bash
   npm start
   ```

5. **Zeskanuj kod QR** za pomocą aplikacji **Expo Go** (na Android lub iOS)

---

## 🔐 Firebase

- **Authentication**: logowanie i rejestracja za pomocą e-mail i hasła  
- **Firestore**: przechowywanie danych produktów użytkownika w kolekcji `products`  

Każdy produkt zapisany jest z `userId`, dzięki czemu użytkownik widzi tylko swoje dane.

