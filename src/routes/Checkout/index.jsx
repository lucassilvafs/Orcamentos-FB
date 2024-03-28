import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "../../images/logo.png";
import qrCode from "../../images/qr-code.png";
import generatePDF, { usePDF, Margin } from 'react-to-pdf';

const Checkout = () => {
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

  const handleCheckout = () => {
    window.print();
  }

  const downloadPDF = () => {
    // you can also pass React refs, e.g. `generatePDF(ref, options)`
    generatePDF(() => document.getElementById("container"), {
      method: "open",
      filename: "function-example.pdf",
      page: { margin: Margin.MEDIUM },
    });
  };

  return (
    <div className="container">
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
        {/* <button type="button" className="btn-pdf" onClick={() => handleCheckout()}>Baixar PDF</button> */}
      </footer>
    </div>
  );
};

export default Checkout;
