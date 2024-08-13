import './cartItem.scss';
import { API_URL } from '../../const.js';



export const CartItem = ({ data: { photoUrl, name, price, quantity } }) => {  // деструкрировали item


    return (

        <li className="cart__item">
            <img className="cart__image" src={`${API_URL}${photoUrl}`} alt={name} />

            <h4 className="cart__item-title"> {name} </h4>

            <div className="cart__counter">
                <button> + </button>
                <input className="cart__counter-input" type="number" min="0" max="99" /> {quantity}
                <button> - </button>
            </div>

            <p className="cart__price"> {price}&nbsp;₽ </p>
        </li>
    )
};