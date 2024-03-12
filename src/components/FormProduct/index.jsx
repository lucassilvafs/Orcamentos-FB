import React, { useState, useEffect, useRef } from "react";
import GridProduct from "../GridProduct";
import * as C from "./styles";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection, doc, setDoc} from "firebase/firestore";

const ITEM_WIDTH = 200; // largura de cada item mais(+) o espaço entre eles;

const FormProduct = ({ handleAdd, productsList, setProductsList, total, orderInfo, setOrderInfo }) => {
  const [productName, setProductName] = useState("");
  const [quant, setQuant] = useState("");
  const [desc, setDesc] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataProductsFilter, setDataProductsFilter] = useState([]);
  const [inputText, setInputText] = useState('');

  const db = getFirestore(Firebase);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(productsCollectionRef);
      setDataProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setDataProductsFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [dataProducts]);

  const containerRef = useRef();

  // const handleChange = (target) => {
  //   setInputText(target.value);
  //   const products = dataProductsFilter.filter((product) => product.name.includes(inputText));
  //   setDataProductsFilter(products);
  // }

  // const handleAddInfo = (name) => {
  //   const product = dataProducts.find((product) => product.name === name);
  //   setProductName(product.name);
  //   setQuant(product.quant_min);
  //   setDesc(product.desc);
  //   setUnitValue(product.price.toFixed(2));
  // };

  // const handleScroll = (scrollAmount) => {
  //   const leng = dataProducts.length;
  //   const newScrollPosition = scrollPosition + scrollAmount;
  //   const max = (leng * ITEM_WIDTH) - (ITEM_WIDTH * 5);
  //   if (newScrollPosition < 0 || newScrollPosition > max){
  //     return;
  //   }

  //   setScrollPosition(newScrollPosition);
  //   containerRef.current.scrollLeft = newScrollPosition;
  // };

  const generateID = () => Math.round(Math.random() * 100);

  const handleSave = async () => {
    if (!productName || !quant) {
      alert("Informe o produto e a quantidade!");
      return;
    } else if (unitValue < 1 || quant < 1) {
      alert("Os valores tem que ser positivos!");
      return;
    }

    // const products = {
    //   id: generateID(),
    //   productName,
    //   desc,
    //   unitValue,
    //   quant,
    // };

    await setDoc(doc(db, "products", productName), {
      name: productName,
      desc: desc,
      price: unitValue,
      quant_min : quant,
    });

    // handleAdd(products);

    setProductName("");
    setDesc("");
    setUnitValue("");
    setQuant(""); 
  };

  return (
    <>
      <C.TopContainer>
      <C.InputContent>
          <C.Label>Nome do produto</C.Label>
          <C.Input value={productName} onChange={(e) => setProductName(e.target.value)} />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.InputDesc value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Valor unitário</C.Label>
          <C.Input
            value={unitValue}
            type="number"
            onChange={(e) => setUnitValue(e.target.value)}
          />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Quantidade mínima</C.Label>
          <C.Input
            value={quant}
            type="number"
            onChange={(e) => setQuant(e.target.value)}
          />
        </C.InputContent>
        <C.Button onClick={handleSave}>CADASTRAR</C.Button>
      </C.TopContainer>

      <C.GridContainer>
        <C.HeaderTitle>Produtos cadastrados</C.HeaderTitle>
        <GridProduct itens={dataProducts} setItens={setDataProducts} />
      </C.GridContainer>
    </>
  );
};

export default FormProduct;
