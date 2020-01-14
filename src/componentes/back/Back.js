import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite/no-important";

const style = StyleSheet.create({
  bgVoltar: {
    background: "#260101"
  },
  bgLink: {
    textDecorationLine: "none",
    color: "#590202",
    backgroundColor: "#F2C335",
    borderRadius: "9px",
    padding: "9px",
    fontWeight: "bold",
   // marginLeft: "20%"
  }
});

const Back = () => {
  return (
    <>
      <span className={css(style.bgVoltar)}>
        <Link to="/" className={css(style.bgLink)}>
          Voltar
        </Link>
      </span>
    </>
  );
};

export default Back;
