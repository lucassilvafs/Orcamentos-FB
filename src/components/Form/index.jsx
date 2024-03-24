import React, { useState, useEffect, useRef } from "react";
import Grid from "../Grid";
import Resume from "../Resume";
import * as C from "./styles";
import CardItem from "../CardItem";
import CheckoutC from "../CheckoutC";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { PDFViewer } from "@react-pdf/renderer";
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { HiOutlineDownload, HiOutlinePrinter } from 'react-icons/hi';
import { FiShare2 } from 'react-icons/fi';
// import { saveAs } from "file-saver";

const ITEM_WIDTH = 230; // largura de cada item mais(+) o espaço entre eles;

const styles = {
  container: { width: '220px', borderRadius: '5px', padding: '15px 12px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" },
  flex: { width: '100%', display: 'flex', gap: '5px', alignItems: 'center' },
  bold: { fontSize: '13px', fontWeight: 600 },
  thin: { fontSize: '11px', color: '#6f6f6f', fontWeight: 500 },
  btn: { borderRadius: '3px', border: '1px solid gray', display: 'flex', alignItems: 'center', gap: '2px', padding: '3px', fontSize: '11px', color: '#4f4f4f', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }
}

const shareData = {
  title: 'Share', 
  text:  'whatevs',                 
  url:   'https://developer.mozilla.org'
};

const Form = ({ handleAdd, productsList, setProductsList, total, orderInfo, setOrderInfo }) => {
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
  const [reload, setReload] = useState(false);

  const db = getFirestore(Firebase);
  const productsCollectionRef = collection(db, "products");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleShare = () => {
    // if (!navigator.canShare) {
    //   // resultPara.textContent = "navigator.canShare() not supported.";
    //   console.log('navigator.canShare() not supported.');
    // } else if (navigator.canShare(shareData)) {
    //   // resultPara.textContent =
    //   //   "navigator.canShare() supported. We can use navigator.share() to send the data.";
    //   console.log('navigator.canShare() supported. We can use navigator.share() to send the data.');
    // } else {
    //   // resultPara.textContent = "Specified data cannot be shared.";
    //   console.log('Specified data cannot be shared.');
    // }


    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      console.log('nao deu');
    }
    // await saveAs(blob, `invoice.pdf`);
    // window.location.href = `mailto:?subject=${encodeURIComponent(`Invoice`)}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
}


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
  }, [reload]);

  const containerRef = useRef();
  const navigate = useNavigate();

  const handleChange = (target) => {
    setInputText(target.value);
    const products = dataProductsFilter.filter((product) => product.name.includes(inputText));
    setDataProductsFilter(products);
  }

  const handleAddInfo = (name) => {
    const product = dataProducts.find((product) => product.name === name);
    // console.log(product);
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

  const reloadPage = () => window.location.reload();

  const shareToWhatsApp = () => {
    let newURL = `https://api.whatsapp.com/send?text=https://firebasestorage.googleapis.com/v0/b/databasefb-6948c.appspot.com/o/Fortaleza%20Brindes.pdf?alt=media&token=de1f03ee-3a85-48c6-b2d3-fa0b362fb280`;
    window.open(newURL, "_blank");
  }

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

      <div style={{ display: "none" }}><CheckoutC ref={componentRef} /></div>
      <button onClick={shareToWhatsApp}>Print this out!</button>

      <C.Button 
        className='myWonderfulButton'
        onClick={handleShare}
      >
        Compartilhar
      </C.Button>

      <PDFDownloadLink document={<CheckoutC />} fileName='invoice.pdf'>
                    <div style={styles.btn}>
                        <HiOutlineDownload size={14} />
                        <span>Download</span>
                    </div>
                </PDFDownloadLink>

                <BlobProvider document={<CheckoutC />}>
                    {({ url, blob }) => (
                        <a href={url} target="_blank" style={styles.btn}>
                            <HiOutlinePrinter size={14} />
                            <span>Print</span>
                        </a>
                    )}
                </BlobProvider>


                <BlobProvider document={<CheckoutC />}>
                    {({ url, blob }) => (
                        <div style={styles.btn} onClick={() => handleShare(url, blob)} >
                            <FiShare2 size={14} />
                            <span>Share</span>
                        </div>
                    )}
                </BlobProvider>

      <Resume total={total} orderInfo={[clientName, production, payment]} reloadPage={reloadPage} />
    </>
  );
};

export default Form;
