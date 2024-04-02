import React, { useState, useRef } from "react";
import * as C from "./styles";
import { Modal } from 'antd';
import { getStorage } from "firebase/storage";

const Resume = ({ total, reloadPage, handleCheckout }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const shareTarget = useRef(null);
  const storage = getStorage();

  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleConfirmDelete = () => {
    localStorage.removeItem('products');
    localStorage.removeItem('order');
    reloadPage();
    setOpenModalDelete(false);
  };

  return (
    <C.Container ref={shareTarget}>
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
          <C.Total>R$ {total}</C.Total>
        </C.Footer>
        <C.HeaderTitle>{ test }</C.HeaderTitle>
        <C.ButtonDownload onClick={handleCheckout}>Gerar Orçamento</C.ButtonDownload>
        <C.ButtonShare>Compartilhar Arquivo</C.ButtonShare>
        <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
