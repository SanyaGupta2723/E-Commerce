import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// SHOP PAGE (pagination)
export const getProducts = async (page = 1, limit = 10) => {
  const res = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`
  );
  return res.data; // { products, success }
};

// HOME PAGE (trending)
export const getTrendingProducts = async () => {
  const res = await axios.get(
    `${API_URL}?page=1&limit=4`
  );
  return res.data.products;
};

// SINGLE PRODUCT
export const getProductById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.product;
};
