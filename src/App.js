import React,{ useState, useEffect } from 'react';
//import logo from './logo.svg';
//import './App.css';
import firebase from './config'
//import { tsExternalModuleReference } from '@babel/types';

function App() {

  const [item1, setItem1] = useState([]);

  useEffect(() => {
    firebase.collection('Menu')
    .where('breakfast','==', true)
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(products)
    })
  }, [])

  const [item2, setItem2] = useState([]);

  useEffect(() => {
    firebase.collection('Menu')
    .where('lunch','==', true)
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(products)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {item1.map((teste) =>
          <div key = {teste.id}>
            {teste.name}
          </div>
          )}
        </p>
        <p>
          {item2.map((teste) =>
          <div key = {teste.id}>
            {teste.name}
          </div>
          )}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} 


export default App;
