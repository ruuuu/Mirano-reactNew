import { createSlice } from "@reduxjs/toolkit";
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
    
    changeType(state, action){  // смена typeв фильтре: bouquets, toys, cards
      state.type = action.payload; 
      state.minPrice = "";
      state.maxPrice = "";
      state.category = "";
    },

    changePrice(state, action){   // смена minPrice и maxPrice в фильтре
      state[action.payload.name] = action.payload.value; // name- имя свойсва котрое нужно поменять

    }
  },
  

});




export const { changeType, changePrice } = filtersSlice.actions;  // деструктрироваи в левой части
export default filtersSlice.reducer;