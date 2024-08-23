
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



// fn вызывается через каждые 5 сек
export const debounce = (fn, msec = 300) => {  // debounce функия высшго порядка,  функция обертка, msec -задержка

  let lastCall = 0;
  let lastCallTimer = 0;

  return (...arg) => {  // ...arg- принмиает все аргументы
    
    const prevCall = lastCall;
    lastCall = Date.now();

    if(prevCall && lastCall - prevCall <= msec){ // пока число msec не пройдет межд соседними вызовами fn(...arg) не вызовется 
      clearTimeout(lastCallTimer); // сброс lastCallTimer -предыдущий вызов
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



export const isNumber = (n) => {

  return (!isNaN(parseInt(n)) && isFinite(n));
}


export const adjustElementPosition = (element, count = 0) => { // element-элеент котрый будет смещаться
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;    // ширина видимой части

  if(rect.left < 0){        // если элемент уехал за левы край
    element.style.cssText = `
      left: 0;
      right: auto;
      transform: translateX(0)
    `;
  }
  else if(rect.right > viewportWidth){   // если элемент уехал за правый край
    element.style.cssText = `
      left: auto;
      right: 0;
      transform: translateX(0)
    `;
  }
  else{
    element.style.cssText = `
      left: 50%;
      right: auto;
      transform: translateX(-50%)
  `;
  }

  const postRect = element.getBoundingClientRect();
  if((postRect.left < 0 ||  postRect.right > viewportWidth) && count > 3){ // count > 3 значит вызвали фукнцию >3 раз
    adjustElementPosition(element, ++count);
  }

};