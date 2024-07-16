import './cartItem.scss';



export const CartItem = ({ data: {img, title, price} }) => {

    return (

        <li className="cart__item">
            <img className="cart__image" src={img} alt={title} />

            <h4 className="cart__item-title"> {title} </h4>

            <div className="cart__counter">
                <button> + </button>
                <input className="cart__counter-input" type="number" min="0" max="99" />
                <button> - </button>
            </div>

            <p className="cart__price"> {price}&nbsp;₽ </p>
        </li>
    )
};