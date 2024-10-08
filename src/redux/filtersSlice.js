import { createSlice } from "@reduxjs/toolkit";
import { isNumber } from "../utils.js";
// rxs


// объект хранит нач значения состояний:
const initialState = {
    type: "bouquets",
    minPrice: "", 
    maxPrice: "",
    category: "",
    search: "", // для поиска
};




const filtersSlice = createSlice({
  name: 'filters', // нзв стейта сами придумали
  initialState,
  reducers: {    // редьюсеры вызываем(в .jsx) черз dispatch
    
    changeType(state, action){  // редьюсер, смена typeв фильтре: bouquets, toys, cards
      state.type = action.payload;  // bouquets/toys/cards (то что передаем в  запросе type=cards)
      state.minPrice = "";
      state.maxPrice = "";
      state.category = "";
      state.search = "";
    },

    changePrice(state, action){   // редьюсер, смена minPrice и maxPrice в фильтре
      // console.log('action.payload in changePrice');   // { name, value } значения котрые введем в  текстовго поле
      if(isNumber(action.payload.value) || action.payload.value === ""){ // чтобы не вводить буквы в поле
        state[action.payload.name] = action.payload.value;      // name- атрибут у поля <input> (то что передаем в  запросе minPrice=500, maxPrice=700)
      }
    },

    changeCategory(state, action){ // редьсюер, смена Категории товара
      // console.log('action.payload in changeCategory ', action.payload)
      // в payload попадет то, что передадим при вызове редьюсера
      state.category = action.payload; //  action.payload это то, что выберем  из категриий
    },

    changeSearch(state, action){ // редьюсер, для поиска
      // в payload попадет то, что передадим при вызове редьюсера
      state.type = "";
      state.minPrice = ""; 
      state.maxPrice = "";
      state.category = "";
      state.search = action.payload; // то что ввдем в поле поиска
    } 
  },

});




export const { changeType, changePrice, changeCategory, changeSearch } = filtersSlice.actions;  // деструктрироваи в левой части
export default filtersSlice.reducer;