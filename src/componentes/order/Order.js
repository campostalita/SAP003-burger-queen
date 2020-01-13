import React from "react";

const OrderCozinha = props => {
  return (
    <div className={props.className}>
      <p>Nome: {props.name} </p>
      <p>Mesa: {props.mesa} </p>
      <div>
        Itens:
        {props.productSelect.map((item) => 
          <p>
            {item.contador} {item.name}
          </p>
        )}
      </div>
      <p>Total: {props.total} </p>
    </div>
  );
};

export default OrderCozinha;
