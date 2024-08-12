import { createSlice } from "@reduxjs/toolkit";
import { isNumber } from "../utils.js";
// rxs


// объект хранит нач значения состояний:
const initialState = {
    type: "bouquets",
    minPrice: "", 
    maxPrice: "",
    category: "",
};




const filtersSlice = createSlice({
  name: 'filters', // нзв стейта сами придумали
  initialState,
  reducers: {  
    
    changeType(state, action){  // редьюсер, смена typeв фильтре: bouquets, toys, cards
      state.type = action.payload;  // bouquets/toys/cards
      state.minPrice = "";
      state.maxPrice = "";
      state.category = "";
    },

    changePrice(state, action){   // редьюсер, смена minPrice и maxPrice в фильтре
      //console.log('action.payload in changePrice');   // { name, value }
      if(isNumber(action.payload.value) || action.payload.value === ""){ // чтобы не вводить буквы в поле
          state[action.payload.name] = action.payload.value;      // name- атрибут у поля <input>
      }
      

    }
  },
  

});




export const { changeType, changePrice } = filtersSlice.actions;  // деструктрироваи в левой части
export default filtersSlice.reducer;