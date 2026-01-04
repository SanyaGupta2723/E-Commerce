import React, { useEffect, useState } from 'react';
import { SortAsc } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { SortOption } from '../../types';
import { getProducts } from '../../services/productService';
import { categories } from '../../data/mockData';

export const ShopPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { products, searchQuery, selectedCategory } = state;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // 🔥 FETCH PRODUCTS (10 per page)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(page, 10);

        dispatch({
          type: 'SET_PRODUCTS',
          payload: data.products || []
        });

        setTotalPages(Math.ceil(234 / 10)); // backend total

      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, dispatch]);

  // 🔎 FILTER (🔥 FIXED)
  const normalize = (value: string) =>
    value.toLowerCase().trim();

  const filteredProducts = (products ?? []).filter(product => {
    const name = product.name?.toLowerCase() || '';
    const desc = product.description?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      name.includes(query) || desc.includes(query);

    const matchesCategory =
      selectedCategory === 'All' ||
      normalize(product.category) === normalize(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // 🔃 SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
          <p className="text-gray-600">
            Showing {sortedProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <div className="lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow sticky top-8">
              <h3 className="font-semibold mb-4">Categories</h3>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                    selectedCategory === cat
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN */}
          <div className="flex-1">

            {/* SORT */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between">
              <div className="flex items-center gap-2">
                <SortAsc size={16} />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="border rounded px-2 py-1"
                >
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>
            </div>

            {/* PRODUCTS */}
            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : sortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
