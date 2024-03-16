import React from "react";
import * as C from "./styles";
import { FaTrash, FaRegEdit} from "react-icons/fa";

const GridItemProduct = ({ item, onDelete, onEdit }) => {
  return (
    <C.Tr>
      <C.TdText>{item.name}</C.TdText>
      <C.TdText>{item.desc}</C.TdText>
      <C.TdNumber>R$ {Number(item.price).toFixed(2)}</C.TdNumber>
      <C.TdNumber>{item.quant_min}</C.TdNumber>
      <C.TdNumber alignCenter>
        <FaRegEdit style={{ marginRight:"40px", cursor: "pointer" }} onClick={() => onEdit(item.name)} />
        <FaTrash style={{ cursor: "pointer" }} onClick={() => onDelete(item.name)} />
      </C.TdNumber>
    </C.Tr>
  );
};

export default GridItemProduct;
