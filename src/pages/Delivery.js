import React, { useState, useEffect } from "react";
import firebase from "../utils/config.js";
import OrderCozinha from "../componentes/Order.js";
import Button from "../componentes/Button.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Header from "../componentes/Header"

const style = StyleSheet.create({
  bgDelivery: {
    
    color: "white",
    
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px 10px 0px 10px"
  },

  delivery: {
    height: "100vh",
    backgroundColor: "#260101",
  }
});

const Delivery = () => {
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
        status: "Entregue"
      });
    setClient(client.filter(item => item.id !== doc.id));
  };

  return (
    <div className={css(style.delivery)}>
      <Header/>
      <div className={css(style.bgDelivery)}>
        {client.map((doc, index) =>
          doc.status === "Pronto" ? (
            <div key={index}>
              <OrderCozinha
                name={doc.client}
                mesa={doc.table}
                total={doc.total}
                productSelect={doc.productSelect}
              />
              <Button
                children={"Pedido Entregue, Graças a Deus!"}
                handleClick={() => statusUpdate(doc)}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Delivery;
