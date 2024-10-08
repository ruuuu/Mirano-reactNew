import './order.scss';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, sendOrder } from '../../redux/orderSlice.js';
import { useEffect } from 'react';
import { updateOrderData } from '../../redux/orderSlice.js';




 {/*  мод окно заказа: */}
export const Order = () => {

    const dispatch = useDispatch();
    
    const orderId = useSelector((state) => state.order.orderId);
    const orderData = useSelector((state) => state.order.data);
    console.log('orderData in Order.jsx ', orderData)
    const itemsCart = useSelector((state) => state.cart.items);  // список товаров Корзины [{ id, photoUrl, name, price, quantity }, {}]
    const isOpenModal = useSelector((state) => state.order.isOpenModal);
    // либо так написать дестуктрируя:
    // const { isOpenModal } = useSelector((state) => { 
    //     return state.order;
    // });

    

    // const handlerCloseOrder = () => {
    //     dispatch(closeModal());
    // };

    // либо так:
    const handlerCloseOrder = (evt) => {
        // evt.target.classList.matches('.order) 
        // либо:
       if(evt.target.classList.contains('order') || evt.target.closest('.order__close')){
            dispatch(closeModal());
       } 
    };


    const handleChange = (evt) => { // ввод  данных  в поля формы заказа
        console.log('ввожу в поле ', evt.target)
        const { name, value } = evt.target;                  // деструткирировали, evt.target это <input name="" value="">
        console.log('name, value ', name, value)
        dispatch(updateOrderData({ [name]: value, }),
        );        // [name] значит что туда заносится значение  атрибута name
    };


    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(sendOrder()); // отправка заказ на сервер
    };


    useEffect(() => {

        const handleEscape = (evt) => {
            if(evt.key === 'Escape'){
                handlerCloseOrder();
            }
        };

        if(isOpenModal){
            document.addEventListener('keydown', handleEscape); // по нажатию на esc
        }

        return () => {
            document.removeEventListener('keydown', handleEscape); // снимаем обработчик
        };
    }, [ isOpenModal, handlerCloseOrder]);


    if(!isOpenModal){
        return null; // модалка закрыта
    }

   
   


    return (
        <div className="order" onClick={handlerCloseOrder}>     {/* оверлей, style={{  display: 'none', }} */}            
            <div className="order__wrapper">   {/* сама модалка формы заказа */}  
                { orderId ? 
                    (
                        <>
                            <h2 className="order__title"> Заказ офорлмен </h2> 
                            <p className="order__id"> Номер ваего заказа: {orderId} </p>  
                        </>
                    ) : 
                    (
                        <>
                            <h2 className="order__title"> Оформить заказ </h2> 

                            <form className="order__form" id="order" onSubmit={handleSubmit}>       {/* id= нужен для связки фрмы и кноп Отправить: */}
                                <fieldset className="order__fieldset">
                                        <legend className="order__legend"> Данные заказчика </legend>
                                        <div className="order__input-group">
                                            <input className="order__input" type="text" name="buyerName" placeholder="Имя" value={orderData.buyerName}  onChange={handleChange} required />   {/* при вводе текста в поле, сработает onChange. */}
                                            <input className="order__input" type="text" name="buyerPhone" value={orderData.buyerPhone}  placeholder="Телефон" onChange={handleChange} required />
                                        </div>
                                </fieldset> 

                                <fieldset className="order__fieldset">
                                        <legend className="order__legend"> Данные получателя </legend>
                                        <div className="order__input-group">
                                            <input className="order__input" type="text" name="recipientName" value={orderData.recipientName} placeholder="Имя" onChange={handleChange} required />
                                            <input className="order__input" type="text" name="recipientPhone" value={orderData.recipientPhone} placeholder="Телефон" onChange={handleChange}  required />
                                        </div>
                                </fieldset> 

                                <fieldset className="order__fieldset">
                                    <legend className="order__legend"> Адрес </legend>
                                    <div className="order__input-group">
                                        <input className="order__input" type="text" name="street" placeholder="Улица" onChange={handleChange} required />
                                        <input className="order__input order__input--min" type="number" name="house" value={orderData.house} placeholder="Дом" onChange={handleChange} required />
                                        <input className="order__input order__input--min" type="number" name="apartment" value={orderData.apartment} placeholder="Квартира" onChange={handleChange} required />
                                    </div>
                                </fieldset> 

                                <fieldset className="order__fieldset"> 
                                    <div className="order__payment">
                                        <label className="order__label-radio">          {/* атрибут for не нужен тк поле внутри label: */}
                                            <input className="order__radio" type="radio" name="paymentOnline" value={orderData.paymentOnline === "true"}  onChange={handleChange}  defaultChecked /> Оплата онлайн  {/* вместо cheked=true пишем defaultChecked */}
                                        </label>
                                    </div> 

                                    <div className="order__delivery">
                                        <label htmlFor="delivery"> Дата доставки </label>  {/* вместо атрбиута for ставим  htmlFor  */}
                                        <input className="order__input" type="date" name="deliveryDate" value={orderData.deliveryDate}  onChange={handleChange} />  {/* скрытое поле:  */}

                                        <div className="order__select-wrapper">
                                            <select className="order__select" name="deliveryTime" value={orderData.deliveryTime} id="delivery" onChange={handleChange} required>   {/* id такое же что и у <label for="delivery">Доставка завтра</label>  */}
                                                <option value="9-12">с 9:00 до 12:00</option>
                                                <option value="12-15">с 12:00 до 15:00</option>
                                                <option value="15-18">с 15:00 до 18:00</option>
                                                <option value="18-21">с 18:00 до 21:00</option> 
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                            </form> 

                            <div className="order__footer">
                                <p className="order__total-price"> 
                                    {
                                        itemsCart.reduce((acc, item) => {
                                            return acc+= item.quantity * item.price
                                    }, 0) }&nbsp;₽ 
                                </p> 
                                <button className="order__button" type="submit" form="order"> Заказать </button>     {/* у атрибута form значение такое же чтои  у form.id, тогда при нажатии на Заказать,форма отправится:*/}
                            </div>
                        </> 
                    )
                } 
            </div>

            <button className="order__close" type="button"> &times; </button>  {   /* не вешаем обработчик клика, обработчик от .order передастся сюда(делегирование события) */}  
        </div>
        ) 
};