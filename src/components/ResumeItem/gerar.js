import logo from "../../images/logo.png";
import PdfMake from "pdfmake/build/pdfmake";
import PdfFonts from "pdfmake/build/vfs_fonts";

var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

// async function blobToBase64(blob) {
// 	const buffer = Buffer.from(await blob.arrayBuffer());
// 	return `data:${blob.type};base64,${buffer.toString('base64')}`;
// }

const imageBase64 = "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";

// function blobToBase64(blob) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   } <img src="data:image/png;base64,${imageBase64}">
  

const visualizarImpressao = async() => {
    // blobToBase64(logo)
    // .then((base64Data) => {
    //     // Use the Base64 data here
    //     console.log(base64Data); // Example: "data:image/jpeg;base64,..."
    // })
    // .catch((error) => {
    //     console.error("Error converting Blob to Base64:", error);
    // });
    // alert("Os valores tem que ser positivos!");
    // const imgBase64 = await blobToBase64("../../images/logo.png");
    // alert(imgBase64);

    var dia = new Date().getDate();
    var mesAtual = new Date().getMonth() + 1;
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var ano = new Date().getFullYear();
    var mes = meses[mesAtual-1];
    var cliente = "euzinho";
    var prod = "caneca";


  const ret = htmlToPdfmake(`
  <html lang="pt-BR">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>
    </title>
    <style>
        body {
            line-height: 115%;
            font-family: Roboto;
            font-size: 11pt
        }

        h1,
        p {
            margin: 0pt
        }

        table {
            margin-top: 0pt;
            margin-bottom: 0pt
        }

        h1 {
            page-break-after: avoid;
            line-height: normal;
            font-family: 'Roboto';
            font-size: 12pt;
            font-weight: bold;
            color: #000000
        }

        .Header {
            line-height: normal;
            font-family: Roboto;
            font-size: 10pt;
            color: #000000
        }

        .Default {
            text-align: justify;
            font-family: 'Swis721 Lt BT';
            font-size: 12pt;
            color: #000000
        }

        .Footer {
            line-height: normal;
            font-family: Roboto;
            font-size: 10pt;
            color: #000000
        }

        .BalloonText {
            line-height: normal;
            font-family: Roboto;
            font-size: 8pt;
            color: #000000
        }

        span.CabealhoChar {
            font-family: Roboto;
            color: #000000
        }

        span.Hyperlink {
            text-decoration: underline;
            color: #0000ff
        }

        span.RodapChar {
            font-family: Roboto;
            color: #000000
        }

        span.TextodebaloChar {
            font-family: Roboto;
            font-size: 8pt;
            color: #000000
        }

        span.Ttulo1Char {
            font-family: 'Roboto';
            font-size: 12pt;
            font-weight: bold
        }
    </style>
</head>

<body>
    <div>
        <div style="clear:both;">
            <p class="Footer" style="text-align:right;"><img src="data:image/png;base64,${imageBase64}" width="346" height="111" alt="" style="float: left; text-align: left; display: inline-block; "><strong>Fortaleza Brindes</strong></p>
            <p class="Footer" style="text-align:right;">Tel.: (85) 98837.1988 &nbsp;/ 98687.8690</p>
            <p class="Footer" style="text-align:right;"><span style="width:81pt; display:inline-block;">&nbsp;</span><span style="width:131.6pt; display:inline-block;">&nbsp;</span><span style="width:93.55pt; display:inline-block;">&nbsp;</span>contato@fortalezabrindes.com.br</p>
            <p class="Footer" style="text-align:right;">www.fortalezabrindes.com.br</p>
            <p class="Footer" style="text-align:right;"><em>Instagram:&nbsp;</em>@fortaleza_brindes</p>
            <p class="Footer" style="text-align:right;">Rua Elizabete pio Quintanilha, 123 &ndash; Vicente Pinzon</p>
            <p class="Footer" style="text-align:right;">&nbsp;</p>
            <p class="Footer">__________________________________________________________________________________________________________________________<span style="width:3.12pt; display:inline-block;">&nbsp;</span><span style="width:6.6pt; display:inline-block;">&nbsp;</span></p>
            <p class="Header" style="text-align:right;">&nbsp;</p>
            <p class="Footer" style="text-align:left;"><strong>Cliente: ${cliente}</strong></p>
        </div>
        <p style="line-height:normal; font-size:12pt;"><span style="font-family:'Roboto';">&nbsp;</span></p>
        <p style="line-height:normal; font-size:10pt;">&nbsp;</p>
        <table style="width:478.05pt; margin-right:7.05pt; margin-left:7.05pt; border:0.75pt solid #000000; border-collapse:collapse; float:left;">
            <tbody>
                <tr style="height:22.6pt;">
                    <td style="width:80.6pt; border-right:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#d9d9d9;">
                        <p style="text-align:center;">Quantidade</p>
                    </td>
                    <td style="width:200.9pt; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#d9d9d9;">
                        <p style="text-align:center;">Produto/ Servi&ccedil;o</p>
                    </td>
                    <td style="width:51.45pt; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9;">
                        <p style="text-align:center;">Valor Unit&aacute;rio</p>
                    </td>
                    <td style="width:101.15pt; border-left:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#d9d9d9;">
                        <p style="text-align:center;">Valor R$</p>
                    </td>
                </tr>

                    {htmltable()}
                                     
            </tbody>
        </table>
        <p style="line-height:normal; font-size:10pt;"></p>
        <p style="line-height:115%; font-size:10pt;">&nbsp;</p> 
        <p style="line-height:115%; font-size:10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt; margin-top:20px ;"><strong>* Entrega</strong>: ${prod} </p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt;"><strong>* Pagamento:</strong> 50% no fechamento e o restante 50% quando o material tiver pronto para a entrega.</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt;"><strong>*Forma de pagamento:</strong> transfer&ecirc;ncia.</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:8pt;"><strong><u>*OBS:</u></strong><strong>&nbsp;Este or&ccedil;amento tem validade de 15 dias. Ap&oacute;s este per&iacute;odo, favor consulte-nos novamente. Todos os pre&ccedil;os informados est&atilde;o expressos em Reais (R$) e s&atilde;o exclusivos para este or&ccedil;amento. O servi&ccedil;o ser&aacute; executado no Pa&iacute;s: BRASIL, Estado: CEAR&Aacute;, Cidade: FORTALEZA.&nbsp;</strong></p>

        <p style="text-indent:35.4pt; text-align:justify; line-height:115%; font-size:10pt; margin-top: 13px; "><img src="data:image/png;base64,${imageBase64}" width="168" height="129" alt="" style="float: left; text-align: left; display: inline-block; "></p>
        <p style="text-align:justify; line-height:115%; font-size:10pt; margin-top: 20px;  margin-left: 30px;"><strong><span style="color:#ff0000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span style="color:#ff0000;">DADOS BANCARIOS&nbsp;</span></strong></p>
        <p style="text-align:justify; line-height:115%; font-size:10pt; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NUBANK</p>
        <p style="text-align:justify; line-height:115%; font-size:10pt; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; AGENCIA: <span style="color:#ff0000;">0001</span></p>
        <p style="text-align:justify; line-height:115%; font-size:10pt; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; CONTA: <span style="color:#ff0000;">55922727-9</span></p>
        <p style="text-align:justify; line-height:115%; font-size:10pt; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; RAZ&Atilde;O SOCIAL: <span style="color:#ff0000;">Ana Cleide de Sousa</span></p>
    
        <p style="text-align:center; line-height:115%; font-size:10pt;">&nbsp;</p>
        <p style="text-align:center; line-height:115%; font-size:10pt;">&nbsp;</p>
        <p style="text-align:center;">&nbsp;</p>
        <p style="text-align:center; margin-top: 20px;">Fortaleza, ${dia} de ${mes} de ${ano}</p>
        <p style="text-align:center; line-height:115%; font-size:10pt;">&nbsp;</p>
        <p style="text-align:center; line-height:115%; font-size:10pt;">Atenciosamente,</p>
        <p style="text-align:center; line-height:115%; font-size:10pt; text-align:center;">&nbsp;</p>
        <p style="text-align:center; line-height:115%; font-size:10pt; text-align:center;">&nbsp;</p>
        <p style="text-align:center; line-height:115%; font-size:10pt; margin-top: 5px"><img src="data:image/png;base64,${imageBase64}" width="350" height="2" alt="" align="middle"></p>
        <p style="text-align:center; line-height:115%; font-size:10pt; margin-top: 15px; margin-bottom: 5px">Fortaleza Brindes</p>
        <p style="text-align:center; line-height:115%; font-size:10pt;">CNPJ: 40.206.865/0001-23</p>
        <p style="text-indent:35.4pt;">&nbsp;</p>
        <div style="clear:both;">
            <p class="Footer" style="text-align:center;margin-top:15px;">www.fortalezabrindes.com.br | 2014</p>
        </div>
    </div>
</body>

</html>
  `,);
  const docDefinition = {
    content:ret,
    defaultStyle: {
        font: "Roboto",
    } 
  }
  pdfMake.createPdf(docDefinition).print();
};

export default visualizarImpressao;