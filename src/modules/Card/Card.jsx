import classNames from 'classnames'; // npm пакет постаили: npm i classnames
import './card.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice.js';
import { API_URL } from '../../const.js';



{/*Компонент card  карточка товара */}

export const Card = ({ className, id, photoUrl, name, dateDelivery, price }) => { // data деструктурировли, первая {} от пропсов


    const dispatch = useDispatch();


    const handlerAddToCart = () => {
        dispatch(addItemToCart({ id, photoUrl, name, price, dateDelivery }));
    };





    return (
        //                 либо  `${className} card`
        <article className={classNames(className, "card")}>   {/* если передали  className, то вставит */} 
            <img className="card__image" src={photoUrl} alt={name} />
            <div className="card__content">
                <h3 className="card__title"> {name} </h3>
                <div className="card__footer">
                    <p className="card__date-delivery"> {dateDelivery} </p>
                    <button className="card__button" onClick={handlerAddToCart}> {price}&nbsp;₽
                        {/* <span className="card__price"> {price}&nbsp;₽ </span> */}
                        {/* <span className="card__button-text" onClick={handlerAddToCart}> В &nbsp;корзину </span> */}
                    </button>
                </div>
            </div>
        </article>
    )
}