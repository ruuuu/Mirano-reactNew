import './cartItem.scss';
import { API_URL } from '../../const.js';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice.js';
import { useState } from 'react';
import { debounce } from '../../utils.js';




export const CartItem = ({ data: { id, photoUrl, name, price, quantity } }) => {  // деструкрировали item

    const dispatch = useDispatch();

    //заводим перем состояния:
    const [ inputQuantity, setinputQuantity ] = useState(quantity);


    const debounceInputChange = debounce((newQuantity) => { // чтобы на каждую введенную цифру не уходил запрос на сервер
        dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
    }, 500);


    const handleInputChange = (evt) => { // ввели в поле значнеие

        const newQuantity = parseInt(evt.target.value);
        setinputQuantity(newQuantity); // inputQuantity = newQuantity
        debounceInputChange(newQuantity);
    };



    const handleDecrement = () => {

        const newQuantity = inputQuantity - 1;
        setinputQuantity(newQuantity);
        dispatch(addItemToCart({ productId: id, quantity: newQuantity })); 
    };


    const handleIncrement = () => {

        const newQuantity = inputQuantity + 1;
        setinputQuantity(newQuantity);
        dispatch(addItemToCart({ productId: id, quantity: newQuantity })); 
    };  



    return (

        <li className="cart__item">
            <img className="cart__image" src={`${API_URL}${photoUrl}`} alt={name} />

            <h4 className="cart__item-title"> {name} </h4>

            <div className="cart__counter">
                <button onClick={handleDecrement} > - </button>         {/*  если бы нужно был быпрелатьва в фукнцию параметры то onClick={()=> handleDecrement(-1)}   */}
                <input className="cart__counter-input" type="number" min="0" max="99"  onChange={handleInputChange}  value={inputQuantity} />  {/* при вводе в поле срабоатет onChange  */}
                <button onClick={handleIncrement} > + </button>
            </div>

            <p className="cart__price"> {price * inputQuantity}&nbsp;₽ </p>
        </li>
    )
};