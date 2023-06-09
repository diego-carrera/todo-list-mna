import React from "react";

function Form(props) {

  const [name, setName] = React.useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
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
      <button type="submit" className="btn btn__primary btn__lg">
        Agregar
      </button>
    </form>
  );
}

export default Form;
