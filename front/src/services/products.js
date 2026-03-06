import { api, API_ENDPOINTS } from "../utils/constants";

export const PRODCUT_API = {
  // get all products
  getProducts: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // get top 8 masterpieces
  getMasterpieces: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/masterpieces`);
      return response.data;
    } catch (error) {
      console.error("Error fetching masterpieces:", error);
      throw error;
    }
  },

  // get product by id
  getProductById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // get latest product (most recently added)
  getLatestProduct: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/latest`);
      return response.data;
    } catch (error) {
      console.error("Error fetching latest product:", error);
      throw error;
    }
  },
};
