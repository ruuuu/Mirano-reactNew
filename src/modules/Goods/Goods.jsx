//import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './goods.scss';
import { fetchGoods } from "../../redux/goodsSlice.js";
import { useEffect } from "react";




{/* Компонент Goods - список товаров */}
export const Goods = () => {

     

    // хук вернет объект state, его дестуктурируем, items переимновали в goods, status переименовали в goodsStatus:
    const { items: goods, status: goodsStatus, error } = useSelector((state) => state.goods);   // [{}, {},{}]-товары с сервера
    
    const dispatch = useDispatch();     

    // if(goodsStatus){ // так нельзя делать иначе при каждой смене статуса будет отправка запроса(большая нагрузка на сервер) испроьзем хук useEffect
       // dispatch(fetchGoods())
    //}

    useEffect(() => {

        if(goodsStatus === 'idle'){ 
            dispatch(fetchGoods());
        }
    }, [ dispatch, goodsStatus ]);  // если пустой массив, то вызовется коллбэк 1 раз. Если передли еще что то,  то при каждой смене goodsStatus бдет вызываться коллбэк





    return (
        <section className="goods">  
            <div className="container goods__container">
                <div className="goods__box">
                    <h3 className="goods__title"> Цветы </h3>

                    <ul className="goods__list">
                        {  goods.map((item) => (   
                            <li className="goods__item" key={item.id}>          { /* без атрибута key(props) будет ругаться */}
                                <Card className="goods__card" data={item}  />   { /* либо вместо data={item} так: {...item}  - передаем несколько пропсов, data-props */}
                            </li>
                        ))}   
                    </ul>
                </div>

                <Cart />  { /* Корзина */}
            </div>
        </section>
    )
};