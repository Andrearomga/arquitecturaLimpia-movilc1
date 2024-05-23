import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './android/app/src/arqui-cebolla/presentation/screens/ProductListScreen.js';
import AddProductScreen from './android/app/src/arqui-cebolla/presentation/screens/AddProductScreen.js';
import UpdateProductScreen from './android/app/src/arqui-cebolla/presentation/screens/UpdateProductScreen.js';
import DeleteProductScreen from './android/app/src/arqui-cebolla/presentation/screens/DeleteProductScreen.js';




const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="UpdateProduct" component={UpdateProductScreen} />
        <Stack.Screen name="DeleteProduct" component={DeleteProductScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
