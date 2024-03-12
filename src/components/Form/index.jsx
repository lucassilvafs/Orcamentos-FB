import React, { useState, useEffect, useRef } from "react";
import Grid from "../Grid";
import Resume from "../Resume";
import * as C from "./styles";
import CardItem from "../CardItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection } from "firebase/firestore";

const ITEM_WIDTH = 230; // largura de cada item mais(+) o espaço entre eles;

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

  const db = getFirestore(Firebase);
  const productsCollectionRef = collection(db, "products");

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

  const containerRef = useRef();

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
    setUnitValue(product.price.toFixed(2));
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
          <C.Label>
            Tipo de pagamento
          </C.Label>
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
        <C.HeaderTitle>Produtos</C.HeaderTitle>
        <C.Input
          onChange={ ({ target }) => handleChange(target) }
          placeholder="Procurar"
        />
        <C.CardContainer ref={containerRef}>
          { (inputText ? dataProductsFilter : dataProducts).map((data) => {
            return (
              <CardItem 
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
      <Resume total={total} orderInfo={[clientName, production, payment]} />
    </>
  );
};

export default Form;
