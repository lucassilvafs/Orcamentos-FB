const logo_empresa = "logo.png";
const nome_empresa = "Empresa XYZ LTDA";
const endereco_empresa = "Rua da Empresa, 587 - Bairro, Cidade - SP";
const cnpj_empresa = "CNPJ: 00.000.000/0000-00";
const contato_empresa = "WhatsApp: (00) 00000-0000";
const email_empresa = "E-mail: emaildaempresa@gmail.com";

function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number+'').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number, 
  prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
  sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
  dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function(n, prec) {var k = Math.pow(10, prec);
  return '' + Math.round(n * k) / k;};
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
  s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);}
  if ((s[1] || '').length < prec) {
  s[1] = s[1] || '';
  s[1] += new Array(prec - s[1].length + 1).join('0');}
  return s.join(dec);
}

function updateTotal() {
  var total = 0;
  var dsc = document.getElementsByClassName("dsc");
  var list = document.getElementsByClassName("vlr");
  var qtd = document.getElementsByClassName("qtd");
  if (list.length === 0) document.getElementById("h2total").innerHTML = ''; 
  var values = [];
  document.getElementById("itens").innerHTML = '';
  for(var i = 0; i < list.length; ++i) {
  total = total + parseFloat(list[i].value.replace(',', '.') * qtd[i].value.replace(',', '.'));}
  document.getElementById("h2total").innerHTML = 'R$ '+number_format(total, 2,',','.');
}

function add_item() {
  document.getElementById("div_items").insertAdjacentHTML('beforeend', '<div class="row form-group"><div class="col-sm-6"><input type="text" name="descricao[]" placeholder="Descrição" class=" dsc form-control" /></div><div class="col-sm-2"><input type="text" class="qtd form-control" name="quantidade[]" placeholder="Quantidade" value="1" onchange="updateTotal();" /></div><div class="col-sm-3"><input type="text" name="valor[]" placeholder="Valor unitário" class="vlr form-control" onchange="updateTotal();"/></div><span class="btn btn-danger" style="margin-right: 15px; float:right;" onclick="this.parentElement.remove(); updateTotal();">x</span></div>');
  document.getElementById("logo").src = logo_empresa;
}

function gerorc(){
  document.getElementById("nom").innerHTML =  nome_empresa;
  document.getElementById("endr").innerHTML =  endereco_empresa;
  document.getElementById("cnpj").innerHTML =  cnpj_empresa;
  document.getElementById("cont").innerHTML =  contato_empresa;
  document.getElementById("emai").innerHTML =  email_empresa;
  var hoje = new Date();
  var valido = new Date();
  valido.setDate(valido.getDate() + 10);
  var controle = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
  document.getElementById("inf").innerHTML = 'Emitido em: '+hoje.toLocaleDateString();
  document.getElementById("inf").innerHTML += '<br />Válido até: '+valido.toLocaleDateString();
  document.getElementById("inf").innerHTML += '<br />Controle: '+controle;
  document.getElementById("icliente").innerHTML = document.getElementById("cliente").value;
  document.getElementById("icontato").innerHTML = document.getElementById("contato").value;
  document.getElementById("iendereco").innerHTML = document.getElementById("endereco").value;
  if (document.getElementById("pagamento").value != '')
  document.getElementById("pag").innerHTML = '<strong>Pagamento</strong><div>'+ document.getElementById("pagamento").value+'</div>';
  if (document.getElementById("formapagamento").value != '')
  document.getElementById("fpag").innerHTML = '<strong>Formas de pagamento</strong><div>'+ document.getElementById("formapagamento").value+'</div>';
  var total = 0;
  var dsc = document.getElementsByClassName("dsc");
  var list = document.getElementsByClassName("vlr");
  var qtd = document.getElementsByClassName("qtd");
  var values = [];
  document.getElementById("itens").innerHTML = '';
  for(var i = 0; i < list.length; ++i) {
  total = total + parseFloat(list[i].value.replace(',', '.') * qtd[i].value.replace(',', '.'));
  document.getElementById("itens").innerHTML += '<tr><td class="descricao">'+dsc[i].value+'</td><td class="quantidade">'+qtd[i].value.replace('.', ',')+'</td><td class="valor">R$ '+number_format(list[i].value.replace(',', '.'), 2,',','.')+'</td> <td class="valor">R$ '+number_format(parseFloat(list[i].value.replace(',', '.') * qtd[i].value.replace(',', '.')), 2,',','.')+'</td></tr>';}
  document.getElementById("isubtotal").innerHTML = 'Subtotal: R$ '+number_format(total, 2,',','.');
  var descto = document.getElementById("desconto").value.replace(',', '.');	
  if (descto > 0 )
  document.getElementById("idesconto").innerHTML = '<h4><strong>Desconto: R$ '+number_format(descto, 2,',','.')+'</strong></h4>';
  document.getElementById("ivalortotal").innerHTML = 'Valor total: R$ '+number_format(total - descto, 2,',','.');
  document.getElementById("formulario").style.display = "none";
  document.getElementById("orcamento").style.display = "inline";
  window.print();
}