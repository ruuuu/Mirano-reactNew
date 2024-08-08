import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const.js";

//Регитрация
export const registerCart = createAsyncThunk('cart/registerCart', async() => {

  const response = fetch(`${API_URL}/api/cart/register`, {
    method: 'POST', 
    credentials: 'include' // куки вклбчены

  });

  return await response.json();
});





// объект хранит нач значения состояний, нзв состояний(свойств) придумываем сами:
const initialState = {
  isOpen: false,        // корзина закрыта
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"), // список товаров корзины [{},{}]
  status: 'idle',
  accessKey: null,
  error: null
};




const cartSlice = createSlice({
  name: 'cart', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсеры - это фукния которая меняет состояния
    
    toggleCart(state, action){   // редьюсер(action), state =  { isOpen: false, }
      // action.payload -то что передали при вызове редьюсера
      state.isOpen = !state.isOpen;
    },

    addItemToCart(state, action){   // редьюсер, добавление тоара в Коризну
      const { id, photoUrl, name, price, dateDelivery, count = 1 } = action.payload;  // деструкткрируем объект, count по умолчанию =1
      console.log('action.payload ', action.payload)
    
      const existingItem = state.items.find(item => item.id === id);
      
      if(existingItem){
        existingItem.count = count;
      }
      else{
        state.items.push({ id, photoUrl, name, price, dateDelivery, count });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));  // обновлем хранилище
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerCart.pending, (state) => {
      state.status = 'loading';  // loading сами придумали, ждем ответа от сервера
    })
    builder.addCase(registerCart.fulfilled, (state, action) => {
      state.status = 'success';  // success сами придумали, сервер ответил
      state.accessKey = action.payload.accessKey; // в action.payload будет то, что сервер отдаст
    })
    builder.addCase(registerCart.rejected, (state, action) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.accessKey = '';
      state.error = action.error.message;
    });
  }
  

});


console.log('cartSlice', cartSlice)

export const { toggleCart, addItemToCart } = cartSlice.actions;  // экспорт редьюсеров, деструктрироваи в левой части
export default cartSlice.reducer;