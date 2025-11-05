import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/products");
      return res.data; // assuming it returns an array of products
    },
    staleTime: 1000 * 60 * 5, // cache for 5 min
  });
};

export default useProducts;
