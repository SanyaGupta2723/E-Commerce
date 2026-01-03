import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ✅ ALL PRODUCTS
export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data.products; // array
};

// ✅ SINGLE PRODUCT
export const getProductById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.product;
};
