import { Footer } from "../modules/Footer/Footer";  // импорт Footer.jsx
import { Goods } from "../modules/Goods/Goods";
import { Header } from "../modules/Header/Header";


export const App = () => {

    return (
    //пустые <> </>  это React.Fragment, можно не писать  его и отсавить пустыми <></>
    <>  
        <Header />

        <main>
            <section className="hero">  {/* Компонент */}
                <div className="container">
                    <div className="hero__head-group">
                        <h1 className="hero__title"> Авторские букеты </h1>
                        <p className="hero__subtitle"> и подарки </p>
                    </div>

                    <figure className="hero__group-image">
                        <picture className="hero__image hero__image--left">
                        {/*  srcset в реакте будет как srcSet: */}
                            <source srcSet="/img/flower-left@1x.avif 1x, /img/flower-left@2x.avif 2x" type="image/avif" />
                            {/*  для DPR:2.0  загрузится 2x, для обычных экранов 1x, avif легче чем webp */}
                            <source srcSet="/img/flower-left@1x.webp 1x, /img/flower-left@2x.webp 2x" type="image/webp" />
                            <img src="/img/flower-left@1x.jpg" srcSet="/img/flower-left@2x.jpg 2x" width="284" height="352"
                            alt="Букет маков" />
                        </picture>

                        <svg className="hero__image hero__image--center" role="img" aria-label="розовые розы и пионы" width="680"
                            height="588" viewBox="0 0 680 588" fill="none" xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice">
                            {/*  добавили preserveAspectRatio="xMidYMid slice" типа background-size: cover 
                             Добавили aria-label и role="img". Для очищения лишних элементов у svg, используем https://svgomg.net/    */}
                            <clipPath id="hero">
                                <path
                                d="M680 112.187C680 137.954 653.568 161.688 609.146 180.61C653.568 211.682 680 250.658 680 292.973C680 335.869 652.836 375.335 607.304 406.613C652.836 425.66 680 449.692 680 475.813C680 537.649 527.777 587.776 340 587.776C152.223 587.776 0 537.649 0 475.813C0 449.692 27.1636 425.66 72.6961 406.613C27.1636 375.335 0 335.869 0 292.973C0 250.658 26.4319 211.682 70.854 180.61C26.4319 161.688 0 137.954 0 112.187C0 50.3515 152.223 0.223633 340 0.223633C527.777 0.223633 680 50.3515 680 112.187Z"
                                fill="#D9D9D9" />
                            </clipPath>

                           <foreignObject clipPath="url(#hero)" width="100%" height="100%">  {/*  clippath id="hero"  в реакте clip-path пишется слитно */}
                                <div className="hero__image-center"> </div>
                            </foreignObject>

                            <image xlink:href="/img/flower-center@1x.jpg" clipPath="url(#hero)" preserveAspectRatio="xMidYMid slice" />
                        </svg>


                        <picture className="hero__image hero__image--right">
                            <source srcSet="/img/flower-right@1x.avif 1x, /img/flower-right@2x.avif 2x" type="image/avif" />
                            <source srcSet="/img/flower-right@1x.webp 1x, /img/flower-right@2x.webp 2x" type="image/webp" />
                            <img src="/img/flower-right@1x.jpg" srcSet="/img/flower-right@2x.jpg 2x" width="284" height="352"
                            alt="Букет пионов" />
                        </picture>
                    </figure>
                </div>
            </section>

            <section className="filter"> {/* Компонент  */}
                <h2 className="visually-hidden"> Фильтр </h2>
                <div className="container">
                    <form className="filter__form">
                        <fieldset className="filter__group">
                            <input className="filter__radio" type="radio" name="type" id="bouquets" value="bouquets" defaultChecked />
                            <label className="filter__label filter__label--flower" htmlFor="bouquets"> Цветы </label>   {/* вместо for в реакте пишем htmlFor: */}

                            <input className="filter__radio" type="radio" name="type" id="toys" value="toys" />
                            <label className="filter__label filter__label--toy" htmlFor="toys"> Игрушки </label>

                            <input className="filter__radio" type="radio" name="type" id="postcards" value="postcards" />
                            <label className="filter__label filter__label--card" htmlFor="postcards"> Открытки </label>
                        </fieldset>

                        <fieldset className="filter__group filter__group--choices">
                            <div className="filter__choices choices">
                                <button className="filter__select choices__btn" type="button"> Цена </button>
                                {/*  без type="button" будет работать как type="submit", будет перезгрузка станицы  */}
                                <div className="choices__box filter__choices-box">
                                    <div className="filter__price">
                                        <input className="filter__input-price" type="text" name="minPrice" placeholder="От" />
                                        <input className="filter__input-price" type="text" name="maxPrice" placeholder="До" />
                                    </div>
                                </div>
                            </div>

                            <div className="filter__choices filter__choices--type choices">
                                <button className="filter__select choices__btn" type="button"> Тип товара </button>
                                <div className="choices__box filter__choices-box filter__choices-box--type">
                                    <ul className="filter__type-list">
                                        <li className="filter__type-item">
                                            <button className="filter__type-btn" type="button"> Монобукеты </button>
                                        </li>
                                        <li className="filter__type-item">
                                            <button className="filter__type-btn" type="button"> Авторские букеты </button>
                                        </li>
                                        <li className="filter__type-item">
                                            <button className="filter__type-btn" type="button"> Цветы в коробке </button>
                                        </li>
                                        <li className="filter__type-item">
                                            <button className="filter__type-btn" type="button"> Цветы в корзине </button>
                                        </li>
                                        <li className="filter__type-item">
                                            <button className="filter__type-btn" type="button"> Цветы из сухоцветов </button>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </section>

            <Goods /> 

            <section className="subscribe">  {/* Компонент */}
                <div className="container subscribe__container">
                    <h2 className="subscribe__title">Подпишись на&nbsp;рассылку</h2>

                    <form className="subscribe__form">
                        <input className="subscribe__input" type="email" name="email" placeholder="Email" />
                        <button className="subscribe__search-button">
                            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M0.166687 6.66667C0.78502 6.66667 1.70835 6.05583 2.48335 5.4375C3.48335 4.6425 4.35585 3.6925 5.02169 2.60333C5.52085 1.78667 6.00002 0.796667 6.00002 0M6.00002 0C6.00002 0.796667 6.47919 1.7875 6.97835 2.60333C7.64502 3.6925 8.51752 4.6425 9.51585 5.4375C10.2917 6.05583 11.2167 6.66667 11.8334 6.66667M6.00002 0V20"
                                stroke="white" />
                            </svg>
                        </button>
                    </form>
                </div>
            </section>
        </main> 

       <Footer />    {/*  вызов компонента Footer */}

        {/*  мод окно заказа: */}
        <div className="order" style={{     
            display: 'none', 
            }}>             {/* overlay */}
            <div className="order__wrapper">    {/* мод окно для заказа:  */}
                <h2 className="order__title"> Оформить заказ </h2> 

                <form className="order__form" id="order">   {/* id= нужен для связки фрмы и кноп Отправить: */}
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
                            {/* атрибут for не нужен тк поле внутри label: */}
                            <label className="order__label-radio"> 
                                <input className="order__radio" type="radio" name="payment-online" value="true" defaultChecked /> Оплата онлайн  {/* вместо cheked=true пишем defaultChecked */}
                            </label>
                        </div> 

                        <div className="order__delivery">
                            <label for="delivery">Доставка завтра</label>
                            <input type="hidden" name="delivery-date" value="10.05" /> {/* скрытое поле:  */}

                            <div className="order__select-wrapper">
                                <select className="order__select" name="delivery-time" id="delivery">  {/* id такое же что и у <label for="delivery">Доставка завтра</label>  */}
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
                    <button className="order__button" type="submit" form="order"> Заказать </button>  {/* у атрибута form значение такое же чтои  у form.id, тогда при нажатии на Заказать,форма отправится:*/}
                </div>
            </div> 

            <button className="order__close" type="button">&times;</button> 
        </div>
    </>
    )
}

