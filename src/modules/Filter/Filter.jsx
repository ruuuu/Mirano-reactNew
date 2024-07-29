import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { useSelector } from 'react-redux';
import { getValidFilters } from '../../utils.js';




 {/* Компонент  */}
export const Filter = () => {

    // завели переменную состояния openChoice.  null(выпадашки закрыты) - нач значение состония openChoice:
    const [ openChoice, setOpenChoice ] = useState(null);  // хук(может принимать что угодно),  вернет массив(поле и  функцию), но мы деструктурируя возьмем только состояние isOpenChoice.  setIsOpenChoice это фукния, нзв ей дали сами. Эта фукнци меняет значение openChoice        

    const dispatch = useDispatch();    

    //const { status: goodsStatus, error } = useSelector((state) => state.goods); 


    const handleChoicesToggle = (index) => {
        // null- закрывает выпадашку:
        setOpenChoice(openChoice === index ? null : index);      // setOpenChoice принимает функцию
    };


    const [ filters, setFilters ] = useState({  // завели перменную  состояния filters(объект)
        type: "bouquets",
        minPrice: "", 
        maxPrice: "",
        category: ""
    });



//                          { target }
    const handleTypeChange = (evt) => {         // либо сразу деструтктруировать объект evt: { target } и тогда  { value } = target
//      { value } = target  
        const value = evt.target.value;  
        const newFilters = { ...filters, type: value, minPrice: "", maxPrice: "" }        // у filters заменили значение свойства type type:value

        setFilters(newFilters); // обновили значение перем состояния filters
        setOpenChoice(null);
    };



//                          { target }
    const handlePriceChange = (evt) => {         // либо сразу деструтктруировать объект evt: { target } и тогда  { value, name } = target
        
        console.log('evt.target in handlePriceChange ', evt.target);
//      { value, name } = target
        const value = evt.target.value; 
        const name = evt.target.name;   
        
        const newFilters = { ...filters, [name]: value ? parseInt(value) : '' };        // у filters заменили значение 
        
        console.log('newFilters in handlePriceChange ', newFilters);                    // { type: 'bouquets', minPrice: 2, maxPrice: '', category: '' }
        setFilters(newFilters); // обновили значение перем состояния filters
    };
 
 

    useEffect(() => {
        const validFilters = getValidFilters(filters);
       // console.log('validFilters ', validFilters)
        dispatch(fetchGoods(validFilters));
    }, [ dispatch, filters ]);  // если передаваемый массив пустой, то вызовется коллбэк 1 раз. Если передали еще что то(напрмиер  filters),  то при каждой смене filters будет вызываться коллбэк
    


    return (
        <section className="filter">
            <h2 className="visually-hidden"> Фильтр </h2>
            
            <div className="container">
                <form className="filter__form">
                    <fieldset className="filter__group">
                        <input className="filter__radio" type="radio" name="type" id="bouquets" value="bouquets"  checked={filters.type === "bouquets"}  onChange={ handleTypeChange } /> {/*  defaultChecked */}
                        <label className="filter__label filter__label--flower" htmlFor="bouquets"> Цветы </label>   {/* вместо for в реакте пишем htmlFor: */}

                        <input className="filter__radio" type="radio" name="type" id="toys" value="toys"  checked={filters.type === "toys"}  onChange={ handleTypeChange } />
                        <label className="filter__label filter__label--toy" htmlFor="toys"> Игрушки </label>

                        <input className="filter__radio" type="radio" name="type" id="postcards" value="postcards"  checked={filters.type === "postcards"}  onChange={ handleTypeChange }  />
                        <label className="filter__label filter__label--card" htmlFor="postcards"> Открытки </label>
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