import React, { useState, useEffect } from "react";
import firebase from "../utils/config.js";
import OrderCozinha from "../componentes/order/Order.js";
import Button from "../componentes/button/Button.js";
import Back from "../componentes/back/Back";
import { StyleSheet, css } from "aphrodite/no-important";

const style = StyleSheet.create({
  bgDelivery: {
    backgroundColor: "#260101",
    color: "white",
    height: "85vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px 10px 0px 10px"
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
    <>
      <Back />
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
    </>
  );
};

export default Delivery;
