import React, { useState } from "react";
import * as C from "./styles";
import { Modal } from 'antd';

const shareData = {
  title: 'Share', 
  text:  'whatevs',                 
  url:   'https://developer.mozilla.org'
};

const Resume = ({ total, reloadPage, handleCheckout }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleShare = () => {
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
      return;
    }
    console.log('Não foi possível compartilhar :/');
  }

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
    <C.Container>
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
        <C.ButtonDownload onClick={handleCheckout}>Gerar Orçamento</C.ButtonDownload>
        <C.ButtonShare onClick={handleShare}>Compartilhar Arquivo</C.ButtonShare>
        <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
