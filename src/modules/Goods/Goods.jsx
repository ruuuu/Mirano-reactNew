import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import './goods.scss';


{/* Компонент Goods - список товаров */}
export const Goods = () => {

    return (

        <section className="goods">  
            <div className="container goods__container">
                <div className="goods__box">
                    <h3 className="goods__title"> Цветы </h3>

                    <ul className="goods__list">
                        { goodsArray.map((item) => (  
                            <li className="goods__item" key={item.id}>          { /* без атрибута key(props) будет ругаться */}
                                <Card className="goods__card" data={item}  />   { /* либо вместо data={item} так: {...item}  - пердаем несколько пропсов, data-props */}
                            </li>
                        ))}   
                    </ul>
                </div>

                <Cart />  { /* Корзина */}
            </div>
        </section>
    )
};