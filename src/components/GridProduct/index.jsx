import React from "react";
import GridItemProduct from "../GridItemProduct";
import * as C from "./styles";

const Grid = ({ itens, setItens }) => {
  const onDelete = (name) => {
    const newArray = itens.filter((product) => product.name !== name);
    setItens(newArray);
    localStorage.setItem("products", JSON.stringify(newArray));
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={20}>Nome do produto</C.Th>
          <C.Th width={30}>Descrição</C.Th>
          <C.Th width={15}>Valor unitário</C.Th>
          <C.Th width={15}>Quantidade mínima</C.Th>
          <C.Th width={10}></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item, index) => (
          <GridItemProduct key={index} item={item} onDelete={onDelete} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
