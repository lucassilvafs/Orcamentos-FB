import React from "react";
import * as C from "./styles";
import {
  FaTrash,
} from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  return (
    <C.Tr>
      <C.Td>{item.name}</C.Td>
      <C.Td>{item.desc}</C.Td>
      <C.Td>R$ {Number(item.price).toFixed(2)}</C.Td>
      <C.Td>{item.quant_min}</C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item.name)} />
      </C.Td>
    </C.Tr>
  );
};

export default GridItem;
