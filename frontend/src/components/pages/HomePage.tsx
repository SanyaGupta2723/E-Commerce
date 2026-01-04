import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';


import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  Zap,
  Award,
  Users
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

import { ProductCard } from '../common/ProductCard';
import { Button } from '../common/Button';

const heroSlides = [
  {
    tag: 'Fashion',
    image: 'https://img.freepik.com/free-photo/fast-fashion-vs-slow-sustainable-fashion_23-2149134026.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    tag: 'Electronics',
    image: 'https://klipsch.imgix.net/general/T5-II-True-Wireless-McLaren-Sport-headphones-industrial-floor.jpg?crop=focalpoint&domain=klipsch.imgix.net&fit=crop&fm=webp&fp-x=0.5&fp-y=0.5&h=1080&ixlib=php-3.3.1&q=100&w=1920'
  },
  {
    tag: 'Groceries',
    image: 'https://food-ubc.b-cdn.net/wp-content/uploads/2020/02/Save-Money-On-Groceries_UBC-Food-Services.jpg'
  },
  {
    tag: 'Books',
    image: 'https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.jpg?s=612x612&w=0&k=20&c=OV_sdclWUExHy0VKPeZwyen2mO6g1NwAIBbLPT_Hd30='
  },
  {
    tag: 'Bathroom things',
    image: 'https://img.freepik.com/premium-photo/shelf-with-bottle-soap-plant-it_337384-180064.jpg'
  }
];

export const HomePage: React.FC = () => {
  const { dispatch } = useAppContext();
  const [products, setProducts] = useState<any[]>([]);
useEffect(() => {
  const fetchTrendingProducts = async () => {
    try {
      // 👇 sirf 4 products ke liye (Trending)
      const data = await getProducts(1, 4);

      setProducts(data.products ?? []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  fetchTrendingProducts();
}, []);





  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev)  => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    dispatch({ type: 'SET_PAGE', payload: 'shop' });
  };

  const handleCategoryClick = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    dispatch({ type: 'SET_PAGE', payload: 'shop' });
  };

  return (
    <div className="min-h-screen">

      {/* 🔥 HERO SECTION WITH SLIDING BACKGROUND */}
      <section className="relative h-[85vh] overflow-hidden text-white">

        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover scale-110 blur-sm"
              alt={slide.tag}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">
                  {heroSlides[currentSlide].tag} Collection
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Discover Premium
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Products
                </span>
              </h1>

              <p className="text-xl text-blue-100 max-w-lg">
                Shop fashion, electronics & daily essentials at best prices with fast delivery.
              </p>

              <Button
                size="lg"
                onClick={handleShopNow}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 shadow-xl"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="hidden lg:block">
              <img
                src={heroSlides[currentSlide].image}
                className="rounded-3xl shadow-2xl h-96 object-cover"
                alt="hero"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ⭐ FEATURED PRODUCTS */}
     <section className="py-10 bg-gray-40 mt-16">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-0">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
      Trending Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</section>


      {/* 🛍️ SHOP BY CATEGORY – KOHL'S STYLE */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <h2 className="text-3xl font-bold text-center mb-12">
      What are you shopping for today?
    </h2>

    <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 lg:justify-center">

      {[
        {
          name: 'Fashion',
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
        },
        {
          name: 'Groceries',
          image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg'
        },
        {
          name: 'Electronics',
          image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
        },
        {
          name: 'Books',
          image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg'
        },
        {
          name: 'Beauty',
          image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'
        },
        {
          name: 'Home',
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
        },
        {
          name: 'Kids',
          image: 'https://images.pexels.com/photos/3661358/pexels-photo-3661358.jpeg'
        },
        {
          name: 'Shoes',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
        }
      ].map((cat) => (
        <div
          key={cat.name}
          onClick={() => handleCategoryClick(cat.name)}
          className="flex flex-col items-center min-w-[120px] cursor-pointer group"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:shadow-xl transition">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <span className="mt-4 font-semibold text-gray-800 group-hover:text-blue-600">
            {cat.name}
          </span>
        </div>
      ))}

    </div>
  </div>
</section>


    </div>
  );
};
