import './cart.scss';
import { CartItem } from '../CartItem/CartItem.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/cartSlice.js';
import { openModal } from '../../redux/orderSlice.js';



{/* Компонент  Корзина */}
export const Cart = () => {  

    const dispatch = useDispatch();

    const isOpen = useSelector((state) => {
        return state.cart.isOpen;
    });

    const items = useSelector((state) => state.cart.items);  // список товаров Корзины

    if(!isOpen){
        return null;
    }


    

    const handlerCartClose = () => {
        dispatch(toggleCart());
    };


    const handlerOpenOrder = () => {
        dispatch(openModal());
    };




    return (
        <section className="cart cart--open"> 
            <div class="cart__container">
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
                    {  items.map((item) => (  
                            <CartItem  key={item.id} data={item} />
                        ))
                    }  
                </ul>

                <div className="cart__footer">
                    <button className="cart__order-btn" onClick={handlerOpenOrder}> Оформить </button>
                    <p className="cart__price cart__price--total"> 3000&nbsp;₽ </p>
                </div>
            </div>
        </section>
    )
}