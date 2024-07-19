import './order.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/orderSlice.js';




 {/*  мод окно заказа: */}
export const Order = () => {

    const isOrderReady = false; // если еще заказа нет
   

    const isOpenModal = useSelector((state) => { 
        return state.order.isOpenModal;
    });

    // либо так написать дестуктрируя:
    // const { isOpenModal } = useSelector((state) => { 
    //     return state.order;
    // });

    if(!isOpenModal){
        return null; // модалка закрыта
    }


    const dispatch = useDispatch();

    //  либо так:
    // const handlerCloseOrder = () => {
    //     dispatch(closeModal());
    // };

    // либо так:
    const handlerCloseOrder = (evt) => {
        // evt.target.classList.matches('.order) либо:
       if(evt.target.classList.contains('order') || evt.target.closest('.order__close')){
            dispatch(closeModal());
       } 
    };

    return (
        <div className="order" onClick={handlerCloseOrder}>     {/* оверлей, style={{  display: 'none', }} */}            
            <div className="order__wrapper">   {/* сама модалка */}  
                { isOrderReady ?
                    <>
                        <h2 className="order__title"> Заказ офорлмен </h2> 
                        <p className="order__id">Номер ваего заказа: ea86a02a-2c10-4b48-9f11-c5145ba3e67e </p>  
                    </>
                    : 
                    <>
                        <h2 className="order__title"> Оформить заказ </h2> 

                        <form className="order__form" id="order">       {/* id= нужен для связки фрмы и кноп Отправить: */}
                            <fieldset className="order__fieldset">
                                <legend className="order__legend">Данные заказчика</legend>
                                <div className="order__input-group">
                                    <input className="order__input" type="text" name="name-buyer" placeholder="Имя" />
                                    <input className="order__input" type="tel" name="phone-buyer" placeholder="Телефон" />
                                </div>
                            </fieldset> 

                            <fieldset className="order__fieldset">
                                <legend className="order__legend">Данные получателя</legend>
                                <div className="order__input-group">
                                    <input className="order__input" type="text" name="name-recipient" placeholder="Имя" />
                                    <input className="order__input" type="tel" name="phone-recipient" placeholder="Телефон" />
                                </div>
                            </fieldset> 

                            <fieldset className="order__fieldset">
                                <legend className="order__legend">Адрес</legend>
                                <div className="order__input-group">
                                    <input className="order__input" type="text" name="street" placeholder="Улица" />
                                    <input className="order__input order__input--min" type="number" name="house" placeholder="Дом" />
                                    <input className="order__input order__input--min" type="number" name="apartment" placeholder="Квартира" />
                                </div>
                            </fieldset> 

                            <fieldset className="order__fieldset"> 
                                <div className="order__payment">
                                    <label className="order__label-radio">          {/* атрибут for не нужен тк поле внутри label: */}
                                        <input className="order__radio" type="radio" name="payment-online" value="true" defaultChecked /> Оплата онлайн  {/* вместо cheked=true пишем defaultChecked */}
                                    </label>
                                </div> 

                                <div className="order__delivery">
                                    <label htmlFor="delivery">Доставка завтра</label>  {/* вместо атрбиута for ставим  htmlFor  */}
                                    <input type="hidden" name="delivery-date" value="10.05" />  {/* скрытое поле:  */}

                                    <div className="order__select-wrapper">
                                        <select className="order__select" name="delivery-time" id="delivery">   {/* id такое же что и у <label for="delivery">Доставка завтра</label>  */}
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
                            <p className="order__total-price">90000 Р</p> 
                            <button className="order__button" type="submit" form="order"> Заказать </button>     {/* у атрибута form значение такое же чтои  у form.id, тогда при нажатии на Заказать,форма отправится:*/}
                        </div>
                    </>
                } 
            </div>

            <button className="order__close" type="button">&times;</button>  {   /* не вешаем обработчик клика, обработчик от .order передастся сюда(делегирование события) */}  
        </div>
        ) 
};