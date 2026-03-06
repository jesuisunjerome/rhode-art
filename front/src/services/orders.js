import { api, API_ENDPOINTS } from "../utils/constants";

export const ORDER_API = {
  // create order
  createOrder: async (orderData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // capture order payment (for PayPal)
  captureOrder: async ({ orderId, paypalOrderId }) => {
    try {
      const response = await api.post(
        `${API_ENDPOINTS.ORDERS}/${orderId}/pay`,
        { paypalOrderId },
      );
      return response.data;
    } catch (error) {
      console.error("Error capturing order:", error);
      throw error;
    }
  },

  // get order by id
  getOrderById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.ORDERS}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },
};
