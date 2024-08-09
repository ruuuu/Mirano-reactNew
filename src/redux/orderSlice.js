import { createSlice } from "@reduxjs/toolkit";



// объект хранит нач значения состояний:
const initialState = {
  isOpenModal: false, // переменная состония, модалка формы заказа закрыта

};




const orderSlice = createSlice({
  name: 'order', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсер - это фукния которая меняет состояния
    
    openModal(state){   // openModal-редьюсер(action), state =  { isOpenModal: false, }
      state.isOpenModal = true;
    },

    closeModal(state){   
      state.isOpenModal = false;
    },
  }
  

});




export const { openModal, closeModal } = orderSlice.actions;  // деструктрироваи в левой части
export default orderSlice.reducer;