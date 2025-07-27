var lat0, key_do_google, chavetx, resultado_pesquisa, resposta_editar_linha, log0, tabelaidlogin, tabelaidcodigo, Item, local, idhotel, destino, lat1, log1, idadeletar, hotel, codigohotel, somahotel, extra, identificador, agendamento, valorhotel, status2, modalstatus;

// Descreva esta função...
function verificarlogin() {
  function getRowsSearch() {
    fetch(bb_baserow_url+"api/database/rows/table/"+tabelaidlogin+"/?user_field_names=true&filter__field_"+tabelaidcodigo+"__"+"equal"+"="+chavetx+ "&order_by="+"+"+'identificador'+"&page="+'0', {
    method: "GET",
    headers: {
    "Authorization": "Token " + bb_baserow_token
    }
    })
    .then(response => response.json())
    .then(data => {
      resultado_pesquisa = data.results;
        for (var Item_index2 in resultado_pesquisa) {
      Item = resultado_pesquisa[Item_index2];
      local = (Item['local']);
      destino = (Item['destino']);
      extra = (Item['extra']);
      hotel = (Item['hotel']);
      identificador = (Item['identificador']);
      status2 = (Item['status']);
      idadeletar = (Item['id']);
      agendamento = (Item['agendamento']);
      importardados();
    }

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  getRowsSearch();
}

// Descreva esta função...
function pagarindicador() {
  if (hotel == 'nada') {
    verificarlogin();
  } else {
    function getRowsSearch() {
      fetch(bb_baserow_url+"api/database/rows/table/"+'620267'+"/?user_field_names=true&filter__field_"+'5044380'+"__"+"equal"+"="+hotel+ "&order_by="+"+"+'codigo'+"&page="+'0', {
      method: "GET",
      headers: {
      "Authorization": "Token " + bb_baserow_token
      }
      })
      .then(response => response.json())
      .then(data => {
        resultado_pesquisa = data.results;
          for (var Item_index3 in resultado_pesquisa) {
        Item = resultado_pesquisa[Item_index3];
        codigohotel = (Item['codigo']);
        valorhotel = (Item['valor']);
        idhotel = (Item['id']);
        somahotel = (format_decimal_number(((txt_to_number(valorhotel)) + 5), 2, false));
        debitar();
      }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    getRowsSearch();
  }
}

// Descreva esta função...
function importardados() {
  $("#input_1").val(local);
  $("#input_2").val(destino);
  $("#txtagendamento").html(agendamento);
  if (hotel == 'nada') {
    $("#status").html(status2);
  } else {
    $("#status").html(([status2,'/',hotel].join('')));
  }
}

// Descreva esta função...
function debitar() {
  function editRow() {
  let jsonData = {};
  let colunas = ['codigo', 'valor'];
  let valores = [codigohotel, somahotel];
  for (let i = 0; i < colunas.length; i++) {
    jsonData[colunas[i]] = valores[i];
  }
    fetch(bb_baserow_url+"api/database/rows/table/"+'620267'+"/"+idhotel+"/?user_field_names=true", {
    method: "PATCH",
    headers: {
    "Authorization": "Token " + bb_baserow_token,
    "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      resposta_editar_linha = data;
        Swal.fire('Pagamento efetuado');
    verificarlogin();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  editRow();
}


var bb_baserow_token = 'IKrER8jZ6NQENRIxVlNeF65L5J3ss1LH';
var bb_baserow_url = 'https://api.baserow.io/';

//feito com bootblocks.com.br
  lat0 = 0;
  log0 = 0;
  lat1 = 0;
  log1 = 0;
  local = [];
  destino = [];
  extra = [];
  hotel = [];
  identificador = [];
  status2 = [];
  idadeletar = 0;
  codigohotel = [];
  valorhotel = 0;
  idhotel = [];
  somahotel = 0;
  agendamento = [];
  modalstatus = ['Status', 'Solicitando', 'Aceito', 'Cancelado', 'Finalizado'];
  for (var Item_index in modalstatus) {
    Item = modalstatus[Item_index];
    $("#select_1").append("<option value="+Item+">"+Item+"</option>");
  }

//feito com bootblocks.com.br
  key_do_google = 'AIzaSyAut0bHyEfU5ozP9Ww90AhF6UpYBylL6BA';
  chavetx = '529594';
  tabelaidlogin = '564559';
  tabelaidcodigo = '4530583';
  var map;
  var Circles = [];
  var Polylines = [];
  var Polygons = [];
  var Makers = [];
  function initMap() {
  map = new google.maps.Map(document.getElementById('tela_mapa'), {
  center: {lat: -14.851078, lng: -40.848206},
  zoom: 12.5
  });
  if (typeof onMapInitilize === "function") {
  onMapInitilize();
  }
  google.maps.event.addListener(map, 'click', function(event) {
  if (typeof onMapClick === "function") {
  onMapClick(event);
  }
  });
  }
  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key="+key_do_google+"&libraries=places,geometry&callback=initMap&loading=async";
  script.async = true;
  document.head.appendChild(script);

function onMapInitilize(){
  chavetx = localStorage.getItem('adm') || '0';
  map.setOptions({streetViewControl: false});
  map.setOptions({zoomControl: false});
  map.setOptions({mapTypeControl: false});
  map.setOptions({scaleControl: false});
  map.setOptions({fullscreenControl: false});
  verificarlogin();
};

$("#select_1").change(function(){
  if ($(this).val() == 'Aceito') {
    function editRow() {
    let jsonData = {};
    let colunas = ['local', 'destino', 'extra', 'hotel', 'identificador', 'agendamento', 'status'];
    let valores = [local, destino, extra, hotel, identificador, agendamento, 'Aceito'];
    for (let i = 0; i < colunas.length; i++) {
      jsonData[colunas[i]] = valores[i];
    }
      fetch(bb_baserow_url+"api/database/rows/table/"+'564559'+"/"+idadeletar+"/?user_field_names=true", {
      method: "PATCH",
      headers: {
      "Authorization": "Token " + bb_baserow_token,
      "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        resposta_editar_linha = data;
          pagarindicador();

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    editRow();
  } else if ($(this).val() == 'Cancelado') {
    function editRow() {
    let jsonData = {};
    let colunas = ['local', 'destino', 'extra', 'hotel', 'identificador', 'agendamento', 'status'];
    let valores = [local, destino, extra, hotel, identificador, agendamento, 'Cancelado'];
    for (let i = 0; i < colunas.length; i++) {
      jsonData[colunas[i]] = valores[i];
    }
      fetch(bb_baserow_url+"api/database/rows/table/"+'564559'+"/"+idadeletar+"/?user_field_names=true", {
      method: "PATCH",
      headers: {
      "Authorization": "Token " + bb_baserow_token,
      "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        resposta_editar_linha = data;
          Swal.fire('Cancelado');
      verificarlogin();

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    editRow();
  } else if ($(this).val() == 'Finalizado') {
    function deleteRow() {
      fetch(bb_baserow_url+"api/database/rows/table/"+tabelaidlogin+"/"+idadeletar+"/?user_field_names=true", {
      method: "DELETE",
      headers: {
      "Authorization": "Token " + bb_baserow_token
      }
      })
    }
    deleteRow();
    localStorage.clear();
    window.location.href = "index.html";}
});

//feito com bootblocks.com.br

//feito com bootblocks.com.br

//feito com bootblocks.com.br

//feito com bootblocks.com.br


        function qclick() {
            let elementoClick = document.getElementById('button_1');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      function copyText(){
  var text = local;
  if(navigator.clipboard && navigator.clipboard.writeText){
  navigator.clipboard.writeText(text);
  }else{
  var copyText = document.createElement("textarea");
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(copyText);
  }
  }
  copyText();
  function geocodeAddress() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': local}, function(results, status) {
  if (status === 'OK') {
  lat0 = results[0].geometry.location.lat();
  log0 = results[0].geometry.location.lng();
    var marker = new google.maps.Marker({
    position: {lat: lat0, lng: log0},
    map: map,
    marker_id: 1
    });
    Makers.push(marker);
    map.panTo(new google.maps.LatLng(lat0, log0));
  } else {
  alert('Erro na api do Geocode: ' + status);
  }
  });
  }
  geocodeAddress();

                });
            }
        }
        qclick();


        function qclick2() {
            let elementoClick = document.getElementById('button_2');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      function copyText(){
  var text = destino;
  if(navigator.clipboard && navigator.clipboard.writeText){
  navigator.clipboard.writeText(text);
  }else{
  var copyText = document.createElement("textarea");
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(copyText);
  }
  }
  copyText();
  function geocodeAddress() {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': destino}, function(results, status) {
  if (status === 'OK') {
  lat1 = results[0].geometry.location.lat();
  log1 = results[0].geometry.location.lng();
    var marker = new google.maps.Marker({
    position: {lat: lat1, lng: log1},
    map: map,
    marker_id: 2
    });
    Makers.push(marker);
    map.panTo(new google.maps.LatLng(lat1, log1));
  } else {
  alert('Erro na api do Geocode: ' + status);
  }
  });
  }
  geocodeAddress();

                });
            }
        }
        qclick2();
function txt_to_number(txt){
            txt = txt+"";
            if(txt.includes(",")){
                txt = txt.replace(",", ".");
            }
            if(txt.includes(".")){
                txt = parseFloat(txt);
            }else{
                txt = parseInt(txt);
            }
            return txt;
        }function format_decimal_number(number, places, virgula = false){
                number = number + "";
                if(number.includes(",")){
                    number = number.replace(",", ".");
                    number = parseFloat(number);
                }else{
                    number = parseFloat(number);
                }
                number = number.toFixed(places);
                if(virgula){
                    number = number.replace(".", ",");
                }
                return number;
            }
        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });