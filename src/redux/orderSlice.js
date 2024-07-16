import { createSlice } from "@reduxjs/toolkit";
import { createSearchParams } from "react-router-dom";


// объект хранит нач значения состояний:
const initialState = {
  isOpenModal: false, // модалка закрыта

};




const orderSlice = createSlice({
  name: 'modal', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсер - это фукния которая меняет состояния
    
    toggleOrder(state, action){   // toggleOrder-редьюсер(action), state =  { isOpenModal: false, }
      // action.payload -то что передали при вызове редьюсера
      state.isOpenModal = !state.isOpenModal;
    },
  }
  

});




export const { toggleOrder } = orderSlice.actions;  // деструктрироваи в левой части
export default orderSlice.reducer;