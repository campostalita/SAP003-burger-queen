import React from "react";
import Restaurante from "./pages/Restaurante.js";
import Cozinha from "./pages/Cozinha.js";
import Delivery from "./pages/Delivery.js";

import Inicio from "./pages/Inicio.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route path="/restaurante" component={Restaurante} />
            <Route path="/cozinha" component={Cozinha} />
            <Route path="/delivery" component={Delivery} />
          </Switch>
      </Router>
  );
}

export default App;
