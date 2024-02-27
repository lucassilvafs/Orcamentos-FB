import { useNavigate } from "react-router-dom";
import React from "react";
import * as C from "./styles";
import visualizarImpressao from "./gerar";

const ResumeItem = ({ title, Icon, value, orderInfo }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const arrayProducts = JSON.parse(localStorage.getItem('products'));
    const generateID = () => Math.round(Math.random() * 1000);
    // console.log("aquiiiiiii" + orderInfo.production);

    const order = {
      id: generateID(),
      clientName: orderInfo.clientName,
      production: orderInfo.production,
      payment: orderInfo.payment,
      products: {...arrayProducts}
    };

    localStorage.setItem("order", JSON.stringify(order));
    alert("indo lá");
    return navigate("checkout");
  }

  return (
    <C.ResumeContainer>
      <C.HeaderTitle>{title}</C.HeaderTitle>
      <C.Footer>
        <Icon />
        <C.Total>{value}</C.Total>
      </C.Footer>
      <C.Button onClick={() => handleCheckout()}>Gerar Orçamento</C.Button>
    </C.ResumeContainer>
  );
};

export default ResumeItem;
