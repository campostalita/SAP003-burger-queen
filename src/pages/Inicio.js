import React from "react";
//import { StyleSheet, css } from "aphrodite/no-important";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
  <nav>
    <Link to="/restaurante" className="link">
      Restaurante
    </Link>
    <Link to="/cozinha" className="link">
      Cozinha
    </Link>
    <Link to="/delivery" className="link">
      Delivery
    </Link>
  </nav>);
  
};

export default Inicio;
