import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, User, Order, Product, Page } from '../types';
import { mockOrders } from '../data/mockData';

/* ✅ SAFELY GET PRODUCT ID (MongoDB + Mock compatible) */
const getProductId = (product: Product) =>
  (product as any)._id || product.id;

interface AppState {
  currentPage: Page;
  previousPage: Page | null;
  selectedProductId: string | null;
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  orderNumber: string | null;
}

type AppAction =
  | { type: 'SET_PAGE'; payload: Page }
  | { type: 'SET_SELECTED_PRODUCT'; payload: string }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'PLACE_ORDER'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: AppState = {
  currentPage: 'home',
  previousPage: null,
  selectedProductId: null,
  products: [],
  cart: [],
  user: null,
  orders: [],
  searchQuery: '',
  selectedCategory: 'All',
  isLoading: false,
  error: null,
  orderNumber: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {

    case 'SET_PAGE':
      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: action.payload
      };

    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProductId: action.payload
      };

    case 'ADD_TO_CART': {
      const productId = getProductId(action.payload.product);

      const existingItem = state.cart.find(
        item => getProductId(item.product) === productId
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            getProductId(item.product) === productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          getProductId(item.product) === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          item => getProductId(item.product) !== action.payload
        )
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        orders: action.payload ? mockOrders : []
      };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'PLACE_ORDER':
      return {
        ...state,
        orderNumber: action.payload,
        cart: []
      };
      case "SET_PRODUCTS":
  return {
    ...state,
    products: action.payload
  };


    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
