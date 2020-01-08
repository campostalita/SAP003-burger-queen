import React from 'react';

const Input = (props) => {
  return (
    <div>
      <label>{props.title}</label>
      <input type={props.type} value={props.val} id={props.id} onChange={props.handleChange}
      className="input"/>
    </div>

  )
}

export default Input;