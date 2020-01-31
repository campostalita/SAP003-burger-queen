import React from 'react';
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  button: {
    backgroundColor:'blue',
    padding: 10
  },
})


const Card = (props) => {
    return (
<button onClick={props.handleClick} className={css(style.button)}> 
{props.name} R$ {props.price},00
</button>   
 )
}

export default Card;