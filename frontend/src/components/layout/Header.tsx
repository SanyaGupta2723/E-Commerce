import React from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Bell,
  ArrowLeft
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.currentPage !== 'shop') {
      dispatch({ type: 'SET_PAGE', payload: 'shop' });
    }
  };

  const handleNavigation = (page: any) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    setIsMenuOpen(false);
  };

  const handleBack = () => {
    if (state.previousPage) {
      dispatch({ type: 'SET_PAGE', payload: state.previousPage });
    }
  };

  const handleAuthAction = () => {
    handleNavigation(state.user ? 'account' : 'login');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* 🔵 LEFT SECTION (BACK + LOGO + NAV) */}
          <div className="flex items-center">

            {/* BACK ARROW */}
            {state.previousPage && state.currentPage !== 'home' && (
              <button
                onClick={handleBack}
                className="mr-3 p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}

            {/* LOGO */}
            <div
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => handleNavigation('home')}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-2xl mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopHub
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  Premium Shopping
                </div>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-8 ml-10">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Shop', page: 'shop' },
                { label: 'About Us', page: 'home' },
                { label: 'Contact', page: 'home' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>
          </div>

          {/* 🔵 SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={state.searchQuery}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_SEARCH_QUERY',
                    payload: e.target.value
                  })
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* 🔵 RIGHT ACTIONS */}
          <div className="flex items-center space-x-3">
            <button
               onClick={() => handleNavigation('notifications')}
                 className="hidden md:flex relative p-3 hover:bg-gray-100 rounded-xl"
            >
                <Bell className="w-6 h-6" />
            </button>

            <button
  onClick={() => handleNavigation('wishlist')}
  className="hidden md:flex p-3 hover:bg-gray-100 rounded-xl"
>
  <Heart className="w-6 h-6" />
</button>

            <Button
              variant="ghost"
              onClick={handleAuthAction}
              className="hidden md:flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {state.user ? state.user.name?.split(' ')[0] : 'Login'}
            </Button>

            <button
              onClick={() => handleNavigation('cart')}
              className="relative p-3"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
