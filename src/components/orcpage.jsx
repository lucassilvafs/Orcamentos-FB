import React from "react";

const orcpage = () => {
  return (
    <div class="container" id="formulario">
  <h1 class="text-center">Orçamento</h1>
  <form id="budget-form" method="post" action="" target="_blank">
    <div class="form-group">
      <label for="cliente">Cliente</label>
      <input type="text" class="form-control" id="cliente" name="cliente" placeholder="Nome do cliente" required/>
    </div>
    <div class="form-group">
      <label for="endereco">Endereço</label>
      <textarea class="form-control" id="endereco" name="endereco" placeholder="Endereço do cliente" required></textarea>
    </div>
    <div class="form-group">
      <label for="contato">Contato</label>
      <textarea class="form-control" id="contato" name="contato" placeholder="Contato do cliente" required></textarea>
    </div>
    <hr />
    <div id="div_items">
      </div>
    <input type="button" id="add-item-button" value="Adicionar item" />
    <hr />
    <h2 id="h2total"></h2>
    <hr />
    <div class="form-group">
      <label for="desconto">Desconto</label>
      <input type="text" class="form-control" id="desconto" name="desconto" placeholder="Valor do desconto"/>
    </div>
    <hr />
    <div class="form-group">
      <label for="pagamento">Pagamento</label>
      <textarea class="form-control" id="pagamento" name="pagamento" placeholder="Como deve ser pago"></textarea>
    </div>
    <hr />
    <div class="form-group">
      <label for="formapagamento">Formas de pagamento</label>
      <input type="text" class="form-control" id="formapagamento" name="formapagamento" placeholder="Formas de pagamento aceitas"/>
    </div>
    <button type="button" class="btn btn-primary" onclick="gerorc()">Gerar</button>
  </form>
  <hr />
  <div class="content text-center">
    <h4>Desenvolvido por: <a href="https://github.com/lucassilvafs/" target="_blank">Lucas Silva</a></h4>
  </div>
</div>

  );
};

export default orcpage;