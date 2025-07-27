var cupom, resultado_pesquisa, resposta_inserir_linha, codigo, Item, valor, url;

// Descreva esta função...
function faz_algo() {
  function getRowsSearch() {
    fetch(bb_baserow_url+"api/database/rows/table/"+'620267'+"/?user_field_names=true&filter__field_"+'5044380'+"__"+"equal"+"="+cupom+ "&order_by="+"+"+'codigo'+"&page="+'0', {
    method: "GET",
    headers: {
    "Authorization": "Token " + bb_baserow_token
    }
    })
    .then(response => response.json())
    .then(data => {
      resultado_pesquisa = data.results;
        for (var Item_index in resultado_pesquisa) {
      Item = resultado_pesquisa[Item_index];
      codigo = (Item['codigo']);
      valor = (Item['valor']);
      $("#text_1").html(('Voçe tem a receber R$ ' + String(valor)));
    }

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  getRowsSearch();
}


var bb_baserow_token = 'IKrER8jZ6NQENRIxVlNeF65L5J3ss1LH';
var bb_baserow_url = 'https://api.baserow.io/';


        function qclick() {
            let elementoClick = document.getElementById('image_1');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      if (document.getElementById('input_1').value == 'adm') {
    $("#"+'telaadm').show();
    $("#"+'telaindicador').hide();
    $("#telaadm").css("display", "flex");
    $("#telaadm").css("justify-content", "center");
  } else if (document.getElementById('input_1').value != '') {
    cupom = document.getElementById('input_1').value;
    faz_algo();
  }

                });
            }
        }
        qclick();

//feito com bootblocks.com.br
  cupom = [];
  codigo = [];
  valor = [];
  cupom = localStorage.getItem('cp') || '0';
  url = localStorage.getItem('url') || '0';
  if (cupom != '0') {
    $("#input_1").val(cupom);
    $("#"+'image_1').hide();
    faz_algo();
  }


        function qclick2() {
            let elementoClick = document.getElementById('button_1');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      function insertRow() {
  let jsonData = {};
  let colunas = ['nome', 'telefone', 'chavepix', 'codigo', 'endereco'];
  let valores = [document.getElementById('txtnome').value, document.getElementById('txttelefone').value, document.getElementById('txtpix').value, document.getElementById('txtcodigo').value, document.getElementById('txtendereco').value];
  for (let i = 0; i < colunas.length; i++) {
    jsonData[colunas[i]] = valores[i];
  }
    fetch(bb_baserow_url+"api/database/rows/table/"+'556438'+"/?user_field_names=true", {
    method: "POST",
    headers: {
    "Authorization": "Token " + bb_baserow_token,
    "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      resposta_inserir_linha = data;
        function insertRow() {
    let jsonData = {};
    let colunas = ['codigo', 'valor'];
    let valores = [document.getElementById('txtcodigo').value, 0];
    for (let i = 0; i < colunas.length; i++) {
      jsonData[colunas[i]] = valores[i];
    }
      fetch(bb_baserow_url+"api/database/rows/table/"+'620267'+"/?user_field_names=true", {
      method: "POST",
      headers: {
      "Authorization": "Token " + bb_baserow_token,
      "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        resposta_inserir_linha = data;
          $("#text_2").html('Cadastrado com sucesso');
      $("#"+'telaurl').show();
      $("#input_2").val(([url,'/?cp=',document.getElementById('txtcodigo').value].join('')));
      Swal.fire('Cadastrado com sucesso');

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    insertRow();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  insertRow();

                });
            }
        }
        qclick2();


        function qclick3() {
            let elementoClick = document.getElementById('zap');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      let msg_uri_encoded = window.encodeURIComponent((['Hugo me envie o Saldo do indicador',"\n",codigo].join('')));
  window.open("https://api.whatsapp.com/send?phone=" + '+5577988331234' + "&text=" + msg_uri_encoded, "_blank");

                });
            }
        }
        qclick3();


        function qclick4() {
            let elementoClick = document.getElementById('fechar');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      window.location.href = "index.html";
                });
            }
        }
        qclick4();


        function qclick5() {
            let elementoClick = document.getElementById('text_2');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      window.location.href = "index.html";
                });
            }
        }
        qclick5();


        function qclick6() {
            let elementoClick = document.getElementById('button_2');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      function copyText(){
  var copyText = document.getElementById('input_2');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  if(navigator.clipboard && navigator.clipboard.writeText){
  navigator.clipboard.writeText(copyText.value);
  }else{
  document.execCommand("copy");
  }
  }
  copyText();

                });
            }
        }
        qclick6();

        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });