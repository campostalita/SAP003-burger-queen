import React,{ useState, useEffect } from 'react';
import Button from '../componentes/button/Button';
import MenuList from '../componentes/menu/Menu';
import firebase from '../utils/config.js';
import { StyleSheet, css } from "aphrodite";
import Input from '../componentes/input/Input';
//import { tsPropertySignature } from '@babel/types';
//import Item from './componentes/selectItem/Item'

const style = StyleSheet.create({
  disInline: {
    display:'inline-block',
    backgroundColor:'red',
  },
  AppHeader:{
    backgroundColor: 'blue',
  },
  aaa: {
    color: "red"
  }

})

//<Button text="Clique aqui" />

function Restaurante() {
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");
  const [client, setClient] = useState ([]);
  const [table,setTable] = useState('');
  const [total,setTotal] = useState('');
  const [options, setOptions] = useState([]);
  
  useEffect(() => {

    firebase.collection('Menu')
      .get().then((snapshot) => {
        const products = snapshot.docs.filter(doc => doc.data().breakfast).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(products)

        const products2 = snapshot.docs.filter(doc => doc.data().lunch).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(products2)

    })
  }, [])

  function onSubmit(e){
    e.preventDefault()

      firebase.collection('client')
      .add({
        client,
        table: parseInt(table),
        productSelect,
        total,
      })
      .then(() => {
        setTable('')
        setClient('')
        setProductSelect([])
        setTotal('')
      })
  }

  const increaseUnit = (product) =>{
    if(!productSelect.includes(product)) {
        product.contador = 1;
        setProductSelect([...productSelect, product])
    } else {
        product.contador += 1;
        setProductSelect([...productSelect])             
       }   
  }

  function decreaseUnit(product) {
    if(product.contador === 1) {
        const removerProductForm = productSelect.filter((erase) => {
          return erase !== product;   
      })
      setProductSelect([...removerProductForm])
    } else {
        product.contador --
        setProductSelect([...productSelect])             
       }   
  }

  const openOptions = (elem) => { 
    if(elem.options.length !== 0){
        setOptions(elem) 
    } else {
        increaseUnit(elem);
    }

}

  const valueOrder = productSelect.reduce((acc, item) => acc + ( item.contador * item.price), 0);

  const removeItem = (item) => {
    const index = (productSelect.indexOf(item));
    productSelect.splice(index, 1);
    setProductSelect([...productSelect]);
  }
  
  return (
   <>
    <section className="App">
      <header className={css(style.AppHeader)}>OIiiiii</header>
        <div>
         <Button className={style.aaa} handleClick={() => setFilterMenu('breakfast') }>
            Breakfast
          </Button>
         <Button className={style.aaa} handleClick={() => setFilterMenu('lunch') }>
          All Day
          </Button>
        </div>
        <div>
         <h2>Menu</h2>
          <div>
            <MenuList 
              menuItens={filterMenu === "breakfast" ? item1 : item2} 
              handleClick={openOptions} 
              name={productSelect.name} 
              price={productSelect.price} key={productSelect.id}/>
        </div>
      </div> 
    </section>

    <section>
        {options.length !== 0 ? 
          options.options.map((elem, index) => (
              <div key={index}>
                 <input 
                 type="button"
                 name="types" 
                 value={elem} 
                 onClick={()=> {
                const teste= {...options, name: `${options.name} ${elem}`}; 
                  increaseUnit(teste)
                  setOptions([]);
                  }}
                /> 
         </div>)) : false}
               
            </section>
    <section className={css(style.disInline)}>
      <div>
          <label>
            <strong>Cliente</strong>
          </label>
         <Input id='input-client' type="text" state={client} handleChange={e => setClient(e.currentTarget.value)}/>

       <label>
         <strong>Mesa</strong>
       </label> 
         <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
      </div>
          {productSelect.map((product, index) => (
              <div key={index}> 
              
              <Button text={'-'} handleClick={() => decreaseUnit (product)} />  
                {product.contador}
              <Button text={'+'} handleClick={() => increaseUnit (product)} />
              {product.name} R$ {product.price},00 
                <Button text={'Del'} handleClick={(e) => {
                e.preventDefault(); 
                removeItem(product);
                }} />
            </div>   
      ))}
            
                
       <p><strong>Valor do Pedido: {valueOrder}</strong></p>
       <Button classname={style.myButton} id='button' handleClick={onSubmit} text={'Enviar Pedido'}/>   
    </section>

  </>
  );
};

export default Restaurante;
