// src/application/useCases/ProductUseCases.js
import ProductRepository from '../repositories/ProductRepository';

const productRepository = new ProductRepository();

export const getAllProducts = async () => {
  return await productRepository.getAll();
};

export const createProduct = async (product) => {
  return await productRepository.create(product);
};

export const updateProduct = async (productId, updatedProduct) => {
  return await productRepository.update(productId, updatedProduct);
};

export const deleteProduct = async (productId) => {
  return await productRepository.delete(productId);
};
