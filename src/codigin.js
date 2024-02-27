import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Dimensions, Button, SafeAreaView, Modal} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
//import Home from './components/Home';
import * as FileSystem from 'expo-file-system';
import Firebase from '../services/firebaseConnection';
import FBlogo from '../assets/FBlogo.png';
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";



//import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';

//import api from '../services/api';

export default function Orçamento({ navigation }) {
    const [cliente, setCliente] = useState('');
    const [arrayQuant, setArrayQuant] = useState([]);
    const [arrayProduto, setArrayProduto] = useState([]);
    const [arrayUnit, setArrayUnit] = useState([]);
    const [arrayTotal, setArrayTotal] = useState([]);

    const [quant, setQuant] = useState([]);
    const [produto, setProduto] = useState([]);
    const [unit, setUnit] = useState([]);
    const [prod, setProd] = useState('');
    const corpo = require('../assets/qr-code-pix.png');
    const db = getFirestore(Firebase);
    //const exampleImageUri = Image.resolveAssetSource(corpo).uri;

    const [modal, setModal] = useState (false);

    const [selectedPrinter, setSelectedPrinter] = React.useState();
    var dia = new Date().getDate();
    var mesAtual = new Date().getMonth() + 1;
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var ano = new Date().getFullYear();
    var mes = meses[mesAtual-1]; 

    const htmltable = () => {
    let t = '';
    for (let i in arrayProduto) {
     let quantitem = arrayQuant[i];
     let produtoitem = arrayProduto[i]; 
     let unititem = arrayUnit[i];
     let totalitem = arrayTotal[i];
     t = t +
      `<tr style="height:33.8pt;">
      <td style="border-top:0.75pt solid #000000; border-right:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;">
        <p style="text-align:center; line-height:115%; font-size:10pt;">${quantitem}</p>
      </td>
      <td style="border-top:0.75pt solid #000000; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;">
              <p style="line-height:115%; font-size:10pt; text-align:center;"><span style="background-color:#ffffff;">${produtoitem}</span></p>
                    </td>
                    <td style="border-top:0.75pt solid #000000; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;">  
                        <p style="text-align:center; line-height:115%; font-size:10pt;">R$ ${unititem}</p>
                    </td>
                    <td style="border-top:0.75pt solid #000000; border-left:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;">
                        <p style="text-align:center; line-height:115%; font-size:10pt;">R$ ${totalitem}</p>
                    </td>
    </tr>`
   }
   return t;
}

    const html = `
<html lang="pt-BR">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>
    </title>
    <style>
        body {
            line-height: 115%;
            font-family: Arial;
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
            font-family: 'Times New Roman';
            font-size: 12pt;
            font-weight: bold;
            color: #000000
        }

        .Header {
            line-height: normal;
            font-family: Arial;
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
            font-family: Arial;
            font-size: 10pt;
            color: #000000
        }

        .BalloonText {
            line-height: normal;
            font-family: Tahoma;
            font-size: 8pt;
            color: #000000
        }

        span.CabealhoChar {
            font-family: Arial;
            color: #000000
        }

        span.Hyperlink {
            text-decoration: underline;
            color: #0000ff
        }

        span.RodapChar {
            font-family: Arial;
            color: #000000
        }

        span.TextodebaloChar {
            font-family: Tahoma;
            font-size: 8pt;
            color: #000000
        }

        span.Ttulo1Char {
            font-family: 'Times New Roman';
            font-size: 12pt;
            font-weight: bold
        }
    </style>
</head>

<body>
    <div>
        <div style="clear:both;">
            <p class="Footer" style="text-align:right;"><img src="https://myfiles.space/user_files/119822_34303923073f5d70/1651787268_wowlet-canetas-touch/1651787268_wowlet-canetas-touch-1.jpeg" width="346" height="111" alt="" style="float: left; text-align: left; display: inline-block; "><strong>Fortaleza Brindes</strong></p>
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
        <p style="line-height:normal; font-size:12pt;"><span style="font-family:'Times New Roman';">&nbsp;</span></p>
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

                    ${htmltable()}
                                     
            </tbody>
        </table>
        <p style="line-height:normal; font-size:10pt;"></p>
        <p style="line-height:115%; font-size:10pt;">&nbsp;</p> 
        <p style="line-height:115%; font-size:10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt; margin-top:20px ;"><strong>* Entrega</strong>: ${prod} </p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt;"><strong>* Pagamento:</strong> 50% no fechamento e o restante 50% quando o material tiver pronto para a entrega.</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:10pt;"><strong>*Forma de pagamento:</strong> transfer&ecirc;ncia.</p>
        <p style="text-indent:35.4pt; line-height:115%; font-size:8pt;"><strong><u>*OBS:</u></strong><strong>&nbsp;Este or&ccedil;amento tem validade de 15 dias. Ap&oacute;s este per&iacute;odo, favor consulte-nos novamente. Todos os pre&ccedil;os informados est&atilde;o expressos em Reais (R$) e s&atilde;o exclusivos para este or&ccedil;amento. O servi&ccedil;o ser&aacute; executado no Pa&iacute;s: BRASIL, Estado: CEAR&Aacute;, Cidade: FORTALEZA.&nbsp;</strong></p>

        <p style="text-indent:35.4pt; text-align:justify; line-height:115%; font-size:10pt; margin-top: 13px; "><img src="https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/bbf9e844f9ac2051074cf42159e36ecf" width="168" height="129" alt="" style="float: left; text-align: left; display: inline-block; "></p>
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
        <p style="text-align:center; line-height:115%; font-size:10pt; margin-top: 5px"><img src="https://myfiles.space/user_files/119822_34303923073f5d70/1651787268_wowlet-canetas-touch/1651787268_wowlet-canetas-touch-2.png" width="350" height="2" alt="" align="middle"></p>
        <p style="text-align:center; line-height:115%; font-size:10pt; margin-top: 15px; margin-bottom: 5px">Fortaleza Brindes</p>
        <p style="text-align:center; line-height:115%; font-size:10pt;">CNPJ: 40.206.865/0001-23</p>
        <p style="text-indent:35.4pt;">&nbsp;</p>
        <div style="clear:both;">
            <p class="Footer" style="text-align:center;margin-top:15px;">www.fortalezabrindes.com.br | 2014</p>
        </div>
    </div>
</body>

</html>
`;

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  }

  const limpar = () => {
    setArrayQuant([]);
    setArrayProduto([]);
    setArrayUnit([]);
  }

  const printToFile = async () => {
    let nomePdf = cliente;
    const response = await Print.printToFileAsync({
            html
        })
    const pdfName = `${response.uri.slice(
            0,
            response.uri.lastIndexOf('/') + 1
        )}${nomePdf}.pdf`

        await FileSystem.moveAsync({
            from: response.uri,
            to: pdfName,
        })  
        sharePdf(pdfName)
    //await shareAsync(uri, {dialogTitle: `${nomePdf}`, mimeType: 'application/pdf'}); 
    await setDoc(doc(db, "orçamentos", cliente), {
        cliente: cliente,
        tempo_prod: prod + ' dias',
        produto: arrayProduto,
        quantidade: arrayQuant,
        valor_unitário: arrayUnit,
        valor_total: arrayTotal
    });
}


  const sharePdf = (url) => {
        shareAsync(url)
    }

  const addItem = (quant, produto, unit) => {
        setArrayQuant([...arrayQuant, quant]);
        setArrayProduto([...arrayProduto, produto]);
        setArrayUnit([...arrayUnit, unit]);
        let valorTotal = (quant * unit);
        setArrayTotal([...arrayTotal, valorTotal]);
        setQuant('');
        setProduto('');
        setUnit('');
    }

    function voltar() {
        navigation.navigate('Home');
    }
    
    return(
        <SafeAreaView>
        <View style={{flex:1, height:'100%'}}>
        <KeyboardAvoidingView enabled behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
        <Image style={styles.logo} source={FBlogo} />
        <Text style={styles.titulo}>NOVO ORÇAMENTO</Text>
    
        <View style={styles.corpo}>

        <Text style={styles.texto}>Cliente</Text>
        <TextInput 
            style={styles.input}
            placeholder="Nome do cliente"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={cliente}
            onChangeText={setCliente}
        />

        <Text style={styles.texto}>Tempo de Produção</Text>
        <TextInput 
            style={styles.input}
            placeholder="Número de dias"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={prod}
            onChangeText={setProd}
        />
        
        </View>

    </KeyboardAvoidingView>


        <Modal
          animationType={'slide'}
          transparent={false}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >

    <View style={styles.modal}>
        <Text style={styles.texto}>Produto</Text>  
        <TextInput 
            style={styles.input}
            placeholder="Nome do produto"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={produto}
            onChangeText={setProduto}
        />
        <Text style={styles.texto}>Quantidade</Text>
        <TextInput 
            style={styles.input}
            placeholder="Em unidades"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={quant}
            onChangeText={setQuant}
        />

        <Text style={styles.texto}>Valor Unitário</Text>
        <TextInput 
            style={styles.input}
            placeholder="R$"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={unit}
            onChangeText={setUnit}
        />

        <TouchableOpacity style={styles.buttonSalvar} onPress={() => { addItem(quant, produto, unit) }}>
         <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSalvar} onPress={() => { setModal(false) }}>
         <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

          </View>
        </Modal>

    <TouchableOpacity style={styles.buttonGerar} onPress={() => { setModal(true) }}>
      <Text style={styles.buttonText}>Novo Produto</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonGerar} onPress={print}>
    <Text style={styles.buttonText}>Visualizar PDF</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonGerar} onPress={() => { printToFile(cliente) }}>
    <Text style={styles.buttonText}>Compartilhar PDF</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonGerar} onPress={limpar}>
    <Text style={styles.buttonText}>Limpar PDF</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonSalvar} onPress={voltar}>
    <Text style={styles.buttonText}>Voltar</Text>
    </TouchableOpacity>

    </View>
    </SafeAreaView>
    
    )
}  


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 50
    },

    topo: {
      alignContent: 'space-between',
      width: Dimensions.get('window').width,
      flexDirection: 'row'
    },

    corpo: {
      justifyContent: "flex-start",
      width: '90%',
      alignContent: 'flex-start',
    },

    titulo: {
        color: '#777',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        alignSelf: 'center',
    },

    logo: {
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 70
    },

    buttonGerar: {
        height: 42,
        backgroundColor: '#EA5C1F',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
        marginBottom: 10,
        marginTop: 10,
        width: 300 
    },

    buttonSalvar: {
        height: 42,
        backgroundColor: '#EA5C1F',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
        marginTop: 30,
        width: 250
        
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5,
        alignSelf: 'center',
    },

    texto: {
        color: '#777',
        fontSize: 16,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 5
    },

    textoTopo: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 30,
        textAlign: 'right'
    },

    input: {
        borderWidth:1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#777',
        height: 44,
        borderRadius: 7,
    },

    modal: {
        justifyContent: "center",
        width: '100%',
        alignContent: 'center',
        padding: 20,
    },

});