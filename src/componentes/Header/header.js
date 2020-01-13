import React from "react";
import Logo from "../../img/logo.png";
import { StyleSheet, css } from "aphrodite/no-important";

const style = StyleSheet.create({
  header: {
    backgroundColor: "#F2921D",
    padding: "1%",
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    width: "6%",
    margin: " 0 3% 0 8%"
  },
  slogan: {
    fontFamily: "Metamorphous cursive",
    color: "#590202",
    margin: " 4% 0% 0 0%"
  }
});

const Header = props => {
  return (
    <>
      <header className={css(style.header)}>
        <h3 className={css(style.slogan)}>O sabor da realeza</h3>
        <img className={css(style.logo)} src={Logo} alt="Logo Burger Queen" />
      </header>
    </>
  );
};

export default Header;
