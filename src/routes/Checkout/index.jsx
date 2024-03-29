import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import logo from "../../images/logo.png";
import qrCode from "../../images/qr-code.png";
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ReactToPdf from 'react-to-pdf';
import { PDFViewer, PDFDownloadLink, usePDF, Document, Page, pdf } from '@react-pdf/renderer';
import PDFButton from '../../components/PDFButton';

const Checkout = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const day = new Date().getDate();
  const actualMonth = new Date().getMonth() + 1;
  const monthData = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const year = new Date().getFullYear();
  const month = monthData[actualMonth-1];

  const componentRef = useRef();
  const storage = getStorage();

  // you can use a function to return the target element besides using React refs
  const getTargetElement = () => document.getElementById('content-id');

  const handleGeneratePDF = async (toPdf) => {
    try {
      const options = {
        method: 'build',
        fileName: 'generated_pdf', // Nome do arquivo PDF
        page: { margin: 10 }, // Margens da página
        scale: 1.5, // Escala do PDF
        image: { type: 'jpeg', quality: 0.98 }, // Configurações de imagem
        html2canvas: { scale: 2 }, // Configurações do html2canvas
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }, // Configurações do jsPDF
      };

      // const pdfBlob = await toPdf(options); // Passando as opções para gerar o PDF
      const pdfBlob = generatePDF(getTargetElement, options);
      console.log(pdfBlob);
      const storageRef = ref(storage, 'orçamentos/teste.pdf');

      uploadBytes(storageRef, pdfBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        // getUrl();
      }); // Upload do PDF para o Firebase Storage
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // const uploadPDFToFirebase = async (pdfBlob) => {
  //   try {
  //     const storageRef = firebase.storage().ref();
  //     const pdfRef = storageRef.child('generated_pdf.pdf');
  //     await pdfRef.put(pdfBlob);
  //     console.log('PDF uploaded successfully to Firebase Storage.');
  //   } catch (error) {
  //     console.error('Error uploading PDF to Firebase Storage:', error);
  //   }
  // };


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('order'));
    if (data) {
      setOrder(data);
      setProducts(data.products);
    }

    setIsLoading(true);
  }, [setIsLoading]);

  const handleCheckout = () => {
    window.print();
  }

  const downloadPDF = () => {
    // you can also pass React refs, e.g. `generatePDF(ref, options)`
    generatePDF(getTargetElement, {
      method: "open",
      filename: "function-example.pdf",
      page: { margin: Margin.SMALL },
    });
  };

  const options = {
    // default is `save`
    method: 'open',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    // resolution: Resolution.HIGH,
    page: {
        // margin is in MM, default is Margin.NONE = 0
        margin: Margin.SMALL,
        // default is 'A4'
        // format: 'letter',
        // default is 'portrait'
        // orientation: 'landscape',
    },
    canvas: {
        // default is 'image/jpeg' for better size performance
        mimeType: 'image/png',
        qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
        // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
        pdf: {
          compress: true
        },
        // see https://html2canvas.hertzen.com/configuration for more options
        canvas: {
          useCORS: true
        }
    },
  };

  // const MyDoc = (
  //   <Document>
  //   <Page>
  //   <div>
  //   {/* <PDFButton targetRef={componentRef}>Save to PDF!</PDFButton> */}
  //   <div id="content-id" className="container">
  //     <header className="header">
  //       <img src={logo} className="logo" alt="logo da Fortaleza Brindes" />
  //       <section className="header-info">
  //         <h1 className="header-title">Fortaleza Brindes</h1>
  //         <p>Tel.: (85) 98837.1988 / 98687.8690</p>
  //         <p>contato@fortalezabrindes.com.br</p>
  //         <p>www.fortalezabrindes.com.br</p>
  //         <p><em>Instagram: </em>@fortaleza_brindes</p>
  //         <p>Rua Elizabete pio Quintanilha, 123 - Vicente Pinzon</p>
  //       </section>
  //     </header>
  //     _______________________________________________________________________________________
  //     <main>
  //       <section className="order-info">
  //         <h4>Segue nossa proposta conforme solicitado:</h4>
  //         <table className="table-items">
  //           <thead>
  //             <tr>
  //               <th className="td-table">Quantidade</th>
  //               <th className="desc-table">Produto/Serviço</th>
  //               <th className="td-table">Valor Unitário</th>
  //               <th className="td-table">Valor Total</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             { isLoading && products.map((product, index) => (
  //                 <tr key={index}>
  //                   <td>{product.quant}</td>
  //                   <td>{product.desc}</td>
  //                   <td>R$ {Number(product.unitValue).toFixed(2)}</td>
  //                   <td>R$ {Number(product.total).toFixed(2)}</td>
  //                 </tr>
  //               ))
  //             }
  //           </tbody>
  //         </table>
  //         <p className="client-info">
  //           <strong>* Cliente:</strong> {order.clientName}
  //         </p>
  //         <p>
  //           <strong>* Valor total do pedido: R$ {order.total}</strong>
  //         </p>
  //         <p>
  //           <strong>* Tempo de produção:</strong> {order.production} dias úteis
  //         </p>
  //         <p>
  //           <strong>* Tipo de pagamento: </strong> {order.payment}
  //         </p>
  //         <p>
  //           <strong>* Forma de pagamento: </strong> 50% no fechamento e o restante quando o material tiver pronto
  //         </p>
  //         <p>
  //           <strong>* OBS: Este orçamento tem validade de 15 dias. Após este período, favor consulte-nos novamente. Todos os preços informados estão expressos em Reais (R$) e são exclusivos para este orçamento. O serviço será executado no País: BRASIL, Estado: CEARÁ, Cidade: FORTALEZA. </strong>
  //         </p>
  //       </section>
  //       <section className="payment-info">
  //         <img src={qrCode} className="qr-code" alt="qr-code para pagamentos" />
  //         <div>
  //           <h3>DADOS BANCÁRIOS</h3>
  //           <p>
  //             <strong>BANCO: </strong> <span style={{ color: "red" }}>NUBANK</span>
  //           </p>
  //           <p>
  //             <strong>AGÊNCIA: </strong> <span style={{ color: "red" }}>0001</span>
  //           </p>
  //           <p>
  //             <strong>CONTA: </strong> <span style={{ color: "red" }}>61349433-7</span>
  //           </p>
  //           <p>
  //             <strong>RAZÃO SOCIAL: </strong> FB Brindes - <span style={{ color: "red" }}>Ana Carolini de Sousa Silva</span>
  //           </p>
  //         </div>
  //       </section>
  //     </main>
  //     <footer className="footer">
  //       <p>
  //         Fortaleza, {day} de {month} de {year}
  //       </p>
  //       <p>
  //         Atenciosamente,
  //       </p>
  //       <div className="container-footer-info">
  //         <p>
  //           Fortaleza Brindes
  //         </p>
  //         <p>
  //           CNPJ: 51.575.023/0001-65
  //         </p>
  //         <p>
  //           Inscrição Municipal: 841.922-2
  //         </p>
  //       </div>
  //       <p>
  //         www.fortalezabrindes.com.br | 2024
  //       </p>
  //       {/* <button type="button" className="btn-pdf" onClick={downloadPDF}>Baixar PDF</button> */}
  //     </footer>
  //   </div>
  //   </div>
  //   </Page>
  // </Document>
  // );

  const { toPDF, targetRef } = usePDF(options);
  // const [instance, updateInstance] = usePDF({ document: MyDoc });
  // const blob = pdf(MyDoc).toBlob();

  // const printDocument = () => {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 0, 0);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("download.pdf");
  //     })
  //   ;
  // }
  {/* <a href={instance.url} download="test.pdf">
  Download
  </a> */}
  {/* <p>{instance.blob}</p> */}
{/* <PDFButton targetRef={componentRef}>Save to PDF!</PDFButton> */}

  const getUrl = () => {
    console.log("cheguei");
    getDownloadURL(ref(storage, `orçamentos/${order.clientName}`))
      .then((url) => {
        const shareData = {
          title: `${order.clientName}.pdf`,
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

  const getPDF = () => {
    const element = document.getElementById('content-id');
    var HTML_Width = element.offsetWidth;
    var HTML_Height = element.offsetHeight;

    // var HTML_Width = shareTarget.current.offsetWidth;
    // var HTML_Height = shareTarget.current.offsetHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas(element,{allowTaint:true}).then(async function (canvas) {
      canvas.getContext('2d');
      
      console.log(canvas);
      console.log(toString(canvas.height), toString(canvas.width));
      
      
      // var imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      // console.log(imgData);
      // element.appendChild(canvas);
      // const blob = await (await fetch(imgData)).blob();
      // console.log(blob);
      // const filesArray = [new File([blob], 'htmldiv.jpeg', { type: blob.type, lastModified: new Date().getTime() })];
      // console.log(filesArray);
      // const shareData = {
      //   files: filesArray,
      // };
      // navigator.share(shareData).then(() => {
      //   console.log('Shared successfully');
      // });
      var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
      
      console.log(PDF_Width, PDF_Height);
      console.log(toString(PDF_Width), toString(PDF_Height));
      
      for (var i = 1; i <= totalPDFPages; i++) { 
        pdf.addPage(toString(PDF_Width), toString(PDF_Height = PDF_Height + 20));
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*3),canvas_image_width,canvas_image_height);
      }
      
      // pdf.save("HTML-Document.pdf");

      const pdfBlob = pdf.output('blob');
      // const pdfBlob = imgData;

      // const storageRef = Firebase.storage().ref();
      // const pdfRef = storageRef.child(`${clientName}.pdf`);
      const storageRef = ref(storage, `orçamentos/${order.clientName}`);

      uploadBytes(storageRef, pdfBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getUrl();
      });
    });
  };

  const shareButton = async () => {
    try {
      await navigator.share({ title: "Example Page", url: "" });
      console.log("Data was shared successfully");
    } catch (err) {
      console.error("Share failed:", err.message);
    }
  };

  async function onSharee() {
    const element = document.getElementById('content-id');
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
    const data = {
      files: [
        new File([dataUrl], 'image.png', {
          type: dataUrl.type,
        }),
      ],
      title: 'My title',
      text: 'My text',
    };
    // const blob = await (await fetch(dataUrl)).blob();
    // const filesArray = [new File([blob], 'htmldiv', { type: blob.type, lastModified: new Date().getTime() })];
    // console.log(dataUrl);
    // console.log(blob);
    // console.log(filesArray);
    console.log(data);
    if (navigator.canShare(data)) {
      await navigator.share(data);
      console.log('Imagem compartilhada com sucesso!');
    } else {
      throw new Error('Web Share API não é suportada neste navegador.');
    }

    // if (navigator.share) {
    //   await navigator.share({
    //     title: 'Compartilhar imagem',
    //     files: [dataUrl],
    //   });
    //   console.log('Imagem compartilhada com sucesso!');
    // } else {
    //   throw new Error('Web Share API não é suportada neste navegador.');
    // }
    
    // const shareData = {
    //   files: filesArray,
    // };
    // navigator.share(shareData).then(() => {
    //   console.log('Shared successfully');
    // });
}

const shareTarget = React.useRef(null);

async function onShare(shareTarget) {
  const element = document.getElementById('content-id');
  if (!element) {
    console.log('nao deu :/');
    return;
  }
  // const imageWidth = shareTarget.current.offsetWidth + 10;
  // console.log();

  const canvas = await html2canvas(element, {
    allowTaint:true,
    onclone: function (clonedDoc) {
      const hiddenDiv = clonedDoc.getElementById('content-id');
      hiddenDiv.style.display = 'block';
    }
  });
  console.log(canvas);
  element.appendChild(canvas);
  const dataUrl = canvas.toDataURL();
  console.log(dataUrl);
  const blob = await (await fetch(dataUrl)).blob();
  console.log(blob);
  const filesArray = [new File([blob], 'orçamento.png', { type: blob.type, lastModified: new Date().getTime() })];
  console.log(filesArray);
  const shareData = {
    title: `Orçamento - ${order.clientName}`,
    files: filesArray,
  };
  navigator.share(shareData).then(() => {
    console.log('Shared successfully');
  });
}

function makePDF() {
  var quotes = document.getElementById('content-id');

  html2canvas(quotes).then((canvas) => {
    //! MAKE YOUR PDF
    var pdf = new jsPDF('p', 'pt', 'letter');

    for (var i = 0; i <= quotes.clientHeight / 980; i++) {
      //! This is all just html2canvas stuff
      var srcImg = canvas;
      var sX = 0;
      var sY = 980 * i; // start 980 pixels down for every new page
      var sWidth = 900;
      var sHeight = 980;
      var dX = 0;
      var dY = 0;
      var dWidth = 900;
      var dHeight = 980;

      var onePageCanvas = document.createElement("canvas");
      onePageCanvas.setAttribute('width', 900);
      onePageCanvas.setAttribute('height', 980);
      var ctx = onePageCanvas.getContext('2d');
      // details on this usage of this function:
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
      ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

      var width = onePageCanvas.width;
      var height = onePageCanvas.clientHeight;

      //! If we're on anything other than the first page,
      // add another page
      if (i > 0) {
        pdf.addPage('612', '791'); //8.5" x 11" in pts (in*72)
      }
      //! now we declare that we're working on that page
      pdf.setPage(i + 1);
      //! now we add content to that page!
      pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));
    }

    //! after the for loop is finished running, we save the pdf.
    var pdfBlob = pdf.output('blob'); // Converte o PDF para um blob

    const storageRef = ref(storage, `teste.png`);

      uploadBytes(storageRef, pdfBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        // getUrl();
      }); // Envia o blob do PDF para o Firebase Storage
  });
}

  return (
    <div>
      <button type="button" className="btn-pdf" onClick={makePDF}>makePDF</button>
      <button type="button" className="btn-pdf" onClick={onShare}>on share</button>
      <button type="button" className="btn-pdf" onClick={shareButton}>PDFffff</button>
      <button className="btn-pdf" onClick={() => onShare(shareTarget)}>Share Image</button>
      <button type="button" className="btn-pdf" onClick={downloadPDF}>Baixar PDF</button>
      <button type="button" className="btn-pdf" onClick={getPDF}>get PDF</button>
      <button onClick={() => toPDF()}>To PDF</button>
      <button onClick={() => generatePDF(getTargetElement, options)}>Generate PDF</button>
      <div id="content-id" ref={shareTarget} className="container">
        <header className="header">
          <img src={logo} className="logo" alt="logo da Fortaleza Brindes" />
          <section className="header-info">
            <h1 className="header-title">Fortaleza Brindes</h1>
            <p>Tel.: (85) 98837.1988 / 98687.8690</p>
            <p>contato@fortalezabrindes.com.br</p>
            <p>www.fortalezabrindes.com.br</p>
            <p><em>Instagram: </em>@fortaleza_brindes</p>
            <p>Rua Elizabete pio Quintanilha, 123 - Vicente Pinzon</p>
          </section>
        </header>
        _______________________________________________________________________________________
        <main>
          <section className="order-info">
            <h4>Segue nossa proposta conforme solicitado:</h4>
            <table className="table-items">
              <thead>
                <tr>
                  <th className="td-table">Quantidade</th>
                  <th className="desc-table">Produto/Serviço</th>
                  <th className="td-table">Valor Unitário</th>
                  <th className="td-table">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                { isLoading && products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.quant}</td>
                      <td>{product.desc}</td>
                      <td>R$ {Number(product.unitValue).toFixed(2)}</td>
                      <td>R$ {Number(product.total).toFixed(2)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <p className="client-info">
              <strong>* Cliente:</strong> {order.clientName}
            </p>
            <p>
              <strong>* Valor total do pedido: R$ {order.total}</strong>
            </p>
            <p>
              <strong>* Tempo de produção:</strong> {order.production} dias úteis
            </p>
            <p>
              <strong>* Tipo de pagamento: </strong> {order.payment}
            </p>
            <p>
              <strong>* Forma de pagamento: </strong> 50% no fechamento e o restante quando o material tiver pronto
            </p>
            <p>
              <strong>* OBS: Este orçamento tem validade de 15 dias. Após este período, favor consulte-nos novamente. Todos os preços informados estão expressos em Reais (R$) e são exclusivos para este orçamento. O serviço será executado no País: BRASIL, Estado: CEARÁ, Cidade: FORTALEZA. </strong>
            </p>
          </section>
          <section className="payment-info">
            <img src={qrCode} className="qr-code" alt="qr-code para pagamentos" />
            <div>
              <h3>DADOS BANCÁRIOS</h3>
              <p>
                <strong>BANCO: </strong> <span style={{ color: "red" }}>NUBANK</span>
              </p>
              <p>
                <strong>AGÊNCIA: </strong> <span style={{ color: "red" }}>0001</span>
              </p>
              <p>
                <strong>CONTA: </strong> <span style={{ color: "red" }}>61349433-7</span>
              </p>
              <p>
                <strong>RAZÃO SOCIAL: </strong> FB Brindes - <span style={{ color: "red" }}>Ana Carolini de Sousa Silva</span>
              </p>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p>
            Fortaleza, {day} de {month} de {year}
          </p>
          <p>
            Atenciosamente,
          </p>
          <div className="container-footer-info">
            <p>
              Fortaleza Brindes
            </p>
            <p>
              CNPJ: 51.575.023/0001-65
            </p>
            <p>
              Inscrição Municipal: 841.922-2
            </p>
          </div>
          <p>
            www.fortalezabrindes.com.br | 2024
          </p>
          {/* <button type="button" className="btn-pdf" onClick={downloadPDF}>Baixar PDF</button> */}
        </footer>
      </div>
    </div>
  );
};

export default Checkout;
