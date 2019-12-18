import React,{ useState, useEffect } from 'react';
import Button from '../componentes/button/Button';
import MenuList from '../componentes/menu/Menu';
import firebase from '../utils/config'
//import { StyleSheet, css } from "aphrodite";
//import Item from './componentes/selectItem/Item'

/* const style = StyleSheet.create({
  btnBreakfast: {
    color:'red',
  },

}) */

//<Button text="Clique aqui" />

function Restaurante() {

  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState([]);

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

  function showFilterMenu (type) {
    if(type === 'breakfast'){
      const filterAdd = item1.filter(elem => elem.breakfast);
      setFilterMenu(filterAdd);
    }else{
      const filterAdd = item2.filter(elem => !elem.breakfast);
      setFilterMenu(filterAdd);
    }
  }



  const addOrder = (item) => {
    setProductSelect([...productSelect, item])
  }


  const total = productSelect.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="App">
      <header className="App-header">
     
      <div>
      <Button text={'Breakfast'} handleClick={() => showFilterMenu('breakfast') } />
      <Button text={'All Day'} handleClick={() => showFilterMenu('lunch') } />
      </div>
    

      <div>
        <h2>Menu</h2>
        <MenuList 
          menuItens={filterMenu} 
          handleClick={addOrder} 
          name={productSelect.name} 
          price={productSelect.price} key={productSelect.id}/>
        {
          productSelect.map((product, index) => 
            <div key={index}>{product.name} R$ {product.price},00</div>)
        }
        <strong>Total: {total}</strong>
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
