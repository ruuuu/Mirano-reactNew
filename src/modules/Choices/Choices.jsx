import classNames from 'classnames';
import './choices.scss';
import { useEffect, useRef } from 'react';
import { debounce, adjustElementPosition } from '../../utils.js';




// выпадающий список
//                                  созданный стейт(isOpen) можно передать ввиде props
export const Choices = ( { children, buttonLabel, className, isOpen, onToggle } ) => {  //  children, buttonLabel, className, isOpen, onToggle это пропсы
  
  //console.log('onToggle ', onToggle )     // () => { handleChoicesToggle(1) }
  const choiceRef = useRef(null);           // чтобы Филтр по Цене не уезжал за края экрана



  useEffect(() => {

    if(isOpen){         // если фильтр Цена открыт
      console.log('choiceRef.current ', choiceRef.current);      // <div class="choices_box">
      adjustElementPosition(choiceRef.current);
    }

    const debounceAdjustElementPosition = debounce(() => {
      if(isOpen){         // если фильтр Цена открыт
        adjustElementPosition(choiceRef.current);
      }
    }, 100);

    window.addEventListener('resize', debounceAdjustElementPosition); // при событиеи смены размера окна браузера

    return () => {
      window.removeEventListener('resize', debounceAdjustElementPosition); 
    };
  }, [ isOpen ]); // при каждои изменении isOpen, будет вызываться коллбэк


  return (
      <div className={classNames("choices", className)}>
     
        <button className="choices__btn" type="button"  onClick={onToggle}> { buttonLabel } </button> {/*  без type="button" будет работать как type="submit", будет перезгрузка станицы  */}
                  
        { isOpen &&  <div className="choices__box"  ref={choiceRef}>  { children }  </div> }   {/*  children - внутренняя разметка, choiceRef добавили чтоб смещать  этот Фильтр Цена */}
      </div>
    )

};