import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from './screens/ShoppingList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista Zakupów" component={ShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
