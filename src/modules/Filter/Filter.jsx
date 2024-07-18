import { Choices } from '../Choices/Choices.jsx';
import './filter.scss';
import { useState } from 'react';




 {/* Компонент  */}
export const Filter = () => {

    // null(выпадашки закрыты) - нач значение поля openChoice(состояние):
    const [ openChoice, setOpenChoice ] = useState(null);  // хук(может принимать что угодно),  вернет массив(поле и  функцию), но мы деструктурируя возьмем только состояние isOpenChoice.  setIsOpenChoice это фукния, нзв ей дали сами. Эта фукнци меняет значение isOpenChoice

    const handleChoicesToggle = (index) => {
        setOpenChoice(openChoice === index ? null : index);      // setOpenChoice принимает функцию
    };

 

    return (
        <section className="filter">
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
                        <Choices buttonLabel="Цена" isOpen={openChoice === 0} handleToggle={() => { handleChoicesToggle(0) }}>   {/* isOpen и handleToggle это проспы передаем в компопнент(нзв пропсам заадем какие угодно)  */}           {/* вызываем компонет Choices и  передаем пропс buttonLabel  */}
                            <fieldset className="filter__price">
                                <input className="filter__input-price" type="text" name="minPrice" placeholder="От" />
                                <input className="filter__input-price" type="text" name="maxPrice" placeholder="До" />
                            </fieldset>
                        </Choices>

                        <Choices buttonLabel="Тип товара" className="filter__choices--type" isOpen={openChoice === 1} handleToggle={() => { handleChoicesToggle(1) }}>  {/* вызываем компонет и  передаем пропсы: buttonLabel  className isOpen handleToggle */}
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
                        </Choices>
                    </fieldset>
                </form>
            </div>
        </section>
   )

};