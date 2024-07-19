import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice.js';     // нзв cartReducer придумали сами, это и есть cartSlice.reducer
import orderReducer from './orderSlice.js';
import goodsReducer from './goodsSlice.js';




// хранилище на основе бибилотеки redux roolkit:

const store = configureStore({
  reducer: {
    order: orderReducer, 
    cart: cartReducer,   // cart-нзв стейта (initialState в cartSlice.js) которое указали в cartSlice.name
    goods: goodsReducer,

  }
});


export default store;




