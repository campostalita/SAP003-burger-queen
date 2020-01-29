import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

const style = StyleSheet.create({
  p:{
    margin: "1%",
 },
 bgOrder:{
   width: "200px",
   
 }
});


const OrderCozinha = props => {
  return (
    <div className={css(style.bgOrder)}>
      <p>Nome: {props.name} </p>
      <p>Mesa: {props.mesa} </p>
      <div>
        Itens:
        {props.productSelect.map((item) => 
          <p className={css(style.p)}>
            {item.contador} {item.name}
          </p>
        )}
      </div>
      <p>Total: {props.total} </p>
    </div>
  );
};

export default OrderCozinha;


/* .card{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 30%;
   justify-content: left;
   margin:1%;
   font-size: 0.7em;
   border-radius: 5%;
   background: #491730;
   color: #eab46c;
   border-style: groove;
   border-color: #371124;
   padding: 2%;
}

h3{
   margin: 1%;

}
p{
   margin: 1%;
}

h4{
   margin: 1%;
}

section{
   margin:1%
}

.itens{
   margin-left: 2%;
} */