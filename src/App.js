import React from "react";
import Restaurante from "./pages/Restaurante.js";
import Cozinha from "./pages/Cozinha.js";
import Delivery from "./pages/Delivery.js";
import Header from "./componentes/Header/header.js";
import Inicio from "./pages/Inicio.js"

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />

        <div>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/restaurante" component={Restaurante} />
            <Route exact path="/cozinha" component={Cozinha} />
            <Route exact path="/delivery" component={Delivery} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
