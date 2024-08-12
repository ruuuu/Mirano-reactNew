import classNames from 'classnames';
import './choices.scss';



// выпадающий список
//                                  созданный стейт(isOpen) можно передать ввиде props
export const Choices = ( { children, buttonLabel, className, isOpen, onToggle } ) => {  //  children, buttonLabel, className, isOpen, onToggle это пропсы
  
  //console.log('onToggle ', onToggle )     // () => { handleChoicesToggle(1) }

  return (
      <div className={classNames("choices", className)}>
     
        <button className="choices__btn" type="button"  onClick={onToggle}> { buttonLabel } </button> {/*  без type="button" будет работать как type="submit", будет перезгрузка станицы  */}
                  
        { isOpen &&  <div className="choices__box">  { children }  </div> }   {/*  children - внутренняя разметка */}
      </div>
    )

};