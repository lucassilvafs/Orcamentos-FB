import React, { useState, useEffect, useRef } from "react";
import Grid from "../Grid";
import Resume from "../Resume";
import * as C from "./styles";
import CardItem from "../CardItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection } from "firebase/firestore";
import { useReactToPrint } from 'react-to-print';
import generatePDF, { usePDF, Margin } from 'react-to-pdf';
// import ReactToPdf, { usePDF } from 'react-to-pdf';
import PdfFile from "../PdfFile";
import { Modal } from 'antd';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import logo from "../../images/logo.png";
import qrCode from "../../images/qr-code.png";
import "../PdfFile/styles.css";

const db = getFirestore(Firebase);
const productsCollectionRef = collection(db, "products");
const ITEM_WIDTH = 230; // largura de cada item mais o espaço entre eles;

const Form = ({ handleAdd, productsList, setProductsList, total, orderInfo }) => {
  const [clientName, setClientName] = useState("");
  const [productName, setProductName] = useState("");
  const [quant, setQuant] = useState("");
  const [desc, setDesc] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [production, setProduction] = useState();
  const [payment, setPayment] = useState("Pix");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataProductsFilter, setDataProductsFilter] = useState([]);
  const [inputText, setInputText] = useState('');
  const [rerender, setRerender] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [test, setTest] = useState('nao apertou');

  const storage = getStorage();

  const componentRef = useRef();
  const containerRef = useRef();
  const shareTarget = useRef(null);

  // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  // const targetRef = useRef();

  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const day = new Date().getDate();
  const actualMonth = new Date().getMonth() + 1;
  const monthData = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const year = new Date().getFullYear();
  const month = monthData[actualMonth-1];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('order'));
    if (data) {
      setOrder(data);
      setProducts(data.products);
    }

    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    if(orderInfo) {
      setClientName(orderInfo.clientName);
      setProduction(orderInfo.production);
    }

    const getData = async () => {
      const data = await getDocs(productsCollectionRef);
      setDataProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setDataProductsFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  const handleSharePDF = async () => {
    // try {
    //   const pdfBlob = await ReactToPdf.componentExport(shareTarget.current, { fileName: 'generated_pdf' });
    //   const pdfFile = new File([pdfBlob], 'generated_pdf.pdf', { type: 'application/pdf' });

    //   if (navigator.share) {
    //     await navigator.share({
    //       files: [pdfFile],
    //     });
    //   } else {
    //     alert('Web Share API is not supported in this browser.');
    //   }
    // } catch (error) {
    //   console.log('Error generating PDF:', error);
    // }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCheckout = () => {
    const arrayProducts = JSON.parse(localStorage.getItem('products'));
    const generateID = () => Math.round(Math.random() * 1000);

    const order = {
      id: generateID(),
      clientName,
      production,
      payment,
      products: arrayProducts,
      total:total
    };
    localStorage.setItem("order", JSON.stringify(order));

    setRerender(!rerender);

    setTimeout(() => handlePrint(), 1000);
  }

  const handleChange = (target) => {
    setInputText(target.value);
    const products = dataProductsFilter.filter((product) => product.name.includes(inputText));
    setDataProductsFilter(products);
  }

  const handleAddInfo = (name) => {
    const product = dataProducts.find((product) => product.name === name);
    setProductName(product.name);
    setQuant(product.quant_min);
    setDesc(product.desc);
    setUnitValue(Number(product.price).toFixed(2));
  };

  const handleScroll = (scrollAmount) => {
    const leng = dataProducts.length;
    const newScrollPosition = scrollPosition + scrollAmount;
    const max = (leng * ITEM_WIDTH) - (ITEM_WIDTH * 5);
    if (newScrollPosition < 0 || newScrollPosition > max){
      return;
    }

    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  const generateID = () => Math.round(Math.random() * 100);

  const handleSave = () => {
    if (!productName || !quant) {
      alert("Informe o produto e a quantidade!");
      return;
    }
    
    if (unitValue < 1 || quant < 1) {
      alert("Os valores tem que ser positivos!");
      return;
    }

    const products = {
      id: generateID(),
      productName,
      desc,
      unitValue,
      quant,
      total: unitValue * quant,
    };

    handleAdd(products);

    setProductName("");
    setDesc("");
    setUnitValue("");
    setQuant(""); 
  };

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

  const getPDF = () => {
    const element = document.getElementById('child-component');
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
		

		html2canvas(element,{allowTaint:true}).then(async function async(canvas) {
			canvas.getContext('2d');
			
			console.log(canvas.height+"  "+canvas.width);
			
			
			// var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
			// var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		  // pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
			// for (var i = 1; i <= totalPDFPages; i++) { 
			// 	pdf.addPage(PDF_Width, PDF_Height);
			// 	pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			// }
			
		  // pdf.save("HTML-Document.pdf");

      // const pdfBlob = pdf.output('blob');
      const pdfBlob = imgData;

      // const storageRef = Firebase.storage().ref();
      // const pdfRef = storageRef.child(`${clientName}.pdf`);
      const storageRef = ref(storage, `orçamentos/${clientName}.jpg`);

      uploadBytes(storageRef, imgData).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getUrl();
      });
    });
	};

  async function onShare() {
      const element = document.getElementById('child-component');
      if (!element) {
        return;
      }
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      const blob = await (await fetch(dataUrl)).blob();
      const filesArray = [new File([blob], 'htmldiv', { type: blob.type, lastModified: new Date().getTime() })];
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

  const downloadPDF = () => {
    // you can also pass React refs, e.g. `generatePDF(ref, options)`
    generatePDF(() => document.getElementById("container"), {
      method: "open",
      filename: "function-example.pdf",
      page: { margin: Margin.MEDIUM },
    });
  };

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

  const reloadPage = () => window.location.reload();

  return (
    <>
      <C.TopContainer>
        <C.InputContent>
          <C.Label>Nome do cliente</C.Label>
          <C.TopInput value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Tempo de produção</C.Label>
          <C.TopInput 
            value={production}
            type="number"
            onChange={(e) => setProduction(e.target.value)}
          />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Tipo de pagamento</C.Label>
          <C.Select name="selectedPay" onChange={(e) => setPayment(e.target.value)}>
            <C.Option value="Pix">Pix</C.Option>
            <C.Option value="Transferência">Transferência</C.Option>
          </C.Select>
        </C.InputContent>
      </C.TopContainer>

      <C.Container>
        <C.InputContent>
          <C.Label>Nome do produto</C.Label>
          <C.Input value={productName} onChange={(e) => setProductName(e.target.value)} />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.InputDesc value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Valor Unitário</C.Label>
          <C.Input
            value={unitValue}
            type="number"
            onChange={(e) => setUnitValue(e.target.value)}
          />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Quantidade</C.Label>
          <C.Input
            value={quant}
            type="number"
            onChange={(e) => setQuant(e.target.value)}
          />
        </C.InputContent>
        <C.Button onClick={handleSave}>ADICIONAR</C.Button>
      </C.Container>
      
      <C.ItemsContainer>
        <C.HeaderTitle>Lista de produtos</C.HeaderTitle>
        <C.InputSearch
          onChange={ ({ target }) => handleChange(target) }
          placeholder="Procurar"
        />
        <C.CardContainer ref={containerRef}>
          { (inputText ? dataProductsFilter : dataProducts).map((data) => {
            return (
              <CardItem 
                key={data.name}
                name={data.name} 
                price={data.price}
                quantMin={data.quant_min} 
                handleAddInfo={handleAddInfo}/>
            )
          }) }
        </C.CardContainer>
        <C.ButtonContainer>
          <C.ButtonScroll onClick={() => handleScroll(-ITEM_WIDTH)}><FaAngleLeft style={{ height:"20px", width:"20px" }} /></C.ButtonScroll>
          <C.ButtonScroll onClick={() => handleScroll(ITEM_WIDTH)}><FaAngleRight style={{ height:"20px", width:"20px" }}/></C.ButtonScroll>
        </C.ButtonContainer>
      </C.ItemsContainer>

      <C.GridContainer>
        <Grid itens={productsList} setItens={setProductsList} />
      </C.GridContainer>

      {/* <ReactToPdf targetRef={componentRef} filename="generated_pdf">
      {({ toPdf }) => 
            <button onClick={toPdf} className="get_started">
              Download
            </button>
          }
      </ReactToPdf> */}
      {/* <PdfFile props={rerender} ref={componentRef} /> */}
      <button onClick={handleSharePDF}>Share PDF</button>

      <C.Button onClick={downloadPDF}>Download PDF</C.Button>
      <div id="container">
        <PdfFile props={rerender} ref={componentRef} />
      </div>

      {/* <button onClick={() => toPDF()}>Download PDF</button> */}
      {/* <div style={{ display:"none" }}><PdfFile props={rerender} ref={componentRef} /></div> */}

      {/* <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>Download PDF </button> */}
      {/* <div ref={targetRef}>
        Content to be included in the PDF
      </div> */}
      
      {/* <div ref={targetRef}><PdfFile props={rerender} ref={componentRef} /></div> */}
      
      <C.ResumeDiv ref={shareTarget}>
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
          <C.ButtonShare onClick={onShare}>Compartilhar Arquivo</C.ButtonShare>
          <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
        </C.ResumeContainer>
      </C.ResumeDiv>

      {/* <div ref={shareTarget} style={{ display:"none" }}>
        <PdfFile props={rerender} getPDF={getPDF} handleCheckout={handleCheckout} ref={componentRef} />
      </div> */}

      {/* <div id="child-component" ref={ref} className="container">
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
      </footer>
    </div> */}

      {/* <Resume 
        total={total} 
        reloadPage={reloadPage}
        handleCheckout={handleCheckout}
        shareTarget={shareTarget}
        clientName={clientName}
      /> */}
    </>
  );
};

export default Form;
