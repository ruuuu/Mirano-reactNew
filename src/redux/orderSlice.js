import { createSlice } from "@reduxjs/toolkit";



// объект хранит нач значения состояний:
const initialState = {
  isOpenModal: false, // переменная состония, модалка формы заказа закрыта
  orderId: '',      // id сделанного заказа
  data: {           // данные полей заказа
    buyerName:  '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: true,
    deliveryDate: '',
    deliveryTime:'',
  },
};




const orderSlice = createSlice({
  name: 'order', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсер - это фукния которая меняет состояния
    
    openModal(state){   // openModal-редьюсер(action), state =  { isOpenModal: false, }
      state.isOpenModal = true;
    },

    closeModal(state){   // редьюсер
      state.isOpenModal = false;
    },

    clearOrder(state){ // редьюсер

      state.data = {
        buyerName:  '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: true,
        deliveryDate: '',
        deliveryTime:'',
      }
      
    },

    updateOrderData(state, action){  // редьюсер
      state.data[action.payload.name] = action.payload.value;   // { name, value } значения котрые введем в  текстовое поле
     // либо так:
     // state.data = { ...state.data, ...action.payload }
    },


  }
  

});




export const { openModal, closeModal, clearOrder, updateOrderData } = orderSlice.actions;  // деструктрироваи в левой части
export default orderSlice.reducer;