
// берет объект и убирает свойства у котрых значение пусто:
export const getValidFilters = (filters) => {     // filters= { type: "bouquets", minPrice: "",  maxPrice: "", category: "" }

  const validFilters = {};


  for (const key in filters) { // перебирвем объект
      if(filters[key]){  // если не пустая строка
        validFilters[key] = filters[key];
      }
  }

  return validFilters ;
};



export const debounce = (fn, msec) => {  // debounce функия высшго порядка,  функция обертка, msec -задержка

  let lastCall = 0;
  let lastCallTimer = 0;

  return (...arg) => {  // ...arg- принмиает все аргументы
    
    const prevCall = lastCall;
    lastCall = Date.now();

    if(prevCall && lastCall - prevCall <= msec){ // пока число msec не пройдет межд соседними вызовами fn(...arg) не вызовется 
      clearTimeout(lastCallTimer); // сброс lastCallTimer)
    }


    lastCallTimer = setTimeout(() => { // переданный колбэк вызовется через msec
      fn(...arg);
    }, msec);
  };  


};

// пример использования debounce:
// const sum = (a, b) => (console.log(a + b));

// const sumDebounce = debounce(sum, 3000);

// sumDebounce(4, 6);
// sumDebounce(8, 16);