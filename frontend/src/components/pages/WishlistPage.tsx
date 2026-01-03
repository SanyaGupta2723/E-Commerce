import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const WishlistPage: React.FC = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-[100vh] flex items-center justify-center">
      <div className="text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center">
            <Heart className="w-12 h-12 text-pink-400" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Save your favorite items here so you can easily find them later.
        </p>

        {/* CTA */}
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'shop' })}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-lg"
        >
          ← Start Shopping
        </button>

      </div>
    </div>
  );
};

export default WishlistPage;
