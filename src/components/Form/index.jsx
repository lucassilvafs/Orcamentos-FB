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
import PdfFile from "../PDFFile";
import PdfFileMobile from "../PDFFileMobile";
import { Modal } from 'antd';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import logo from "../../images/logo.png";
import qrCode from "../../images/qr-code.png";
import "../PDFFile/styles.css";
import { useNavigate } from "react-router-dom";

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

  const storage = getStorage();

  const componentRef = useRef();
  const containerRef = useRef();
  const shareTarget = useRef(null);

  const navigate = useNavigate();

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
    // return navigate("checkout");
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

  // const getUrl = () => {
  //   console.log("cheguei");
  //   getDownloadURL(ref(storage, `orçamentos/${clientName}.pdf`))
  //     .then((url) => {
  //       const shareData = {
  //         title: `${clientName}.pdf`,
  //         url: url,
  //       };

  //       if (navigator.share && navigator.canShare(shareData)) {
  //         navigator.share(shareData)
  //         .then(() => console.log('Successful share'))
  //         .catch((error) => console.log('Error sharing', error));
  //         return;
  //       }

  //       console.log("Web Share API is not supported in your browser.");
  //       console.log(url);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // const getPDF = () => {
  //   const element = document.getElementById('child-component');
  //   var HTML_Width = element.offsetWidth;
	// 	var HTML_Height = element.offsetHeight;

	// 	// var HTML_Width = shareTarget.current.offsetWidth;
	// 	// var HTML_Height = shareTarget.current.offsetHeight;
	// 	var top_left_margin = 15;
	// 	var PDF_Width = HTML_Width+(top_left_margin*2);
	// 	var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
	// 	var canvas_image_width = HTML_Width;
	// 	var canvas_image_height = HTML_Height;
		
	// 	var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

	// 	html2canvas(element,{allowTaint:true}).then(async function async(canvas) {
	// 		canvas.getContext('2d');
			
	// 		console.log(canvas.height+"  "+canvas.width);
			
			
	// 		// var imgData = canvas.toDataURL("image/jpeg", 1.0);
  //     var imgData = canvas.toDataURL("image/jpeg", 1.0);
	// 		// var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
	// 	  // pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
	// 		// for (var i = 1; i <= totalPDFPages; i++) { 
	// 		// 	pdf.addPage(PDF_Width, PDF_Height);
	// 		// 	pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
	// 		// }
			
	// 	  // pdf.save("HTML-Document.pdf");

  //     // const pdfBlob = pdf.output('blob');
  //     const pdfBlob = imgData;

  //     // const storageRef = Firebase.storage().ref();
  //     // const pdfRef = storageRef.child(`${clientName}.pdf`);
  //     const storageRef = ref(storage, `orçamentos/${clientName}.jpg`);

  //     uploadBytes(storageRef, imgData).then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //       getUrl();
  //     });
  //   });
	// };

  // async function onShare() {
  //     const element = document.getElementById('content-id');
  //     if (!element) {
  //       return;
  //     }
  //     const canvas = await html2canvas(element);
  //     const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
  //     // const blob = await (await fetch(dataUrl)).blob();
  //     // const filesArray = [new File([blob], 'htmldiv', { type: blob.type, lastModified: new Date().getTime() })];
  //     // console.log(dataUrl);
  //     // console.log(blob);
  //     // console.log(filesArray);

  //     if (navigator.share) {
  //       await navigator.share({
  //         title: 'Compartilhar imagem',
  //         files: [dataUrl],
  //       });
  //       console.log('Imagem compartilhada com sucesso!');
  //     } else {
  //       throw new Error('Web Share API não é suportada neste navegador.');
  //     }
      
  //     // const shareData = {
  //     //   files: filesArray,
  //     // };
  //     // navigator.share(shareData).then(() => {
  //     //   console.log('Shared successfully');
  //     // });
  // }

  // const downloadPDF = async () => {
  //   try {
  //     // you can also pass React refs, e.g. `generatePDF(ref, options)`
  //     const pdf = await generatePDF(() => document.getElementById("container"), {
  //       method: "build",
  //       filename: "function-example.pdf",
  //       page: { margin: Margin.MEDIUM },
  //     });
  //     console.log(pdf);
  //     const pdfFile = new File([pdf], 'generated_pdf.pdf', { type: 'application/pdf' });
  //     console.log(pdfFile);
  //     // const pdfBlob = pdfFile.output('blob');

  //     const storageRef = ref(storage, `orçamentos/generated_pdf.pdf`);

  //     uploadBytes(storageRef, pdfFile).then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //       // getUrl();
  //     });

  //     // if (navigator.share) {
  //     //   await navigator.share({
  //     //     files: [pdfFile],
  //     //   });
  //     // } else {
  //     //   alert('Web Share API is not supported in this browser.');
  //     // }
  //   } catch (error) {
  //     console.error('Error sharing PDF:', error);
  //   }
  // };

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

  const handleShare = async() => {
    const element = document.getElementById('content-id');
    if (!element) {
      return;
    }
  
    const canvas = await html2canvas(element, {
      onclone: function (clonedDoc) {
        const hiddenDiv = clonedDoc.getElementById('content-id');
        hiddenDiv.style.display = 'block';
      }
    });
    canvas.getContext('2d');
    const dataUrl = canvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [new File([blob], 'orçamento.png', { type: blob.type, lastModified: new Date().getTime() })];
    const shareData = {
      title: `Orçamento - ${order.clientName}`,
      files: filesArray,
    };
    navigator.share(shareData).then(() => {
      console.log('Shared successfully');
    });
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

      <div style={{ display:"none" }}>
        <PdfFile props={rerender} ref={componentRef} />
      </div>

      {/* <div id="content-id" style={{ display:"none" }}> */}
        <PdfFileMobile id="content-id" style={{ display:"none" }} props={rerender} />
      {/* </div> */}
      
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
          <C.HeaderTitleResume>Total</C.HeaderTitleResume>
          <C.Footer>
            <C.Total>R$ {total}</C.Total>
          </C.Footer>
          <C.ButtonDownload onClick={handleCheckout}>Gerar Orçamento</C.ButtonDownload>
          <C.ButtonShare onClick={handleShare}>Compartilhar Arquivo</C.ButtonShare>
          <C.ButtonErase onClick={handleOpenModalDelete}>Apagar Tudo</C.ButtonErase>
        </C.ResumeContainer>
      </C.ResumeDiv>
    </>
  );
};

export default Form;
