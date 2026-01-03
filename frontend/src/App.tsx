import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { AccountPage } from './components/pages/AccountPage';
import { OrderHistoryPage } from './components/pages/OrderHistoryPage';
import WishlistPage from './components/pages/WishlistPage';
import NotificationsPage from './components/pages/NotificationsPage';

const AppContent: React.FC = () => {
  const { state } = useAppContext();

  // ✅ SILENT SCROLL TO TOP (NO VISIBLE JUMP)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [state.currentPage]);

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'account':
        return <AccountPage />;
      case 'order-history':
        return <OrderHistoryPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <HomePage />;
    }
  };

  const shouldShowHeaderFooter = !['login', 'register'].includes(state.currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeaderFooter && <Header />}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
