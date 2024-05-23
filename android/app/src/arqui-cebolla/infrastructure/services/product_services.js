// apiService.js

const BASE_URL = 'http://192.168.0.18:4000'; // URL base de la API

// Función para manejar errores de respuesta HTTP
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// Función para obtener la lista de productos
export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/`);
  const data = await response.json();
  return data;
};

// Función para agregar un nuevo producto
export const addProduct = async (newProduct) => {
    try {
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  };
  

export const updateProduct = async (productId, updatedProduct) => {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: 'PUT', // O 'PATCH' si prefieres
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    handleErrors(response);
    const data = await response.json();
    return data;
  };

  export const deleteProduct = async (productId) => {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: 'DELETE',
    });
    handleErrors(response);
    const data = await response.json();
    return data;
  };
  
  
// Define otras funciones para actualizar y eliminar productos

// Exporta las funciones para su uso en otros componentes
export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
