import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ProductStore from '../stores/ProductStore.js';
import { deleteProduct } from '../../infrastructure/services/product_services.js'; // Importa la función de servicio para eliminar productos

const DeleteProductScreen = ({ navigation, route }) => {
  const { productId } = route.params; // Obtiene el ID del producto a eliminar desde las propiedades de ruta

  // Función para eliminar el producto y navegar de regreso a la lista de productos
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productId); // Llama a la función de servicio para eliminar el producto
      ProductStore.removeProduct(productId); // Actualiza el estado local eliminando el producto
      navigation.navigate('ProductList'); // Navega de regreso a la lista de productos
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Alert.alert('Error', 'Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Eliminar Producto</Text>
      <Text>¿Estás seguro de que deseas eliminar este producto?</Text>
      <Button title="Eliminar" onPress={handleDeleteProduct} />
    </View>
  );
};

export default DeleteProductScreen;
