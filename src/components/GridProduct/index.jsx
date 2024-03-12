import React from "react";
import GridItemProduct from "../GridItemProduct";
import * as C from "./styles";

const Grid = ({ itens, setItens, onEdit }) => {
  const onDelete = (name) => {
    const newArray = itens.filter((product) => product.name !== name);
    setItens(newArray);
    localStorage.setItem("products", JSON.stringify(newArray));
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.ThText width={20}>Nome do produto</C.ThText>
          <C.ThText width={30}>Descrição</C.ThText>
          <C.ThNumber width={15}>Valor unitário</C.ThNumber>
          <C.ThNumber width={15}>Quantidade mínima</C.ThNumber>
          <C.ThNumber width={10}></C.ThNumber>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item, index) => (
          <GridItemProduct key={index} item={item} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
