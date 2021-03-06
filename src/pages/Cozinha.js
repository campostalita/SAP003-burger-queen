import React, { useState, useEffect } from "react";
import firebase from "../utils/config.js";
import OrderCozinha from "../componentes/Order.js";
import Button from "../componentes/Button.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Header from "../componentes/Header"

const style = StyleSheet.create({
  bgCozinha: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px 10px 0px 10px",
    overflow: "auto"
  },
  cozinha: {
    height: "100vh",
    backgroundColor: "#260101",
  },
  orderCard: {
    border: "3px solid",
    borderColor: "#BF3604",
    margin: "1%",
    padding: "0px 0px 0px 10px"
  },
  btnCozinha: {
    margin: "5px",
    padding: "0px 2px 2px 2px",
    color: "#590202",
    backgroundColor: "#F2921D",
    borderColor: "#F2921D",
    borderRadius: 10,
    fontWeight: "bold",
    width: "6rem",
    height: "2,5rem"
  } 
});

const Cozinha = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    const order = [];
    firebase
      .collection("client")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          order.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setClient(order);
      });
  }, []);

  const statusUpdate = doc => {
    firebase
      .collection("client")
      .doc(doc.id)
      .update({
        status: "Pronto"
      });

    setClient(client.filter(item => item.id !== doc.id));
  };

  return (
    <div className={css(style.cozinha)}>
      <Header />
      <div className={css(style.bgCozinha)}>
        {client.map((doc, index) =>
          doc.status === "Preparando" ? (
            <div className={css(style.orderCard)} key={index}>
              <OrderCozinha
                name={doc.client}
                mesa={doc.table}
                total={doc.total}
                productSelect={doc.productSelect}
              />
              <Button
               className={style.btnCozinha}
                handleClick={() => statusUpdate(doc)}
                children={"Pedido Pronto!"}></Button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Cozinha;
