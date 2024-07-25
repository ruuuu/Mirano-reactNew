import { createSlice } from "@reduxjs/toolkit";




// объект хранит нач значения состояний, нзв состояний(свойств) придумываем сами:
const initialState = {
  isOpen: false,        // корзина закрыта
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"), // список товаров корзины [{},{}]

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
  }
  

});


console.log('cartSlice', cartSlice)

export const { toggleCart, addItemToCart } = cartSlice.actions;  // экспорт редьюсеров, деструктрироваи в левой части
export default cartSlice.reducer;