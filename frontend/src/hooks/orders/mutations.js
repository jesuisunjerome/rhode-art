import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ORDER_API } from "../../services/orders";

// create order
export const useCreateOrder = () => {
  const { mutateAsync: createOrder, isPending } = useMutation({
    mutationFn: async (orderPayload) =>
      await ORDER_API.createOrder(orderPayload),
    onSuccess: (data) => {
      // toast.success("Order created successfully");
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { createOrder, isPending };
};

// capture order
export const useCaptureOrder = () => {
  const { mutateAsync: captureOrder, isPending } = useMutation({
    mutationFn: async ({ orderId, paypalOrderId }) =>
      await ORDER_API.captureOrder({ orderId, paypalOrderId }),
    onSuccess: (data) => {
      // toast.success("Order captured successfully");
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { captureOrder, isPending };
};
