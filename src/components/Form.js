import React from "react";

function Form(props) {

  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if ( name === "" || category === "" ) {
      alert('No puedes dejar campos vacíos');
      return;
    }

    props.addTask(name, category);
    setName("");
  }

  function handleSelectChange(e) {
    setCategory(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          ¿Cuáles son mis tareas?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        required={true}
      />

      {/* categories */}
      <h2 className="label-wrapper">
        <label className="label__lg" htmlFor="slct">
          Categoría
        </label>
      </h2>
      <div className="select">
        <select name="slct" id="slct" className="select__lg" onChange={handleSelectChange}>
          <option value={''}>Selecciona una categoría</option>
          { Object.keys(props.categories).map((key) => (
            <option key={key} value={props.categories[key]}>{props.categories[key]}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn__primary btn__lg">
        Agregar
      </button>
    </form>
  );
}

export default Form;
