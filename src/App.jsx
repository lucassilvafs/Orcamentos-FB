import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";

const App = () => {
  const data = localStorage.getItem("products");
  const [productsList, setProductsList] = useState(
    data ? JSON.parse(data) : []
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amountTotal = productsList
      .map((product) => Number(product.total));

    // const amountExpense = transactionsList
    //   .filter((item) => item.expense)
    //   .map((transaction) => Number(transaction.amount));

    // const total = Math.abs(total + amountExpense.quant).toFixed(2);

    // const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const total = amountTotal.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    // setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
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
      />
      <GlobalStyle />
      <Resume total={total} />
    </>
  );
};

export default App;
