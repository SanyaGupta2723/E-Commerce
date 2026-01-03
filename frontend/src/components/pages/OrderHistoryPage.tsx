import React from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../common/Button';

export const OrderHistoryPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [selectedOrder, setSelectedOrder] = React.useState<string | null>(null);

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your orders</h2>
          <Button onClick={() => dispatch({ type: 'SET_PAGE', payload: 'login' })}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    dispatch({ type: 'SET_PAGE', payload: 'account' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">
            View and track all your orders. Total orders: {state.orders.length}
          </p>
        </div>

        {state.orders.length > 0 ? (
          <div className="space-y-6">
            {state.orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {order.date} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {selectedOrder === order.id ? 'Hide' : 'View'} Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                {selectedOrder === order.id && (
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                                <p className="text-sm text-gray-600">
                                  ${item.product.price} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Order Summary */}
                      <div className="space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                          <div className="text-sm text-gray-600">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p className="mt-2">{order.shippingAddress.phone}</p>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span>${(order.total / 1.08 - 9.99).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping</span>
                              <span>$9.99</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax</span>
                              <span>${((order.total / 1.08 - 9.99) * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="w-full">
                            Track Package
                          </Button>
                          <Button variant="outline" className="w-full">
                            Download Invoice
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" className="w-full">
                              Return Items
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <Button
              size="lg"
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'shop' })}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};