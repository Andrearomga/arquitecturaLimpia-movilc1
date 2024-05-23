import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import ProductStore from '../stores/ProductStore';
import { updateProduct } from '../../infrastructure/services/product_services'; // Importa la función de servicio para actualizar productos

const UpdateProductScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Obtiene el ID del producto de la navegación
  const [nombre, setName] = useState(''); // Estado para el nombre del producto
  const [descripcion, setDescription] = useState(''); // Estado para la descripción del producto
  const [precio, setPrice] = useState(''); // Estado para el precio del producto

  useEffect(() => {
    // Obtiene los detalles del producto actual y los establece en el estado local al cargar la pantalla
    const product = ProductStore.products.find(item => item.id === productId);
    if (product) {
      setName(product.nombre);
      setDescription(product.descripcion);
      setPrice(product.precio.toString());
    }
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      // Crea el objeto de producto actualizado con los nuevos valores
      const updatedProduct = {
        id: productId,
        nombre,
        descripcion,
        precio: parseFloat(precio),
      };

      // Llama a la función de servicio para actualizar el producto
      await updateProduct(productId, updatedProduct);

      // Actualiza el producto en el estado local de ProductStore
      ProductStore.updateProduct(updatedProduct);

      // Navega de vuelta a la lista de productos después de la actualización
      navigation.navigate('ProductList');

      // Muestra una alerta para notificar que el producto se ha actualizado
      Alert.alert('Producto Actualizado', 'El producto se ha actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Alert.alert('Error', 'Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Actualizar Producto</Text>
      <TextInput
        placeholder="Nuevo Nombre del Producto"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={nombre}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Nueva Descripción"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={descripcion}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Nuevo Precio"
        keyboardType="numeric"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={precio}
        onChangeText={setPrice}
      />
      <Button title="Actualizar" onPress={handleUpdateProduct} />
    </View>
  );
};

export default UpdateProductScreen;
