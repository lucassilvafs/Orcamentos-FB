import React from "react";
import { useNavigate } from "react-router-dom";
import ResumeItem from "../ResumeItem";
import * as C from "./styles";
import {
  FaDollarSign,
} from "react-icons/fa";

const Resume = ({ total, orderInfo }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const arrayProducts = JSON.parse(localStorage.getItem('products'));
    const generateID = () => Math.round(Math.random() * 1000);

    const order = {
      id: generateID(),
      clientName: orderInfo[0],
      production: orderInfo[1],
      payment: orderInfo[2],
      products: arrayProducts,
      total:total
    };

    console.log(order);

    localStorage.setItem("order", JSON.stringify(order));
    return navigate("checkout");
  }

  return (
    <C.Container>
      {/* <ResumeItem title="Total" Icon={FaDollarSign} value={total} /> */}
      <C.ResumeContainer>
        <C.HeaderTitle>Total</C.HeaderTitle>
        <C.Footer>
          {/* <FaDollarSign /> */}
          <C.Total>R$ {total}</C.Total>
        </C.Footer>
        <C.Button onClick={() => handleCheckout()}>Gerar Orçamento</C.Button>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
