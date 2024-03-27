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
  const [test, setTest] = useState('nao apertou');

  const shareTarget = useRef(null);

  async function onShare(shareTarget) {
    if (!shareTarget.current) {
      return;
    }
    const canvas = await html2canvas(shareTarget.current);
    const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [new File([blob], 'htmldiv.png', { type: blob.type, lastModified: new Date().getTime() })];
    console.log(dataUrl);
    console.log(blob);
    console.log(filesArray);
    
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData).then(() => {
      console.log('Shared successfully');
    });
  }

  //Create PDf from HTML...
  function getPDF(shareTarget){

		var HTML_Width = shareTarget.current.offsetWidth;
		var HTML_Height = shareTarget.current.offsetHeight;
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

		html2canvas(shareTarget.current,{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			
			console.log(canvas.height+"  "+canvas.width);
			
			
			// var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var imgData = canvas.toDataURL("application/pdf", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		  pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width, PDF_Height);
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}
			
		  // pdf.save("HTML-Document.pdf");

      const blob = pdf.output('blob');
      console.log(blob);
      const filesArray = [new File([blob], 'htmldiv.pdf', { type: blob.type, lastModified: new Date().getTime() })];
      console.log(filesArray);
      const files = [filesArray];

      // Share PDF file if supported.
      if (navigator.share && navigator.canShare({ files })) {
        navigator.share({ files });
      } else {
        setTest('apertou');
        console.log('apertouu');
      }

      // const shareData = {
      //   file: blob,
      // };
      // if (navigator.share && navigator.canShare(shareData)) {
      //   navigator.share(shareData).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error));
      // } else {
      //   console.log("Web Share API is not supported in your browser.");
      // }
    });
	};

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
        <C.HeaderTitle>{ test }</C.HeaderTitle>
        <C.ButtonDownload onClick={handleCheckout}>Gerar Orçamento</C.ButtonDownload>
        <C.ButtonShare onClick={() => getPDF(shareTarget)}>Compartilhar Arquivo</C.ButtonShare>
        <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
      </C.ResumeContainer>
    </C.Container>
  );
};

export default Resume;
