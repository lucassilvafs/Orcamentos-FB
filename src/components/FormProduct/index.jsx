import React, { useState, useEffect, useRef } from "react";
import GridProduct from "../GridProduct";
import * as C from "./styles";
import { FaSyncAlt } from "react-icons/fa";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection, doc, setDoc, updateDoc} from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from 'antd';

const ITEM_WIDTH = 200; // largura de cada item mais(+) o espaço entre eles;

const FormProduct = ({ handleAdd, productsList, setProductsList, total, orderInfo, setOrderInfo }) => {
  const [productName, setProductName] = useState("");
  const [quant, setQuant] = useState("");
  const [desc, setDesc] = useState("");
  const [unitValue, setUnitValue] = useState("");

  const [modalProductName, setmodalProductName] = useState("");
  const [modalQuant, setmodalQuant] = useState("");
  const [modalDesc, setmodalDesc] = useState("");
  const [modalUnitValue, setmodalUnitValue] = useState("");

  const [scrollPosition, setScrollPosition] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataProductsFilter, setDataProductsFilter] = useState([]);
  const [inputText, setInputText] = useState('');
  const [load, setLoad] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameToSearch, setNameToSearch] = useState('');
  const [modalTextOK, setModalTextOK] = useState('Confirmar');

  const db = getFirestore(Firebase);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(productsCollectionRef);
      setDataProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setDataProductsFilter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [load]);

  const containerRef = useRef();
  const navigate = useNavigate();

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
    }
    
    if (unitValue < 1 || quant < 1) {
      alert("Os valores tem que ser positivos!");
      return;
    }

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
    setLoad(!load);
  };

  const onEdit = (name) => {
    setNameToSearch(name);

    const productForEdit = dataProducts.find((product) => product.name === nameToSearch);
    setmodalProductName(productForEdit.name);
    setmodalDesc(productForEdit.desc);
    setmodalUnitValue(productForEdit.price);
    setmodalQuant(productForEdit.quant_min);

    setModalOpen(true);
  };

  const handleOk = async() => {
    if (!modalProductName || !modalDesc) {
      alert("Informe o produto e a descrição!");
      return;
    }
    
    if (modalUnitValue < 1 || modalQuant < 1) {
      alert("Os valores tem que ser positivos!");
      return;
    }

    setModalTextOK('Salvando...');

    await updateDoc(doc(db, "products", nameToSearch), {
      name: modalProductName,
      desc: modalDesc,
      price: modalUnitValue,
      quant_min : modalQuant,
    });

    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmLoading(false);
      setmodalProductName('');
      setmodalDesc('');
      setmodalUnitValue('');
      setmodalQuant('');
      setLoad(!load);
      setModalTextOK('Confirmar');
    }, 2000);
  };

  const handleCancel = () => {
    setModalOpen(false);
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
        <GridProduct itens={dataProducts} setItens={setDataProducts} onEdit={onEdit} />
      </C.GridContainer>

      <Modal
        title="Insira os novos valores"
        open={modalOpen}
        onOk={handleOk}
        okText={modalTextOK}
        onCancel={handleCancel}
        cancelText="Cancelar"
        confirmLoading={confirmLoading}
      >
        <C.TopContainerModal>
          <C.InputContentModal>
            <C.LabelModal>Nome do produto</C.LabelModal>
            <C.InputModal value={modalProductName} onChange={(e) => setmodalProductName(e.target.value)} />
          </C.InputContentModal>

          <C.InputContentModal>
            <C.LabelModal>Descrição</C.LabelModal>
            <C.InputDesc value={modalDesc} onChange={(e) => setmodalDesc(e.target.value)} />
          </C.InputContentModal>

          <C.InputContentModal>
            <C.LabelModal>Valor unitário</C.LabelModal>
            <C.InputModal
              value={modalUnitValue}
              type="number"
              onChange={(e) => setmodalUnitValue(e.target.value)}
            />
          </C.InputContentModal>

          <C.InputContentModal>
            <C.LabelModal>Quantidade mínima</C.LabelModal>
            <C.InputModal
              value={modalQuant}
              type="number"
              onChange={(e) => setmodalQuant(e.target.value)}
            />
          </C.InputContentModal>
        </C.TopContainerModal>
      </Modal>
    </>
  );
};

export default FormProduct;
