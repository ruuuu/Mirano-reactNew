import './cartItem.scss';



export const CartItem = ({ data: { photoUrl, name, price, count} }) => {  // деструкрировали item


    return (

        <li className="cart__item">
            <img className="cart__image" src={photoUrl} alt={name} />

            <h4 className="cart__item-title"> {name} </h4>

            <div className="cart__counter">
                <button> + </button>
                <input className="cart__counter-input" type="number" min="0" max="99" /> {count}
                <button> - </button>
            </div>

            <p className="cart__price"> {price}&nbsp;₽ </p>
        </li>
    )
};