import { createSlice } from "@reduxjs/toolkit";




// объект хранит нач значения состояний, нзв состояний(свойств) придумываем сами:
const initialState = {
  isOpen: false,        // корзина закрыта
  items: JSON.parse(localStorage.getItem('cartItems') || "[]"), // список товаров корзины

};




const cartSlice = createSlice({
  name: 'cart', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсеры - это фукния которая меняет состояния
    
    toggleCart(state, action){   // редьюсер(action), state =  { isOpen: false, }
      // action.payload -то что передали при вызове редьюсера
      state.isOpen = !state.isOpen;
    },

    addItemToCart(state, action){   // редьюсер
      console.log('action', action.payload)     // {id, img, title, price, dateDelivery}
    },
  }
  

});


console.log('cartSlice', cartSlice)

export const { toggleCart, addItemToCart } = cartSlice.actions;  // экспорт редьюсеров, деструктрироваи в левой части
export default cartSlice.reducer;