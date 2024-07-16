import classNames from 'classnames';
import './choices.scss';
import { useState } from 'react';


// выпадающий список
export const Choices = ( { children, buttonLabel, className } ) => {  //  children, buttonLabel  это пропсы
  
  // false(выпадашки закрыты) - нач значение поля isOpen(состояние):
  const [ isOpen, setIsOpen ] = useState(false);  // хук(может принимать что угодно),  вернет массив(поле и  функцию), но мы деструктурируя возьмем только состояние isOpen.  setIsOpen это фукния, нзв ей дали сами. Эта фукнци меняет значение isOpen

  const handleToggle = () => {
    setIsOpen((oldIsOpen) => !isOpen); // setIsOpen принмиает фукнцию
  };


  return (
      <div className={classNames("choices", className)}>
        <button className="choices__btn" type="button" onClick={handleToggle}> { buttonLabel } </button> {/*  без type="button" будет работать как type="submit", будет перезгрузка станицы  */}
                            
        { isOpen &&  <div className="choices__box"> { children }   {/*  внутренние элементы */} </div> }
      </div>
    )

};