import React, { useEffect, useState } from "react";
import GlobalStyle from "../../styles/global";
import Header from "../../components/Header";
import FormProduct from "../../components/FormProduct";
import Firebase from "../../services/firebaseConnection";
import { getDocs , getFirestore, collection } from "firebase/firestore";

const Products = () => {
  const data = localStorage.getItem("products");
  const [productsList, setProductsList] = useState(
    data ? JSON.parse(data) : []
  );

  const db = getFirestore(Firebase);
  const productsCollectionRef = collection(db, "products");

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDocs(productsCollectionRef);
  //     setDataProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getData();
  // }, [productsList]);

  const handleAdd = (product) => {
    const newArrayProducts = [...productsList, product];

    setProductsList(newArrayProducts);

    // setOrderInfo(orderInfo);

    // localStorage.setItem("products", JSON.stringify(newArrayProducts));
  };

  return (
    <>
      <Header />
      <FormProduct
        handleAdd={handleAdd}
      />
      <GlobalStyle />
      {/* <Resume total={total} /> */}
    </>
  );
};

export default Products;

