import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Отправка заказа
//                                                                        thunkAPI 
export const sendOrder = createAsyncThunk('order/sendOrder', async(_, { getState, dispatch }) => { // отправка заказа на сервер, деструктурировали thunkAPI
  
  const state = getState();
  const orderData = {
    "buyer": {
      "name": state.order.data.buyerName,
      "phone": state.order.data.buyerPhone,
    },
    "recipient": {
      "name": state.order.data.recipientName,
      "phone": state.order.data.recipientPhone,
    },
    "address": `${state.order.data.street},  ${state.order.data.house}, ${state.order.data.apartment}`,
    "paymentOnline": state.order.data.paymentOnline,
    "deliveryDate": state.order.data.deliveryDate,
    "deliveryTime": state.order.data.deliveryTime,
  };

  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST', 
    credentials: 'include', // куки вклбчены
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if(!response.ok){
    throw new Error("не можем отпраить заказ на сервер");
  }

  if(response.ok){
    dispatch(clearOrder());
    dispatch(toggleCart()); // закрыли корзину
    dispatch(fetchCart()); // получение  корзины
  }

  return await response.json();
});




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
  reducers: {  // редьюсер - это фукния которая меняет состояние, редьюсеры вызываем(в .jsx) черз dispatch
    
    openModal(state){   // openModal-редьюсер(action), state =  { isOpenModal: false, }
      state.isOpenModal = true;
    },

    closeModal(state){   // редьюсер
      state.isOpenModal = false;
    },

    clearOrder(state){ // редьюсер, после отправки заказ очищаем форму

      state.data = {
        buyerName:  '', // эти значения свйства взяли у name текстовых полей
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
      state.data[action.payload.name] = action.payload.value;   // { name, value } у поля,  value - значение котрые введем в поле <input name="" value="">
     // либо так:
     // state.data = { ...state.data, ...action.payload }
    },
  },

  extraReducers: (builder) => {

    builder.addCase(sendOrder.pending, (state) => {
      state.status = 'loading';  // loading сами придумали, ждем ответа от сервера
      state.orderId = '';
    })
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.status = 'succeeded';  // succeeded сами придумали, сервер ответил
      state.orderId = action.payload; // в action.payload будет то, что сервер отдаст 
    })
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.error = action.error.message;
    });
  },  
  

});




export const { openModal, closeModal, clearOrder, updateOrderData } = orderSlice.actions;  // деструктрироваи в левой части
export default orderSlice.reducer;