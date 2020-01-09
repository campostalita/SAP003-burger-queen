import React, { useState, useEffect } from "react";
import Button from "../componentes/button/Button";
import MenuList from "../componentes/menu/Menu";
import firebase from "../utils/config.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Input from "../componentes/input/Input";
import Logo from "./logo.png";
//import { tsPropertySignature } from '@babel/types';
//import Item from './componentes/selectItem/Item'

const style = StyleSheet.create({
  header: {
    backgroundColor: "#F2921D",
    padding: "1%",
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    width: "6%",
    margin: " 0 3% 0 8%"
  },
  slogan: {
    fontFamily: "Metamorphous cursive",
    color: "#590202",
    margin: " 4% 0% 0 0%"
  },
  btnMenu: {
    color: "#590202",
    backgroundColor: "#F2C335",
    borderColor: "#F2C335",
    borderRadius: 10
    /* margin: "1%",
    display: "flex" */
  },
  theMain: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#260101",
    paddingTop: "1%"
  },
  selectMenu: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    alignItems: "center",
    justifyContent: "center"
  },
  wishList: {
    width: "45%",
    alignItems: "center",
    color: "white"
  },
  requestData: {
    display: "flex",
    width: "50%"
  },
  colorName: {
    color: "white"
  }
});

//<Button text="Clique aqui" />

function Restaurante() {
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [total, setTotal] = useState("");
  const [options, setOptions] = useState([]);
  //const [modal, setModal] = useState({status:false});
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    firebase
      .collection("Menu")
      .get()
      .then(snapshot => {
        const products = snapshot.docs
          .filter(doc => doc.data().breakfast)
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        setItem1(products);

        const products2 = snapshot.docs
          .filter(doc => doc.data().lunch)
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        setItem2(products2);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .collection("client")
      .add({
        client,
        table: parseInt(table),
        productSelect,
        total
      })
      .then(() => {
        setTable("");
        setClient("");
        setProductSelect([]);
        setTotal("");
      });
    
  }

  const increaseUnit = product => {
    if (!productSelect.includes(product)) {
      product.contador = 1;
      setProductSelect([...productSelect, product]);
    } else {
      product.contador += 1;
      setProductSelect([...productSelect]);
    }
  };

  function decreaseUnit(product) {
    if (product.contador === 1) {
      const removerProductForm = productSelect.filter(erase => {
        return erase !== product;
      });
      setProductSelect([...removerProductForm]);
    } else {
      product.contador--;
      setProductSelect([...productSelect]);
    }
  }

  const openOptions = elem => {
    if (elem.options.length !== 0) {
      setOptions(elem);
    } else {
      increaseUnit(elem);
    }
  };

  const openExtra =(elem)=>{
    if(elem.extra.lenght !==0){
        setExtra(elem)
    }else{
        increaseUnit(elem)
    }
};

  const valueOrder = productSelect.reduce(
    (acc, item) => acc + item.contador * item.price,
    0
  );

  const removeItem = item => {
    const index = productSelect.indexOf(item);
    productSelect.splice(index, 1);
    setProductSelect([...productSelect]);
  };

  return (
    <>
      <header className={css(style.header)}>
        <h3 className={css(style.slogan)}>O sabor da realeza</h3>
        <img className={css(style.logo)} src={Logo} alt="Logo Burger Queen" />
      </header>

      <main className={css(style.theMain)}>
        <section className={css(style.selectMenu)}>
          <h2 className={css(style.colorName)}>Menu</h2>
          <div>
            <Button
              className={style.btnMenu}
              handleClick={() => setFilterMenu("breakfast")}
            >
              Breakfast
            </Button>
            <Button
              className={style.btnMenu}
              handleClick={() => setFilterMenu("lunch")}
            >
              All Day
            </Button>
          </div>
          <div>
            <div>
              <MenuList
                menuItens={filterMenu === "breakfast" ? item1 : item2}
                handleClick={(item) => {openOptions(item); openExtra(item)}}
                name={productSelect.name}
                price={productSelect.price}
                key={productSelect.id}
              />
            </div>
          </div>
        </section>

        <section>
          {options.length !== 0
            ? options.options.map((elem, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="types"
                    value={options.name}
                    onClick={() => {
                      const teste = {
                        ...options,
                        name: `${options.name} ${elem}`
                      };
                      increaseUnit(teste);
                      setOptions([]);
                    }}
                  />{elem}
                </div>
              ))
            : false}
             {extra.length !== 0 ?
                    extra.extra.map((elem, index)=>(
                        <div key={index}>
                            <input
                                type="radio"
                                name="extra"
                                value={extra.name}
                                onClick={()=> {
                                    const teste2={...extra, name: `${extra.name} ${elem}`}
                                    increaseUnit(teste2)

                                }}
                            />{elem}
                        </div>
                    ))
                :false}
        </section>
        <section className={css(style.wishList)}>
          <div className={css(style.requestData)}>
            <h4 className={css(style.colorName)}>Cliente</h4>
            <Input
              id="input-client"
              type="text"
              value={client}
              handleChange={e => setClient(e.currentTarget.value)}
            />
            <h4 className={css(style.colorName)}>Mesa</h4>

            <Input
              id="input-number"
              type="number"
              value={table}
              handleChange={e => setTable(e.currentTarget.value)}
            />
          </div>
          {productSelect.map((product, index) => (
            <div key={index}>
              <Button
                children={"-"}
                handleClick={() => decreaseUnit(product)}
              />
              {product.contador}
              <Button
                children={"+"}
                handleClick={() => increaseUnit(product)}
              />
              {product.name} R$ {product.price},00
              <Button
                children={"Del"}
                handleClick={e => {
                  e.preventDefault();
                  removeItem(product);
                }}
              />
            </div>
          ))}

          <p>
            <strong className={css(style.colorName)}>
              Valor do Pedido: {valueOrder}
            </strong>
          </p>
          <Button
            className={style.btnMenu}
            id="button"
            handleClick={onSubmit}
            children={"Enviar Pedido"}
          />
        </section>
      </main>
    </>
  );
}

export default Restaurante;


