import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const.js";



//Регитрация
export const registerCart = createAsyncThunk('cart/registerCart', async() => {

  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST', 
    credentials: 'include' // куки вклбчены
  });

  if(!response.ok){
    throw new Error("не можем поучить данные с сервера");
  }

  return await response.json();
});



export const fetchCart = createAsyncThunk('cart/fetchCart', async() => { // получение товров из Корзины

  const response = await fetch(`${API_URL}/api/cart`, {
    credentials: 'include' // куки вклбчены
  });

  if(!response.ok){
    throw new Error("не можем поучить данные с сервера");
  }

  return await response.json();  // [  {productId, quantity}, {}]
});



export const addItemToCart = createAsyncThunk('cart/addItemToCart', async({ productId, quantity }, { getState,  rejectWithValue }) => { // добавлени товара в Корзину
  // productId - id добавляемого в Корзину товара
  try{
    const state = getState();
    const cartItems = state.cart.items; // [{},{},{}]
  
    if(isNaN(parseInt(quantity))){ // приводим к числу
      const cartItem = cartItems.find((cartItem) => cartItem.id === productId); 
      quantity = cartItem ? cartItem.quantity + 1 : 1;
    }

    

    const response = await fetch(`${API_URL}/api/cart/items`, {
      method: 'POST', 
      credentials: 'include', // куки вклбчены
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if(!response.ok){
      throw new Error("не можем отпраить данные с сервера");
    }

    return await response.json();
  }
  catch(err){
    return rejectWithValue(err.message);
  }
});




// объект хранит нач значения состояний, нзв состояний(свойств) придумываем сами:
const initialState = {
  isOpen: false,        // корзина закрыта
  items: [], // список товаров корзины [{},{}], котрые придут с сервера
  status: 'idle',
  accessKey: null,
  error: null
};




const cartSlice = createSlice({
  name: 'cart', // нзв стейта сами придумали
  initialState,
  reducers: {  // редьюсеры - это фукния которая меняет состояния, редьюсеры вызываем(в .jsx) черз dispatch,то есть обрабаывает action 
    
    toggleCart(state, action){   // редьюсер(action), state =  { isOpen: false, }
      // action.payload -то что передали при вызове редьюсера
      state.isOpen = !state.isOpen;
    },

    // addItemToCart(state, action){   // редьюсер, добавление тоара в Коризну
    //   const { id, photoUrl, name, price, dateDelivery, count = 1 } = action.payload;  // деструкткрируем объект, count по умолчанию =1
    //   console.log('action.payload ', action.payload)
    
    //   const existingItem = state.items.find(item => item.id === id);
      
    //   if(existingItem){
    //     existingItem.count = count;
    //   }
    //   else{
    //     state.items.push({ id, photoUrl, name, price, dateDelivery, count });
    //   }

    //   localStorage.setItem('cartItems', JSON.stringify(state.items));  // обновлем хранилище
    // },
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
      state.error = action.payload || action.error.message;
    });


    builder.addCase(fetchCart.pending, (state) => {
      state.status = 'loading';  
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'success';  
      state.items = action.payload; // в action.payload будет то, что сервер отдаст
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.error = action.payload || action.error.message;
    });


    builder.addCase(addItemToCart.pending, (state) => {
      state.status = 'loading';  
    })
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.status = 'success';  
      state.items = action.payload; // в action.payload будет то, что сервер отдаст
    })
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.error = action.payload || action.error.message;
    });
  }
  

});


console.log('cartSlice', cartSlice)

export const { toggleCart } = cartSlice.actions;  // экспорт редьюсеров, деструктрироваи в левой части
export default cartSlice.reducer;