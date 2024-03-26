import React, { useState, useRef } from "react";
import * as C from "./styles";
import { Modal } from 'antd';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

// const shareData = {
//   title: 'Share', 
//   text:  'whatevs',                 
//   url:   'https://developer.mozilla.org'
// };

const Resume = ({ total, reloadPage, handleCheckout }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const shareTarget = useRef(null);

  async function onShare(shareTarget) {
    if (!shareTarget.current) {
      return;
    }
    const canvas = await html2canvas(shareTarget.current);
    const dataUrl = canvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [new File([blob], 'htmldiv.png', { type: blob.type, lastModified: new Date().getTime() })];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData).then(() => {
      console.log('Shared successfully');
    });
  }

  //Create PDf from HTML...
function CreatePDFfromHTML(shareTarget) {
  var HTML_Width = shareTarget.current.width();
  var HTML_Height = shareTarget.current.height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + (top_left_margin * 2);
  var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas(shareTarget.current).then(function (canvas) {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (var i = 1; i <= totalPDFPages; i++) { 
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      }
      pdf.save("Your_PDF_Name.pdf");
      shareTarget.current.hide();
      navigator.share(pdf).then(() => {
        console.log('Shared successfully');
      });
  });
}

  // const handleShare = () => {
  //   if (navigator.share && navigator.canShare(shareData)) {
  //     navigator.share(shareData);
  //     return;
  //   }
  //   console.log('Não foi possível compartilhar :/');
  // }

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
        <C.ButtonDownload onClick={handleCheckout}>Gerar Orçamento</C.ButtonDownload>
        <C.ButtonShare onClick={() => onShare(shareTarget)}>Compartilhar Arquivo</C.ButtonShare>
        <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
