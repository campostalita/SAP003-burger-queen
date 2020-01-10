import React from "react";

const Input = props => {
  return (
    <div>
      <label>{props.title}</label>
      <input
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        id={props.id}
        onChange={props.handleChange}
        className="input"
      />
    </div>
  );
};

export default Input;
