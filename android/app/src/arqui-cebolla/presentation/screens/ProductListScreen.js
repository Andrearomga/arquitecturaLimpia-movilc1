import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import ProductStore from '../stores/ProductStore.js';
import { getProducts } from '../../infrastructure/services/product_services.js'; // Importa la función de servicio para obtener productos

const ProductListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Estado para indicar si se están cargando los productos

  // Función para cargar la lista de productos
  const loadProducts = async () => {
    try {
      const products = await getProducts(); // Llama a la función de servicio para obtener la lista de productos
      ProductStore.setProducts(products); // Actualiza la lista de productos en el store local
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      Alert.alert('Error', 'Hubo un error al cargar los productos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false); // Indica que la carga ha finalizado
    }
  };

  useEffect(() => {
    // Carga la lista de productos al cargar el componente
    loadProducts();
  }, []);

  // Función para navegar a la pantalla de agregar producto
  const navigateToAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  // Función para navegar a la pantalla de edición de producto
  const handleEditProduct = (productId) => {
    navigation.navigate('UpdateProduct', { productId });
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (productId) => {
    navigation.navigate('DeleteProduct', { productId });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }}>
        <Button title="Agregar" onPress={navigateToAddProduct} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Listado de Productos</Text>
        {loading ? (
          <Text>Cargando...</Text> // Muestra un indicador de carga mientras se obtienen los datos
        ) : (
          <FlatList
            data={ProductStore.products}
            renderItem={({ item }) => (
              <View style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}>
                <Text>Nombre: {item.nombre}</Text>
                <Text>Descripción: {item.descripcion}</Text>
                <Text>Precio: ${item.precio.toFixed(2)}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                  {/* Botón para editar producto */}
                  <Button title="Editar" onPress={() => handleEditProduct(item.id)} />
                  {/* Botón para eliminar producto */}
                  <Button title="Eliminar" onPress={() => handleDeleteProduct(item.id)} />
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default observer(ProductListScreen);
