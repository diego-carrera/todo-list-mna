import React from "react";

function Todo(props) {

  const [isEditing, setEditing] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleChangeCategory(e) {
    setNewCategory(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if ( newName === "" || newCategory === "" ) {
      alert('No puedes dejar campos vacíos');
      return;
    }

    props.editTask(props.id, newName, newCategory);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Nuevo nombre para {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Nueva categoría para {props.name}
        </label>
        <div className="select">
          <select name="slct" id="slct" onChange={handleChangeCategory}>
            <option selected disabled>Selecciona una categoría</option>
            { Object.keys(props.categories).map((key) => (
              <option key={key} value={props.categories[key]}>{props.categories[key]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancelar
          <span className="visually-hidden">renombrando {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Guardar
          <span className="visually-hidden">nuevo nombre para {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          <span className="category-badge">{props.category}</span> {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
        >
          Editar <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Borrar <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
