import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite/no-important";
import Header from "../componentes/Header";

const style = StyleSheet.create({
  bgLink: {
    backgroundColor: "#260101",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  link: {
    textDecorationLine: "none",
    color: "#590202",
    backgroundColor: "#F2C335",
    borderRadius: "9px",
    padding: "19px",
    fontFamily: "Metamorphous cursive",
    fontWeight: "bold",
    fontSize: "30px"
  }
});

const Inicio = () => {
  return (
    <>
      <Header />
      <nav className={css(style.bgLink)}>
        <Link to="/restaurante" className={css(style.link)}>
          Restaurante
        </Link>
        <Link to="/cozinha" className={css(style.link)}>
          Cozinha
        </Link>
        <Link to="/delivery" className={css(style.link)}>
          Delivery
        </Link>
      </nav>
    </>
  );
};

export default Inicio;
