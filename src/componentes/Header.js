import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { StyleSheet, css } from "aphrodite/no-important";

const style = StyleSheet.create({
  header: {
    backgroundColor: "#F2921D",
    display: "flex",
    justifyContent: "space-between",
    height: "10%",
    padding: "3.5rem 2rem"
  },
  logo: {
    width: "13%",
    margin: " 0 3% 0 8%"
  },
  slogan: {
    fontFamily: "Metamorphous cursive",
    color: "#590202",
    fontSize: "18px"
  },
  bgLink: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecorationLine: "none",
    color: "#590202",
    //backgroundColor: "#F2C335",
    //borderRadius: "9px",
    padding: "9px",
    fontFamily: "Metamorphous cursive",
    fontWeight: "bold",
    fontSize: "15px",
    borderRight: "2px solid #bbb",
    borderRightColor: "white"
  },
  logoSlogan:{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

const Header = () => {
  return (
    <>
      <header className={css(style.header)}>
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
       <div className={css(style.logoSlogan)}>
        <h3 className={css(style.slogan)}>O sabor da realeza</h3>
        <img className={css(style.logo)} src={Logo} alt="Logo Burger Queen" />
        </div>
      </header>
    </>
  );
};

export default Header;
