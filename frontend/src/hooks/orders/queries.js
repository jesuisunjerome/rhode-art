import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api, API_ENDPOINTS } from "../../utils/constants";

// get order by id
export const useGetOrderById = (id) => {
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await api.get(`${API_ENDPOINTS.ORDERS}/${id}`);
      return response.data;
    },
    enabled: !!id,
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { order, isPending, error };
};
