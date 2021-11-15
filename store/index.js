import { createSlice, configureStore } from '@reduxjs/toolkit';

// const initialToken = localStorage.getItem('token')
const cartStatusSlice = createSlice({
  name: 'cartStatus',
  initialState: { cartIsShown: false },
  reducers: {
    showCartHandler(state) {
      state.cartIsShown = true;
    },
    hideCartHandler(state) {
      state.cartIsShown = false;
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItem(state, action) {
      const updatedTotalAmount =
        state.totalAmount + action.action.price + 1

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.name === action.item.name
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.name === action.name
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.name !== action.name);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
    },
  },
});

const store = configureStore({
  reducer: { cartStatus: cartStatusSlice.reducer, cart: cartSlice.reducer },
});

export const cartStatusActions = cartStatusSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
