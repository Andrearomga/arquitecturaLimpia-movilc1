import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { addProduct } from '../../infrastructure/services/product_services'; // Importa la función de servicio para agregar productos

const AddProductScreen = ({ navigation }) => {
  const [nombre, setName] = useState('');
  const [descripcion, setDescription] = useState('');
  const [precio, setPrice] = useState('');

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
      };
      await addProduct(newProduct); // Llama a la función de servicio para agregar el producto
      Alert.alert('Producto Agregado', 'El producto se ha guardado exitosamente.', [
        { text: 'OK', onPress: () => navigation.replace('ProductList') }
      ]);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      Alert.alert('Error', 'Hubo un error al agregar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Agregar Producto</Text>
      <TextInput
        placeholder="Nombre del Producto"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={nombre}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descripción"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={descripcion}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Precio"
        keyboardType="numeric"
        style={{ borderWidth: 1, width: 200, marginBottom: 10 }}
        value={precio}
        onChangeText={setPrice}
      />
      <Button title="Agregar" onPress={handleAddProduct} />
    </View>
  );
};

export default AddProductScreen;
