import React, { useState, useEffect, useRef } from "react";
import Grid from "../Grid";
import Resume from "../Resume";
import * as C from "./styles";
import Card from "../Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection } from "firebase/firestore";

const ITEM_WIDTH = 200; // largura de cada item mais(+) o espaço entre eles;

const SAMPLE_DATA = [
  { title: "01", price: "20.50" },
  { title: "02", price: "40.00" },
  { title: "03", price: "30.80" },
  { title: "04", price: "20.00" },
  { title: "05", price: "50.40" },
  { title: "06", price: "10.90" },
  { title: "07", price: "25.80" },
  { title: "08", price: "90.99" },
  { title: "09", price: "5.50" },
  { title: "10", price: "5.50" },
  { title: "11", price: "5.50" },
  { title: "12", price: "5.50" },
  { title: "13", price: "5.50" },
  { title: "14", price: "5.50" },
  { title: "15", price: "5.50" },
  { title: "16", price: "5.50" },
  { title: "17", price: "5.50" },
  { title: "18", price: "5.50" },
  { title: "19", price: "5.50" },
  { title: "20", price: "5.50" },
];

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
    };
    getData();

  //   switch(payment) {
  //     case 200:
  //         console.log("Esse é um aluno impressionador de Excel da Hashtag!");
  //     case "Power BI":
  //         console.log("Esse é um aluno impressionador de Power BI da Hashtag!");
  //     case "PowerPoint":
  //         console.log("Esse é um aluno impressionador de PowerPoint da Hashtag!");
  //     case "Python":
  //         console.log("Esse é um aluno impressionador de Python da Hashtag!");
  //     case "Html/CSS":
  //         console.log("Esse é um aluno impressionador de Html/CSS da Hashtag!");
  //     case "VBA":
  //         console.log("Esse é um aluno impressionador de VBA da Hashtag!");
  //     case "SQL":
  //         console.log("Esse é um aluno impressionador de SQL da Hashtag!");
  //     case "JavaScript":
  //         console.log("Esse é um aluno impressionador de JavaScript da Hashtag!");
  // }
  }, []);

  const containerRef = useRef();

  const handleAddInfo = (name) => {
    const product = dataProducts.find((product) => product.name === name);
    // console.log(product);
    setProductName(product.name);
    setQuant(product.quant_min);
    setDesc(product.desc);
    setUnitValue(product.price.toFixed(2));
  };

  const handleScroll = (scrollAmount) => {
    const leng = SAMPLE_DATA.length;
    const newScrollPosition = scrollPosition + scrollAmount;
    const max = (leng * ITEM_WIDTH) - (ITEM_WIDTH * 5);
    console.log("max: " + max);
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
    } else if (unitValue < 1 || quant < 1) {
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
        <C.CardContainer ref={containerRef}>
          { dataProducts.map((data) => {
            return (
              <Card 
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
      <Grid itens={productsList} setItens={setProductsList} />
      <Resume total={total} orderInfo={[clientName, production, payment]} />
    </>
  );
};

export default Form;
