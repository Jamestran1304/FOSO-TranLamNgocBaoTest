import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.id === action.item.id ? { ...i, qty: (i.qty || 1) + 1 } : i,
        );
      } else {
        items = [...state.items, { ...action.item, qty: 1 }];
      }
      return { ...state, items, open: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: (i.qty || 1) + 1 } : i,
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i,
        ),
      };
    case 'OPEN_CONFIRM':
      return { ...state, confirmOpen: true };
    case 'CLOSE_CONFIRM':
      return { ...state, confirmOpen: false };
    case 'SET_OPEN':
      return { ...state, open: !!action.open };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    open: false,
    confirmOpen: false,
  });
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined)
    throw new Error('useCartState must be used within CartProvider');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined)
    throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}
