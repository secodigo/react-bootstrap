import React from "react";

const ProdutosTable = ({produtos, editarAction, deletarAction}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sku</th>
          <th>Preço</th>
          <th>Fornecedor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, index) => {
          return (
            <tr key={index}>
              <th>{produto.nome}</th>
              <th>{produto.sku}</th>
              <th>{produto.preco}</th>
              <th>{produto.fornecedor}</th>
              <th>
                <button
                  onClick={() => editarAction(produto.sku)}
                  className="btn btn-primary"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletarAction(produto.sku)}
                  className="btn btn-danger"
                >
                  Remover
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProdutosTable;
