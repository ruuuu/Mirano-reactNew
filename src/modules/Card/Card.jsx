import classNames from 'classnames'; // npm пакет постаили: npm i classnames
import './card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, toggleCart } from '../../redux/cartSlice.js';
import { useState } from "react";




{/*Компонент Card  карточка товара */}
export const Card = ({ className,  id, photoUrl, name, dateDelivery, price }) => { // data деструктурировли, первая {} от пропсов

    const dispatch = useDispatch();
    const isOpenCart = useSelector((state) => state.cart.isOpen);
    // buttonText- завели перменную состояния:
    const [ buttonText, setButtonText ] = useState(`${price}₽`); 


    const handlerAddToCart = () => {
       
        dispatch(addItemToCart({ productId: id })); // добаивли товар в корзину   id, photoUrl, name, price, dateDelivery
        if(!isOpenCart){
            dispatch(toggleCart()); // вызов редьюсера
        }
    };


    const handleMouseEnter = () => {
        setButtonText("в корзину"); // поменяли значение  перем buttonText="в корзину"
    };
    
    const handleMouseLeave = () => {
        setButtonText(`${price}₽`); // поменяли значение  перем buttonText=${price}\u00A0₽
    };

    
    return (
        //                 либо  `${className} card`
        <article className={classNames(className, "card")}>   {/* если передали  className, то вставит */} 
            <img className="card__image" src={photoUrl} alt={name} />
            <div className="card__content">
                <h3 className="card__title"> {name} </h3>
                <div className="card__footer">
                    <p className="card__date-delivery"> {dateDelivery} </p>
                     {/* onMouseEnter-наведение мыши */} 
                    <button className="card__button" onClick={handlerAddToCart}  onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave} >  {/* при наведение мыши вызовется handleMouseEnter */} 
                        {buttonText}
                        {/* { hidden ?  <span className="card__price"> {price}&nbsp;₽ </span> : <span className="card__button-text"  onClick={handlerAddToCart}> В &nbsp;корзину </span> } */}
                    </button>
                </div>
            </div>
        </article>
    )
}