import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../const.js";


// асинхронная функия, сама создает action и их вызывает и их отправляет в dispatch:
export const fecthGoods = createAsyncThunk('goods/fetchGoods', 
    
  async () => {
      const response = await fetch(`${API_URL}/api/products`)
    



    }
);
  






const initialState = {
  items: [],  // товары полим с сервера
  status: 'idle',  // еще не было загрузки товаров
  error: null,  // ошибки запроса

}




const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {

  },
  extraReducers: () => {

  },
});




export default goodsSlice.reducer