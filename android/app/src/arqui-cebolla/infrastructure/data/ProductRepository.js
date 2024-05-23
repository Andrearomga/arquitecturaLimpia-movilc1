// src/infrastructure/data/ProductRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS_KEY = 'products';

class ProductRepository {
  async getAll() {
    const productsJson = await AsyncStorage.getItem(PRODUCTS_KEY);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  async create(product) {
    let products = await this.getAll();
    products.push(product);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return product;
  }

  async update(productId, updatedProduct) {
    let products = await this.getAll();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = updatedProduct;
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return updatedProduct;
    }
    return null;
  }

  async delete(productId) {
    let products = await this.getAll();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return true;
    }
    return false;
  }
}

export default ProductRepository;
