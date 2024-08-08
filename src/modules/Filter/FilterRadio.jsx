



export const FilterRadio = ({ handleTypeChange, data, type }) => { // data={ value, title }, type - нажатая радиокнопка

return (
    <div>
        <input className="filter__radio" type="radio" name="type" id={data.value}  value={data.value}  checked={type === data.value}  onChange={ handleTypeChange } /> {/*  defaultChecked */}
        <label className={`filter__label filter__label--${data.value}`}  htmlFor={data.value}> {data.title} </label>   {/* вместо for в реакте пишем htmlFor: */}
    </div>

  );
};
