import { useQuery } from "@tanstack/react-query";
import { PRODCUT_API } from "../../services/products";

// get all products
export const useGetProducts = () => {
  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => PRODCUT_API.getProducts(),
  });

  return { products, isPending, error };
};

// get product by id
export const useGetProductById = (id) => {
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => PRODCUT_API.getProductById(id),
  });

  return { product, isPending, error };
};

// get top 8 masterpieces
export const useGetMasterpieces = () => {
  const {
    data: masterpieces,
    isPending,
    error,
  } = useQuery({
    queryKey: ["masterpieces"],
    queryFn: () => PRODCUT_API.getMasterpieces(),
  });

  return { masterpieces, isPending, error };
};

// get latest product (most recently added)
export const useGetLatestProduct = () => {
  const {
    data: latestProduct,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", "latest"],
    queryFn: () => PRODCUT_API.getLatestProduct(),
  });

  return { latestProduct, isPending, error };
};
