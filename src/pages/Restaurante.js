import React,{ useState, useEffect } from 'react';
import Button from '../componentes/button/Button';
import MenuList from '../componentes/menu/Menu';
import firebase from '../utils/config'
import { StyleSheet, css } from "aphrodite";
import { tsPropertySignature } from '@babel/types';
//import Item from './componentes/selectItem/Item'

const style = StyleSheet.create({
  disInline: {
    display:'inline-block',
  },

})

//<Button text="Clique aqui" />

function Restaurante() {

  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");

  useEffect(() => {

    firebase.collection('Menu')
      .get().then((snapshot) => {
        const products = snapshot.docs.filter(doc => doc.data().breakfast).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        console.log(products)
        setItem1(products)

        const products2 = snapshot.docs.filter(doc => doc.data().lunch).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(products2)

    })
  }, [])

  const addOrder = (item) => {
    setProductSelect([...productSelect, item])
  }

  const total = productSelect.reduce((acc, item) => acc + item.price, 0);

  const remove = (item) => {
    const index = (productSelect.indexOf(item));
    productSelect.splice(index, 1);
    setProductSelect([...productSelect]);
  }

  return (
    <div className="App">
      <header className="App-header">
     
      <div>
      <Button text={'Breakfast'} handleClick={() => setFilterMenu('breakfast') } />
      <Button text={'All Day'} handleClick={() => setFilterMenu('lunch') } />
      </div>
    
      <div>
        <h2>Menu</h2>
        <div className={css(style.disInline)}>
        <MenuList 
          menuItens={filterMenu === "breakfast" ? item1 : item2} 
          handleClick={addOrder} 
          name={productSelect.name} 
          price={productSelect.price} key={productSelect.id}/>
        </div>
        
        <div className={css(style.disInline)}>
          {productSelect.map((product, index) => (
              <div key={index}> 
                {product.name} R$ {product.price},00 
                <Button text={'Del'} handleClick={(e) => {
                  e.preventDefault(); 
                  remove(product);
                }} />
              </div>
          
          ))}
          <p><strong>Total: {total}</strong></p>
        </div>

          
        
      </div>
     
    
      {/*  { <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>} */}
      </header>
    </div>
  );
} 


export default Restaurante;
