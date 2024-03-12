import React, { useEffect, useState } from "react";
import GlobalStyle from "../../styles/global";
import Header from "../../components/Header";
import Resume from "../../components/Resume";
import Form from "../../components/Form";

const Home = () => {
  const data = localStorage.getItem("products");
  const [productsList, setProductsList] = useState(
    data ? JSON.parse(data) : []
  );
  const dataOrder = localStorage.getItem("order");
  const [orderInfo, setOrderInfo] = useState(
    dataOrder ? JSON.parse(dataOrder) : {}
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amountTotal = productsList
      .map((product) => Number(product.total));

    const total = amountTotal.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    setTotal(total);
  }, [productsList]);

  const handleAdd = (product) => {
    const newArrayProducts = [...productsList, product];

    setProductsList(newArrayProducts);

    localStorage.setItem("products", JSON.stringify(newArrayProducts));
  };

  return (
    <>
      <Header />
      <Form
        handleAdd={handleAdd}
        productsList={productsList}
        setProductsList={setProductsList}
        total={total}
        orderInfo={orderInfo}
        setOrderInfo={setOrderInfo}
        // orderInfo={orderInfo}
        // setOrderInfo={setOrderInfo}
      />
      <GlobalStyle />
      {/* <Resume total={total} /> */}
    </>
  );
};

export default Home;

