import React, { useState, useEffect } from "react";
import Button from '../componentes/Button';
import MenuList from "../componentes/Menu";
import firebase from "../utils/config.js";
import { StyleSheet, css } from "aphrodite/no-important";
import Input from "../componentes/Input";
import growl from "growl-alert";
import 'growl-alert/dist/growl-alert.css'
import Header from "../componentes/Header"


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
  menu: {
    display: "flex",
    flexWrap: "wrap",
    //overflow: "auto",
    justifyContent: "space-evenly",
    width: "19rem"
    
  },
  btnMenu: {
    color: "#590202",
    backgroundColor: "#F2C335",
    borderColor: "#F2C335",
    borderRadius: 10,
    padding: "6px",
    fontWeight: "bold",
    marginLeft: "8px"
  },
  theMain: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#260101",
    paddingTop: "1%",

   //z height: "100vh"
  },
  selectMenu: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    //height: "53%",
    alignItems: "center",
    //justifyContent: "flex-start",
    //marginTop: "10px"
  },
  wishList: {
    fontSize: "22px",
    width: "45%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    //justifyContent: "flex-start",
    marginTop: "10px"
  },
  requestData: {
    display: "flex",
    margin: "0 0 30px"
  },
  requestInformation: {
    display: "flex",
    //flexDirection: "column"
  },
  input: {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    width: "90%",
    //textAlign: "center",
    padding: "2px"
  },
  colorName: {
    color: "white",
    fontSize: "20px",
    margin: "14px"
    
  },
  optionsExtras: {
    color: "white"
  },
  btnDel: {
    fontSize: "20px",
    backgroundColor: "#260101",
    border: "none"
  },
  btnRadius: {
    color: "#590202",
    backgroundColor: "#F2921D",
    borderColor: "#F2921D",
    borderRadius: 10,
    margin: "3px",
    width: "26px",
    height: "26px"
  },
  orders:{
    fontSize: "18px",
    overflow: "auto"
  },
  detailsBurger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  kitchen:{
    height: "100vh",
    backgroundColor: "#260101",
  }
});

const option = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

function Restaurante() {
  const [cafe, setCafe] = useState([]);
  const [almoco, setAlmoco] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [optionsAndExtras, setOptionsAndExtras] = useState([]);
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
        setCafe(products);

        const products2 = snapshot.docs
          .filter(doc => doc.data().lunch)
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        setAlmoco(products2);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    if(client && table && productSelect.length)
    firebase
      .collection("client")
      .add({
        client,
        table: parseInt(table),
        productSelect,
        total: valueOrder,
        status: "Preparando"
      })
      .then(() => {
        growl.success({text:'Pedido enviado', ...option})
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
     removeItem(product);
    } else {
      (product.contador--);
      setProductSelect([...productSelect]);
    }
  };

  const openOptionsAndExtras = elem => {
    if (elem.options.length !== 0) {
      setOptionsAndExtras(elem);
    } else {
      setOptionsAndExtras([]);
      increaseUnit(elem);
    }
  };

  const valueOrder = productSelect.reduce((acc, item) => {
    const extraPrice = item.selectedExtra ? 1 : 0;
    return acc + item.contador * (item.price + extraPrice);
  }, 0);

  const removeItem = item => {
    const removeItem = productSelect.filter(elem => elem !== item);
    setProductSelect([...removeItem]);
  };

  const addOptions = () => {
    const aditionOptions = {
      ...optionsAndExtras,
      selectedExtra: selectedOptionsAndExtras.extra
        ? selectedOptionsAndExtras.extra
        : "",
      name: `
        ${optionsAndExtras.name} 
        ${
          selectedOptionsAndExtras.option ? selectedOptionsAndExtras.option : ""
        } 
        ${selectedOptionsAndExtras.extra ? selectedOptionsAndExtras.extra : ""}`
    };
    increaseUnit(aditionOptions);
    setSelectedOptionsAndExtras([]);
    setOptionsAndExtras([]);
  };

  return (
    <div className={css(style.kitchen)}>
      <Header />
      <main className={css(style.theMain)}>
        <section className={css(style.selectMenu)}>
          <h2 className={css(style.colorName)}>Menu</h2>
          <div>
            <Button
              className={style.btnMenu}
              handleClick={() => setFilterMenu("breakfast")}
            >
              Café da Manhã
            </Button>
            <Button
              className={style.btnMenu}
              handleClick={() => setFilterMenu("lunch")}
            >
              Lanches
            </Button>
          </div>
          <div>
            <div className={css(style.menu)}>
              <MenuList
                menuItens={filterMenu === "breakfast" ? cafe : almoco}
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
                <div className={css(style.detailsBurger)}>
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
                   <span>{elem}</span>
                  </div> 
                ))}
                </div>
                <div className={css(style.detailsBurger)}>
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
                </div>
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
            <div className={css(style.requestInformation)}>
              <Input
                placeholder="Nome do Cliente"
                className={css(style.input)}
                type="text"
                value={client}
                handleChange={e => setClient(e.currentTarget.value)}
              />
              <Input
                placeholder="Número da mesa"
                className={css(style.input)}
                type="number"
                value={table}
                handleChange={e => setTable(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className={css(style.orders)}>
          {productSelect.map((product, index) => {
            const extraPrice = product.selectedExtra ? 1 : 0;
            return (
              <div  key={index}>
                <Button
                  className={style.btnRadius}
                  children={"-"}
                  handleClick={() => decreaseUnit(product)}
                />
                {product.contador}
                <Button
                  className={style.btnRadius}
                  children={"+"}
                  handleClick={() => increaseUnit(product)}
                />
                {product.name}{" "}
                {(product.price + extraPrice).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
                <Button
                  className={style.btnDel}
                  children={"🗑️"}
                  handleClick={e => {
                    e.preventDefault();
                    removeItem(product);
                  }}
                />
              </div>
            ); 
          })}
          </div>

          <p className={css(style.colorName)}>
            <strong >
              Valor do Pedido:{" "}
              {valueOrder.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
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
    </div>
  );
}

export default Restaurante;
