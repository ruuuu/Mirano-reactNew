import classNames from 'classnames'; // npm пакет постаили: npm i classnames
import './card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, toggleCart } from '../../redux/cartSlice.js';
import { API_URL } from '../../const.js';
import { useState } from "react";




{/*Компонент card  карточка товара */}
export const Card = ({ className,  id, photoUrl, name, dateDelivery, price }) => { // data деструктурировли, первая {} от пропсов


    const dispatch = useDispatch();
    const isOpenCart = useSelector((state)=> state.cart.isOpen)


    const handlerAddToCart = () => {
       
        dispatch(addItemToCart({ productId:id })); // добаивли товар в корзину   id, photoUrl, name, price, dateDelivery
        if(!isOpenCart){
            toggleCart();
        }
    };


    
    const [ hidden, setHidden ] = useState(true); // hidden- завели перменную стейта 


    return (
        //                 либо  `${className} card`
        <article className={classNames(className, "card")}>   {/* если передали  className, то вставит */} 
            <img className="card__image" src={photoUrl} alt={name} />
            <div className="card__content">
                <h3 className="card__title"> {name} </h3>
                <div className="card__footer">
                    <p className="card__date-delivery"> {dateDelivery} </p>
                     {/* onMouseEnter-наведение мыши */} 
                    <button className="card__button" onClick={handlerAddToCart}  onMouseEnter={() => setHidden(false)}  onMouseLeave={() => setHidden(true)}  > 
                        { hidden ?  <span className="card__price"> {price}&nbsp;₽ </span> : <span className="card__button-text"  onClick={handlerAddToCart}> В &nbsp;корзину </span> }
                    </button>
                </div>
            </div>
        </article>
    )
}