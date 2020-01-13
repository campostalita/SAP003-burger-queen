import React, { useState, useEffect } from "react";
import firebase from "../utils/config.js";
import OrderCozinha from "../componentes/order/Order.js";
import Button from "../componentes/button/Button.js";


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

  const statusUpdate = (doc) => {
      firebase.collection('client').doc(doc.id).update({
          status: 'Entregue',     
      })
  }

  return (
    <>
      <div>
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
