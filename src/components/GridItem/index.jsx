import React from "react";
import * as C from "./styles";
import { FaTrash } from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  return (
    <C.Tr>
      <C.TdText>{item.productName}</C.TdText>
      <C.TdText>{item.desc}</C.TdText>
      <C.TdNumber>R$ {Number(item.unitValue).toFixed(2)}</C.TdNumber>
      <C.TdNumber>{item.quant}</C.TdNumber>
      <C.TdNumber>R$ {Number(item.total).toFixed(2)}</C.TdNumber>
      <C.TdNumber alignCenter>
        <FaTrash style={{ cursor: "pointer" }} onClick={() => onDelete(item.id)} />
      </C.TdNumber>
    </C.Tr>
  );
};

export default GridItem;
