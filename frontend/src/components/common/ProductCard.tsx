import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
  };

  const handleProductClick = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product._id || product.id });
    dispatch({ type: 'SET_PAGE', payload: 'product' });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // ✅ INR formatter
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);

  return (
    <div
      onClick={handleProductClick}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* ACTIONS */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3">
            <button
              onClick={handleWishlist}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110"
            >
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>

            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* PRICE */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-2 shadow-lg">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* LOW STOCK */}
        {product.inStock > 0 && product.inStock < 10 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Only {product.inStock} left
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-3">
          {product.category}
        </span>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* RATING */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">
              {product.rating}
            </span>
          </div>

          <span className="text-sm text-gray-500">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* STOCK + BUTTON */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                product.inStock > 0 ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            ></span>
            {product.inStock > 0
              ? `${product.inStock} in stock`
              : 'Out of stock'}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.inStock === 0}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl shadow hover:scale-105 disabled:opacity-50"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
