import React, { useState, useEffect } from "react";
import firebase from "../utils/config.js";
import OrderCozinha from "../componentes/Order.js";
import Button from "../componentes/Button.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Header from "../componentes/Header"

const style = StyleSheet.create({
  bgCozinha: {
    backgroundColor: "#260101",
    color: "white",
    height: "85vh",
    display: "flex",
    justifyContent: "center"
  },
  cozinha: {
    height: "100vh",
    backgroundColor: "#260101",
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
            <div key={index}>
              <OrderCozinha
                name={doc.client}
                mesa={doc.table}
                total={doc.total}
                productSelect={doc.productSelect}
              />
              <Button
                children={"Pedido Prontinho"}
                handleClick={() => statusUpdate(doc)}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Cozinha;
