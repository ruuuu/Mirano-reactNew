import './cart.scss';
import { useEffect, useRef } from 'react';
import { CartItem } from '../CartItem/CartItem.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/cartSlice.js';
import { openModal } from '../../redux/orderSlice.js';




{/* Компонент  Корзина */}
export const Cart = () => {  

    const dispatch = useDispatch();

    const isOpen = useSelector((state) => {
        return state.cart.isOpen; // Корзина открыта
    });

    const items = useSelector((state) => state.cart.items);  // список товаров Корзины [{ id, photoUrl, name, price, quantity }, {}]

    const cartRef = useRef(null); // хук, нужен для скролла к элементу


    useEffect(() => {
        if(isOpen){
            cartRef.current.scrollIntoView({ behavior: 'smooth' }); // скролл к cartRef.current(корзина)
        }
    }, [ isOpen ]);  // при каждом изменении isOpen бдет вызываьс переданная функция


    if(!isOpen){
        return null;
    }


   
    const handlerCartClose = () => {
        dispatch(toggleCart());
    };


    const handlerOpenOrder = () => {
        dispatch(openModal());          // окно формы заказа
    };




    return (
        <section className="cart cart--open" ref={cartRef}>             {/* ref значит скролл к этому элементу */}
            <div className="cart__container">
                <div className="cart__header">
                    <h3 className="cart__title"> Ваш заказ </h3>
                    <button className="cart__close" onClick={handlerCartClose}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5.70715" width="1" height="25" transform="rotate(-45 5 5.70715)" fill="currentColor" />
                            <rect x="22.6777" y="5" width="1" height="25" transform="rotate(45 22.6777 5)" fill="currentColor" />  {/*  задали fill: currentColor чтоы управлять цвтом в scss  */}
                        </svg>
                    </button>
                </div>

                <p className="cart__date-delivery"> сегодня&nbsp;в&nbsp;14:00 </p>

                <ul className="cart__list">
                    {   items.map((item) => (  // вернет массив <CartItem>
                            <CartItem  key={item.id}  data={item} />
                        ))
                    }  
                </ul>

                <div className="cart__footer">
                    <button className="cart__order-btn"  onClick={handlerOpenOrder}  disabled={!items.length}> Оформить </button>
                    <p className="cart__price cart__price--total"> 
                        {
                            items.reduce((acc, item) => {
                               return acc+= item.quantity * item.price
                        }, 0) }&nbsp;₽ 
                    </p>
                </div>
            </div>
        </section>
    )
}