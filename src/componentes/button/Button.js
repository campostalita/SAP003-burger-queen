import React from "react";
import { css, StyleSheet } from "aphrodite";

const style = StyleSheet.create({
  defaultButton: {
    color: "#590202",
    backgroundColor: "#F2921D",
    borderColor: "#F2921D",
    borderRadius: 10,
  }
});

const Button = props => {
  return (
    <button
      className={css(props.className || style.defaultButton)}
      value={props.state}
      id={props.id}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
