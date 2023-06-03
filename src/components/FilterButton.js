import React from "react";

function FilterButton(props) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true">
      <span className="visually-hidden">Mostrar </span>
      <span>Todas </span>
      <span className="visually-hidden"> Tareas</span>
    </button>
  );
}

export default FilterButton;
