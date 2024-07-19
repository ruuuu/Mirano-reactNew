import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const.js";



// асинхронная функия, сама создает action и их вызывает и их отправляет в dispatch:
export const fetchGoods = createAsyncThunk('goods/fetchGoods',  async () => {  // нзв 'goods/fetchGoods' придумали сами

      const response = await fetch(`${API_URL}/api/products`);

      return await response.json();
    }
);
  






const initialState = {
  items: [],  // товары получим с сервера
  status: 'idle',  // еще не было загрузки товаров
  error: null,  // ошибки запроса

}




const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(fetchGoods.pending, (state) => {
      state.status = 'loading';  // ждем ответа от сервера
    })
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.status = 'succeeded';  // succeeded сами придумали, сервер ответил
      state.items = action.payload; // в action.payload будет то, что сервер отдаст
    })
    builder.addCase(fetchGoods.rejected, (state) => {
      state.status = 'failed';  // ошибка при запросе сервера
      state.error = action.error.message;
    });
  },  
});




export default goodsSlice.reducer