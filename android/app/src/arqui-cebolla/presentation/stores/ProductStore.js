// ProductStore.js
import { makeAutoObservable } from 'mobx';

class ProductStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  updateProduct(updatedProduct) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      // Actualiza el estado de los productos para que los componentes observadores se vuelvan a renderizar
      this.setProducts([...this.products]);
    }
  }

  removeProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
  }
}

export default new ProductStore();
