import React, { useState, useEffect } from "react";
import Button from "../componentes/button/Button";
import MenuList from "../componentes/menu/Menu";
import firebase from "../utils/config.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Input from "../componentes/input/Input";
import Back from "../componentes/back/Back.js"

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
    paddingTop: "1%",
    height: "85vh"
  },
  selectMenu: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    height: "53%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  wishList: {
    width: "45%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  requestData: {
    display: "flex",
    width: "50%"
  },
  requestInformation:{
    margin:"20px",
    display:"flex",
    flexDirection: "column"
  },
  colorName: {
    color: "white"
  },
  optionsExtras: {
    color: "white"
  },
  btnDel: {
    fontSize: "20px",
    backgroundColor: "#260101",
    border: "none"
  }
});

function Restaurante() {
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [optionsAndExtras, setOptionsAndExtras] = useState([]);
  //const [modal, setModal] = useState({status:false});
  const [selectedOptionsAndExtras, setSelectedOptionsAndExtras] = useState({});

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
        total: valueOrder,
        status: "Preparando",
      })
      .then(() => {
        setTable("");
        setClient("");
        setProductSelect([]);
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

  const decreaseUnit = product => {
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

  const openOptionsAndExtras = elem => {
    if (elem.options.length !== 0) {
      setOptionsAndExtras(elem);
    } else {
      setOptionsAndExtras([]);
      increaseUnit(elem);
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

  const addOptions = () => {
    const teste2 = {
      ...optionsAndExtras,
      name: `
        ${optionsAndExtras.name} 
        ${selectedOptionsAndExtras.option ? selectedOptionsAndExtras.option : ""} 
        ${selectedOptionsAndExtras.extra ? selectedOptionsAndExtras.extra : "" }`
    };
    increaseUnit(teste2);
    setSelectedOptionsAndExtras([]);
    setOptionsAndExtras([]);
  };

  return (
    <>
      {/* <header className={css(style.header)}>
        <h3 className={css(style.slogan)}>O sabor da realeza</h3>
        <img className={css(style.logo)} src={Logo} alt="Logo Burger Queen" />
      </header> */}
      <Back />
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
                handleClick={item => {
                  openOptionsAndExtras(item);
                }}
                name={productSelect.name}
                price={productSelect.price}
                key={productSelect.id}
              />
            </div>
          </div>

          <section className={css(style.optionsExtras)}>
            {optionsAndExtras.length !== 0 ? (
              <div>
                <p>Escolha seu tipo de carne e seu adicional</p>
                {optionsAndExtras.options.map((elem, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="types"
                      value={optionsAndExtras.name}
                      onClick={() => {
                        setSelectedOptionsAndExtras({
                          ...selectedOptionsAndExtras,
                          option: elem
                        });
                      }}
                    />
                    {elem}
                  </div>
                ))}
                {optionsAndExtras.extra.map((elem, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="extra"
                      value={optionsAndExtras.name}
                      onClick={() => {
                        setSelectedOptionsAndExtras({
                          ...selectedOptionsAndExtras,
                          extra: elem
                        });
                      }}
                    />
                    {elem}
                  </div>
                ))}
                <p>
                  {" "}
                  <Button handleClick={addOptions} children="Adicionar" />
                </p>
              </div>
            ) : (
              false
            )}
          </section>
        </section>
        <section className={css(style.wishList)}>
          <div className={css(style.requestData)}>
           <div className={css(style.requestInformation)}> <Input
              placeholder="Nome do Cliente"
              id="input-client"
              type="text"
              value={client}
              handleChange={e => setClient(e.currentTarget.value)}
            />

            <Input
              placeholder="Número da mesa"
              id="input-number"
              type="number"
              value={table}
              handleChange={e => setTable(e.currentTarget.value)}
            />
            </div>
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
              {product.name} {product.price.toLocaleString('pt-BR',{ style: 'currency', currency:  'BRL' })}
              <Button
                className={style.btnDel}
                children={"🗑️"}
                handleClick={e => {
                  e.preventDefault();
                  removeItem(product);
                }}
              />
            </div>
          ))}

          <p>
            <strong className={css(style.colorName)}>
              Valor do Pedido: {valueOrder.toLocaleString('pt-BR',{ style: 'currency', currency:  'BRL' })} 
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
