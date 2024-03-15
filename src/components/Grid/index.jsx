import React from "react";
import GridItem from "../GridItem";
import * as C from "./styles";

const Grid = ({ itens, setItens }) => {
  const onDelete = (ID) => {
    const newArray = itens.filter((product) => product.id !== ID);
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
          <C.ThNumber width={15}>Quantidade</C.ThNumber>
          <C.ThNumber width={15}>Total</C.ThNumber>
          {/* <C.Th width={10} alignCenter>
            Tipo
          </C.Th> */}
          <C.ThNumber width={10}></C.ThNumber>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item, index) => (
          <GridItem key={index} item={item} onDelete={onDelete} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
