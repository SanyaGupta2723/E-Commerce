import React, { useEffect, useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { getProductById } from "../../services/productService";
import { Product } from "../../types";
import { ProductCard } from "../common/ProductCard";
import { Button } from "../common/Button";

export const ProductDetailPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { selectedProductId, products } = state;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PRODUCT DETAILS
  useEffect(() => {
    if (!selectedProductId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(selectedProductId);
        setProduct(data);

        // ✅ USE CONTEXT PRODUCTS FOR RECOMMENDED
        const related = (products ?? []).filter(
          p =>
            p.category === data.category &&
            p.id !== data.id
        );

        setRecommended(related);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [selectedProductId, products]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const productImages = [
    product.image,
    "https://m.media-amazon.com/images/I/61zEmMgqlQL.jpg",
    "https://st2.depositphotos.com/2552429/43192/i/450/depositphotos_431922504-stock-photo-small-headphones-wire-mobile-phone.jpg",
  ];

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* 🔙 BACK */}
        <button
          onClick={() => {
            dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
            dispatch({ type: "SET_PAGE", payload: "shop" });
          }}
          className="flex items-center text-sm text-gray-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to shop
        </button>

        {/* 🔥 MAIN PRODUCT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

          {/* IMAGES */}
          <div>
            <div className="aspect-square border rounded-lg overflow-hidden mb-4">
              <img
                src={productImages[selectedImage]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 border rounded cursor-pointer object-cover ${
                    selectedImage === i ? "border-blue-600" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-blue-600 mb-4">
              ₹{product.price}
            </div>

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium">Qty:</span>
              <div className="flex border rounded">
                <button
                  className="px-3"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3"
                  onClick={() =>
                    setQuantity(q =>
                      Math.min(product.inStock, q + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mb-6">
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>

              <Button size="sm" variant="outline">
                <Heart className="w-4 h-4" />
              </Button>

              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* SERVICES */}
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" /> Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Warranty
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Easy Returns
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ REVIEWS */}
        <div className="bg-white mt-10 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Customer Reviews
          </h3>
          {product.reviews?.length ? (
            product.reviews.map((r: any) => (
              <div key={r.id} className="border-b py-4">
                <p className="font-medium">{r.userName}</p>
                <p className="text-sm text-gray-600">
                  {r.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No reviews yet
            </p>
          )}
        </div>

        {/* 🔥 RECOMMENDED */}
        {recommended.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">
              You may also like
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.slice(0, 4).map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
