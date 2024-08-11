import { useDispatch } from 'react-redux';
import './header.scss';
import { toggleCart } from '../../redux/cartSlice.js';
import { useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice.js';
import { useEffect, useState } from 'react';




{/* Компонент Header */}
export const Header = ({ setTitleGoods }) => { 

    const dispatch = useDispatch(); // сообщает что нужно произвести опр действия
    const itemsCart = useSelector((state) => state.cart.items);  // список товаров Корзины
    // завели перменную состония:
    const [ searchValue, setSearchValue ] = useState('');


    const handlerCartToggle = () => {
        dispatch(toggleCart());
    };


    const handleSubmit = (evt) => { // отправка формы поиска
        evt.preventDefault();
        dispatch(fetchGoods({ search: searchValue })); // запрос поиска 
        setTitleGoods(`Результат поиска:`);
        // evt.target.reset(); очистка офрмы
        //useEffect(()=>{
                // найти элемент к котрому скроллим()
        //}, [])
    };
    



    return (
        <header className="header">   
            <div className="container header__container">
             {/* форма поиска:  */}
                <form className="header__form" onSubmit={handleSubmit}>     {/* при нажатии на отправку вызовется handleSubmit() */}        
                    <input className="header__input" type="search"  name="search"  placeholder="Букет из роз"  value={searchValue}  onChange={(evt) => { setSearchValue(evt.target.value) }}  />    {/* в onChange меняется значение searchValue  */}
                    <button className="header__search-button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07"
                            stroke="white" />
                        </svg>
                    </button>
                </form>

                <img className="header__logo" width="200" height="65" src="/img/logo.svg" alt="Логотип магазина букетов Mirano" />  {/*  отсчет от папки public:  */}
                                                {/* () => { dispatch(toggleCart) } */}
                <button className="header__cart-btn" onClick={handlerCartToggle}> { itemsCart.length } </button>
            </div>
        </header>
    )
};