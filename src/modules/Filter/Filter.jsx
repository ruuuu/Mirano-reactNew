import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { debounce, getValidFilters } from '../../utils.js';
import { useRef } from 'react';
import { FilterRadio } from './FilterRadio.jsx';
import { useSelector } from 'react-redux';
import { changePrice, changeType } from '../../redux/filtersSlice.js';




const filterTypes = [
    { value: 'bouquets', title: 'Букеты' },
    { value: 'toys', title: 'Игрушки' },
    { value: 'postcards', title: 'Открытки' },
];




 {/* Компонент  */}
export const Filter = ({ setTitleGoods }) => {

    // завели переменную состояния openChoice.  null(выпадашки закрыты) - нач значение состония openChoice:
    const [ openChoice, setOpenChoice ] = useState(null);  // хук(может принимать что угодно),  вернет массив(поле и  функцию), но мы деструктурируя возьмем только состояние isOpenChoice.  setIsOpenChoice это фукния, нзв ей дали сами. Эта фукнци меняет значение openChoice        

    const dispatch = useDispatch();    

    const filters = useSelector((state) => state.filters);  // {type, minPrice, maxPrice, category}
    console.log('filters from state ', filters)


    const handleChoicesToggle = (index) => {
        // null- закрывает выпадашку:
        setOpenChoice(openChoice === index ? null : index);      // setOpenChoice принимает функцию
    };




    const prevFiltersRef = useRef(filters);             // сохранили текущее состояние filters (даже если в useState(setFilters(filters)) значения filters поменяется, тек состояние не изменится )
    console.log('prevFiltersRef.current ', prevFiltersRef.current);    // {type: 'toys', minPrice: '', maxPrice: '', category: ''}
    
    


    const debounceFetchGoods = useRef(             // хук useRef, когда будет происходить перерендер, фукнуия не будет обновляться
        
        debounce((filters) => {
            dispatch(fetchGoods(filters));
        }, 1000),
    ).current;
 
 

    useEffect(() => {

        console.log('работает useEffect')
        const prevFilters = prevFiltersRef.current;
        const validFilters = getValidFilters(filters);

        if(prevFilters.type !== validFilters.type) {    // сравнение предыдущего и текущего фильтра(если сменили Тип)
            dispatch(fetchGoods(validFilters));
            console.log('типы, вызывался fetchGoods(validFilters) и validFilters ', validFilters )
            const itemFilter = filterTypes.find((item) => item.value === validFilters.type)
            setTitleGoods(itemFilter.title);
        } 
        else{
           
            debounceFetchGoods(validFilters);
            console.log('прайсы, вызывался debounceFetchGoods(filters) и filters ', filters)
        } 

        prevFiltersRef.current = filters;  // обновляем текущий фильтр

    }, [ debounceFetchGoods, filters ]);  // если передаваемый массив пустой, то вызовется коллбэк 1 раз. Если передали еще что то(напрмиер  filters),  то при каждой смене filters будет вызываться коллбэк
    




    //фильтр по смене типа  { target }
    const handleTypeChange = (evt) => {         // либо сразу деструтктруировать объект evt: { target } и тогда  { value } = target
        //  { value } = target  
        const value = evt.target.value;  
        // const newFilters = { ...filters, type: value, minPrice: "", maxPrice: "" }        // у filters заменили значение свойства type type:value
        dispatch(changeType(value)); // редьюсер вызвали, обновили значение перем состояния filters
        setOpenChoice(-1);  // закрываем все фильтры
       
    };
        
    



    // филтр по смене цены   { target }
    const handlePriceChange = (evt) => {         // либо сразу деструтктруировать объект evt: { target } и тогда  { value, name } = target
        
        //console.log('evt.target in handlePriceChange ', evt.target);
        // { value, name } = target
        const value = evt.target.value; 
        const name = evt.target.name;  // name = minPrice  или maxPrice 
        
        //const newFilters = { ...filters, [name]: !isNaN(parseInt(value)) ? value : '' };        // у filters заменили значение 
        
        //console.log('newFilters in handlePriceChange ', newFilters);                    // { type: 'bouquets', minPrice: 2, maxPrice: '', category: '' }
        dispatch(changePrice({ name, value })); //  редьюсер вызвали, обновили значение перем состояния filters
    };



   


    return (
        <section className="filter">
            <h2 className="visually-hidden"> Фильтр </h2>
            
            <div className="container">
                <form className="filter__form">
                    <fieldset className="filter__group">
                        {   filterTypes.map((item)=> (    //       вернет массив коммопнентов <FilterRadio/>: 
                                <FilterRadio key={item.value} handleTypeChange={ handleTypeChange } data={item} type={filters.type}  />
                            ))
                        }
                    </fieldset>

                    <fieldset className="filter__group filter__group--choices">
                        <Choices  buttonLabel="Цена"  isOpen={openChoice === 0}  onToggle={() => { handleChoicesToggle(0) }}>   {/* isOpen и handleToggle это пропсы передаем в компопнент(нзв пропсам заадем какие угодно)  */}           {/* вызываем компонет Choices и  передаем пропс buttonLabel  */}
                            <fieldset className="filter__price">
                                <input className="filter__input-price" type="text" name="minPrice" placeholder="От" value={filters.minPrice}  onChange={ handlePriceChange }  />
                                <input className="filter__input-price" type="text" name="maxPrice" placeholder="До"  value={filters.maxPrice}  onChange={ handlePriceChange }  />
                            </fieldset>
                        </Choices>

                        <Choices  buttonLabel="Тип товара"  className="filter__choices--type"  isOpen={openChoice === 1}  onToggle={() => { handleChoicesToggle(1) }}>  {/* вызываем компонет и  передаем пропсы: buttonLabel  className isOpen handleToggle */}
                            <ul className="filter__type-list">
                                <li className="filter__type-item">
                                    <button className="filter__type-btn" type="button"> Монобукеты </button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-btn" type="button"> Авторские букеты </button>
                                 </li>
                                <li className="filter__type-item">
                                     <button className="filter__type-btn" type="button"> Цветы в коробке </button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-btn" type="button"> Цветы в корзине </button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-btn" type="button"> Цветы из сухоцветов </button>
                                </li> 
                             </ul>
                        </Choices>
                    </fieldset>
                </form>
            </div>
        </section>
   )

};