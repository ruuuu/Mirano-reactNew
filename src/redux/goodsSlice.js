import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const.js";



// асинхронная функия, сама создает action и их вызывает и их отправляет в dispatch:
export const fetchGoods = createAsyncThunk('goods/fetchGoods',  async (params, thunkAPI) => {  // нзв 'goods/fetchGoods' придумали сами
      
    try{
      const queryString = new URLSearchParams(params).toString();  // params = { type: bouquets, minPrice: '340', maxPrice: '500', category: '["Монобукеты", "WoW Эффект", "Авторские букеты", "Букеты из сухоцветов", "Цветы в корзине", "Цветы в коробке"]', search }
      console.log('queryString ', queryString); // search=%D0%BF%D0%B8%D0%BE%D0%BD%D1%8B или type=postcards&minPrice&maxPrice&category

      const response = await fetch(`${API_URL}/api/products${queryString ? `?${queryString}` : ''}`);    // /api/products?type=bouquets или  type=toys или type=postcards или search=%D0%B%D0%B

      return await response.json();

    }catch(err){

      return thunkAPI.rejectWithValue(`${err.response.status} - ${err.response.statusText}`);
    }
    }
);
  






const initialState = {
  items: [],  // товары получим с сервера
  status: 'idle',  // еще не было загрузки товаров
  error: null,  // ошибки запроса
  categories: [], 
}




const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(fetchGoods.pending, (state) => {
      state.status = 'loading';  // loading сами придумали, ждем ответа от сервера
      state.categories = [];
    })
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.status = 'succeeded';  // succeeded сами придумали, сервер ответил
      state.items = action.payload; // в action.payload будет то, что сервер отдаст [{},{},{}]
      
      action.payload.forEach(product => { // колеекцию  set и map в redux   использовать нельзя(как в js)
        if(product.categories){
          product.categories.forEach((category) => {
            if(!state.categories.includes(category)) {   // если в массиве state.categories нет элемент category
              state.categories.push(category);
            } 
          });
        }
      });
    })
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.error = action.error.message;
    });
  },  
});




export default goodsSlice.reducer