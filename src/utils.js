
// берет объект и убирает свойства у котрых значение пусто:
export const getValidFilters = (filters) => {     // filters= { type: "bouquets", minPrice: "",  maxPrice: "", category: "" }

  const validFilters = {};


  for (const key in filters) {
      if(filters[key]){  // если не пустая строка
        validFilters[key] = filters[key];
      }
  }

  return validFilters ;
};

