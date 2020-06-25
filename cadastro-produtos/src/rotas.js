import React from "react";
import { Switch, Route } from "react-router-dom";
import CadastroProduto from "./views/produtos/Cadastro";
import Home from "./views/Home";
import ConsultaProdutos from "./views/produtos/Consulta";

const Rotas = () => {
  return (
    <Switch>
      <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto} />
      <Route exact path="/" component={Home} />
      <Route exact path="/consulta-produtos" component={ConsultaProdutos} />
    </Switch>
  );
};

export default Rotas;
