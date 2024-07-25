import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './goods.scss';
import { fetchGoods } from "../../redux/goodsSlice.js";
import { useEffect } from "react";
import { API_URL } from "../../const.js";




{/* Компонент Goods - список товаров */}
export const Goods = () => {

    // хук вернет объект state, его дестуктурируем, items переимновали в goods, status переименовали в goodsStatus:
    const { items: goods, status: goodsStatus, error } = useSelector((state) => state.goods);   // [{}, {},{}]-товары с сервера
    
    const dispatch = useDispatch();     

    // if(goodsStatus){ // так нельзя делать иначе при каждой смене статуса будет отправка запроса(большая нагрузка на сервер), поэтому используем хук useEffect
       // dispatch(fetchGoods())
    //}

   

    let content = null;

    if(goodsStatus === 'loading'){
        content =  <p>Загрузка товаров</p>;
    }

    if(goodsStatus === 'succeeded'){
        content =  <ul className="goods__list">
                        {  goods.map((item) => (   
                            <li className="goods__item" key={item.id}>          { /* без атрибута key(props) будет ругаться */}
                                                            { /* data={item}  */}
                                <Card className="goods__card"  id={item.id}  photoUrl={`${API_URL}${item.photoUrl}`}  name={item.name}  dateDelivery="сегодня в  14:00"  price={item.price}  />   { /* либо вместо data={item} так: {...item}  - передаем несколько пропсов, data-props */}
                            </li>
                        ))}   
                    </ul>
    }


    if(goodsStatus === 'failed'){
        content =  <p>Ошибка получения товаров {error}</p>;
    }


    return (
        <section className="goods">  
            <div className="container goods__container">
                <div className="goods__box">
                    <h3 className="goods__title"> Цветы </h3>
                    {content}
                </div>

                <Cart />  { /* Корзина */}
            </div>
        </section>
    )
};