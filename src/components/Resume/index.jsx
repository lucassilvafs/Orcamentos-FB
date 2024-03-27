import React, { useState, useRef } from "react";
import * as C from "./styles";
import { Modal } from 'antd';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Resume = ({ total, reloadPage, handleCheckout, clientName }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [test, setTest] = useState('nao apertou');

  const shareTarget = useRef(null);
  const storage = getStorage();

  // async function onShare(shareTarget) {
  //   if (!shareTarget.current) {
  //     return;
  //   }
  //   const canvas = await html2canvas(shareTarget.current);
  //   const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
  //   const blob = await (await fetch(dataUrl)).blob();
  //   const filesArray = [new File([blob], 'htmldiv.png', { type: blob.type, lastModified: new Date().getTime() })];
  //   console.log(dataUrl);
  //   console.log(blob);
  //   console.log(filesArray);
    
  //   const shareData = {
  //     files: filesArray,
  //   };
  //   navigator.share(shareData).then(() => {
  //     console.log('Shared successfully');
  //   });
  // }

  const getUrl = () => {
    console.log("cheguei");
    getDownloadURL(ref(storage, `orçamentos/${clientName}.pdf`))
      .then((url) => {
        const shareData = {
          title: `${clientName}.pdf`,
          url: url,
        };

        if (navigator.share && navigator.canShare(shareData)) {
          navigator.share(shareData)
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
          return;
        }

        console.log("Web Share API is not supported in your browser.");
        console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getPDF = (shareTarget) => {
		var HTML_Width = shareTarget.current.offsetWidth;
		var HTML_Height = shareTarget.current.offsetHeight;
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

		html2canvas(shareTarget.current,{allowTaint:true}).then(async function async(canvas) {
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

      const pdfBlob = pdf.output('blob');

      // const storageRef = Firebase.storage().ref();
      // const pdfRef = storageRef.child(`${clientName}.pdf`);
      const storageRef = ref(storage, `orçamentos/${clientName}.pdf`);

      uploadBytes(storageRef, pdfBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getUrl();
      });

      // setTimeout(() => {
      //   getUrl();
      // }, 3000);

      // try {
      //   const snapshot = await pdfRef.put(pdfBlob);
      //   console.log('PDF enviado com sucesso para o Firebase Storage.');
    
      //   // Obtém o URL de download do PDF
      //   const downloadURL = await snapshot.ref.getDownloadURL();
      //   console.log('URL de download do PDF:', downloadURL);

      //   const files = {
      //     title: `Orçamento-${clientName}`,
      //     url: downloadURL,
      //   };

      //   // Share PDF file if supported.
      //   if (navigator.share && navigator.canShare({ files })) {
      //     navigator.share({ files });
      //   } else {
      //     setTest(test === 'nao apertou' ? 'apertou' : 'nao apertou');
      //     console.log('apertouu');
      //   }
    
      //   // Faça o que quiser com o URL de download, como exibi-lo na interface do usuário ou armazená-lo em algum lugar.
      // } catch (error) {
      //   console.error('Erro ao enviar PDF para o Firebase Storage:', error);
      // }
    

      // const filesArray = [new File([blob], 'htmldiv.pdf', { type: blob.type, lastModified: new Date().getTime() })];

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

  // const handleShare = async () => {
  //   const response = await fetch("https://firebasestorage.googleapis.com/v0/b/databasefb-6948c.appspot.com/o/Fortaleza%20Brindes.pdf?alt=media&token=de1f03ee-3a85-48c6-b2d3-fa0b362fb280");
  //   const buffer = await response.arrayBuffer();
  
  //   const pdf = new File([buffer], "hello.pdf", { type: "application/pdf" });
  //   const files = [pdf];

  //   console.log(buffer);
  //   console.log(pdf);
  
  //   // Share PDF file if supported.
  //   if (navigator.canShare({ files })){
  //     navigator.share({ files });
  //   }
  // };

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
