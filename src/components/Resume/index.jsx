import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeItem from "../ResumeItem";
import * as C from "./styles";
import { Modal } from 'antd';
import {
  FaDollarSign,
} from "react-icons/fa";

const Resume = ({ total, orderInfo, reloadPage }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoryIdDelete, setCategoryIdDelete] = useState();

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
    localStorage.setItem("order", JSON.stringify(order));
    return navigate("checkout");
  }

  const handleEraseAll = () => {
    localStorage.removeItem('products');
    localStorage.removeItem('order');
  }

  const handleOnClickCategory = () => {
    // navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  const handleOpenModalDelete = () => {
    // setCategoryIdDelete(categoryId);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    // setCategoryIdDelete(undefined);
    setOpenModalDelete(false);
  };

  const handleConfirmDelete = () => {
    // setCategoryIdDelete(undefined);
    localStorage.removeItem('products');
    localStorage.removeItem('order');
    reloadPage();
    setOpenModalDelete(false);
  };

  return (
    <C.Container>
      {/* <ResumeItem title="Total" Icon={FaDollarSign} value={total} /> */}
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja apagar tudo?</p>
      </Modal>
      <C.ResumeContainer>
        <C.HeaderTitle>Total</C.HeaderTitle>
        <C.Footer>
          {/* <FaDollarSign /> */}
          <C.Total>R$ {total}</C.Total>
        </C.Footer>
        <C.Button onClick={() => handleCheckout()}>Gerar Orçamento</C.Button>
        <C.ButtonErase onClick={() => handleOpenModalDelete()}>Apagar Tudo</C.ButtonErase>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
