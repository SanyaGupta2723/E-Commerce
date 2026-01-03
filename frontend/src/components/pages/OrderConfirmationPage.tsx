import React from 'react';
import { CheckCircle, Package, Truck, Download, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../common/Button';

export const OrderConfirmationPage: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleContinueShopping = () => {
    dispatch({ type: 'SET_PAGE', payload: 'shop' });
  };

  const handleViewOrderHistory = () => {
    dispatch({ type: 'SET_PAGE', payload: 'order-history' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Order Number</p>
                <p className="text-lg font-mono text-gray-900">{state.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Order Date</p>
                <p className="text-lg text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-lg text-gray-900">{state.user?.email || 'customer@example.com'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-lg font-semibold text-emerald-600">
                  ${(state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 1.08 + 9.99).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              
              <div className="flex-1 h-0.5 bg-gray-200 relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-emerald-600"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Processing</p>
                  <p className="text-xs text-gray-400">1-2 business days</p>
                </div>
              </div>
              
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Shipped</p>
                  <p className="text-xs text-gray-400">3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                You'll receive an email confirmation with your order details
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                We'll send you tracking information once your order ships
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Expected delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleContinueShopping}
            className="flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          {state.user && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewOrderHistory}
              className="flex items-center gap-2"
            >
              View Order History
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Contact Support
              </Button>
              <Button variant="outline">
                Track Your Order
              </Button>
              <Button variant="outline">
                Return Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};