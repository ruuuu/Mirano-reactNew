import { createSlice } from "@reduxjs/toolkit";
import { createSearchParams } from "react-router-dom";


// объект хранит нач значения состояний:
const initialState = {
  isOpen: false, // корзина закрыта

};




const cartSlice = createSlice({
  name: 'cart', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсер - это фукния которая меняет состояния
    
     toggleCart(state, action){   // toggleCart-редьюсер(action), state =  { isOpen: false, }
      // action.payload -то что передали при вызове редьюсера
      state.isOpen = !state.isOpen;
    },
  }
  

});


console.log('cartSlice', cartSlice)

export const { toggleCart } = cartSlice.actions;  // деструктрироваи в левой части
export default cartSlice.reducer;