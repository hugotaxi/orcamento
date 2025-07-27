var lat, long, key_do_google, url, codigorec, total2, polilinha, contclick, resposta_inserir_linha, sdata, shora, tabelaidsaldo, codigounico, lat0, lat1, lat2, porcentagem, resultado_pesquisa, log0, log1, temcupom, total1, enderecoinicial, enderecofinal, tabelaidgasto, saidaa, log2, tabelaidlogin, tabelaidcodigo, Item, distancia, tempo, cupomvalido, desconto, latitude, longitude, tabelaidgastodata, distanciatotal, idrec, tabelaidsaldodata, nomerec, tabelaidcorridavalor, endereco_texto, lng, porcetagem1, telefonerec, chavepixrec, tabelaidloginnome, enderecorec, tabelaidcorridacliente, tabelaidcorridas, endereco, valorrec, mensagemcompleta;

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

// Descreva esta função...
function iniciar() {
  url = localStorage.getItem('url') || '0';
  if (localStorage.getItem('cp') || 'nada' != 'nada') {
    codigorec = localStorage.getItem('cp') || 'nada';
    temcupom = 1;
    procurar_cupom();
  } else {
    temcupom = 0;
    procurar_cupom();
  }
}

// Descreva esta função...
function calculos() {
  total2 = (txt_to_number(distanciatotal)) * 3.4;
  porcentagem = (txt_to_number(((28 * (txt_to_number(total2))) / 100)));
  total2 = (txt_to_number(total2)) + (txt_to_number(porcentagem));
  total2 = (txt_to_number(total2)) + 4.4;
  total1 = (txt_to_number(distanciatotal)) * 2.9;
  porcetagem1 = (txt_to_number(((28 * (txt_to_number(total1))) / 100)));
  total1 = (txt_to_number(total1)) + (txt_to_number(porcetagem1));
  total1 = (txt_to_number(total1)) + 4.4;
  desconto = (format_decimal_number(((txt_to_number(total1)) - (total1 / 100) * 10), 2, false));
  total1 = (format_decimal_number((txt_to_number(total1)), 2, false));
  $("#text_1").html((['Distancia: ',txt_to_number(distanciatotal),'km'].join('')));
  $("#text_2").html(('R$' + String(total1)));
  $("#text_3").html(('Desconto: R$' + String(desconto)));
  $("#"+'text_3').hide();
  $("#"+'telafim').show();
  $("#"+'card_iniciar').hide();
}

// Descreva esta função...
function procurar_cupom() {
  if (temcupom == 1) {
    function getRowsSearch() {
      fetch(bb_baserow_url+"api/database/rows/table/"+tabelaidlogin+"/?user_field_names=true&filter__field_"+tabelaidcodigo+"__"+"equal"+"="+codigorec+ "&order_by="+"+"+'codigo'+"&page="+'0', {
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
        idrec = (Item['id']);
        nomerec = (Item['nome']);
        telefonerec = (Item['telefone']);
        chavepixrec = (Item['chavepix']);
        enderecorec = (Item['endereco']);
        cupomvalido = 1;
        $("#txtcupom").val(codigorec);
        $("#"+'space_3').hide();
        $("#"+'btncupom').hide();
        $("#"+'text_3').show();
      }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    getRowsSearch();
  } else {
    $("#"+'card_iniciar').show();
  }
}

// Descreva esta função...
function linha() {
  function getPolyline() {
  directionsService = new google.maps.DirectionsService();
  let request = {
  origin: new google.maps.LatLng(lat0, log0),
  destination: new google.maps.LatLng(lat1, log1),
  travelMode: google.maps.TravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.METRIC,
  durationInTraffic: true,
  };
  directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
  polilinha = response.routes[0].overview_polyline;
    var polyline = new google.maps.Polyline({
    strokeColor: "#cc1650",
    strokeOpacity: 0.9,
    strokeWeight: 2,
    map: map
    });
    polyline.polyline_id = 10;
    polyline.setPath(google.maps.geometry.encoding.decodePath(polilinha));
    Polylines.push(polyline);
    function calculateAndDisplayRoute() {
    distanceService = new google.maps.DistanceMatrixService();let origin = new google.maps.LatLng(lat0, log0);
    let destination = new google.maps.LatLng(lat1, log1);
    let request = {
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    durationInTraffic: true,
    };
    distanceService.getDistanceMatrix(request, function(response, status) {
    if (status == google.maps.DistanceMatrixStatus.OK) {
    distancia = response.rows[0].elements[0].distance.text;
    tempo = response.rows[0].elements[0].duration.text;
      distanciatotal = (txt_to_number(distancia));
      calculos();
    } else {
    alert("Erro: " + status);
    }
    });
    }
    calculateAndDisplayRoute();
  } else {
  alert("Erro: " + status);
  }
  });
  }
  getPolyline();
}

// Descreva esta função...
function enviar() {
  function insertRow() {
  let jsonData = {};
  let colunas = ['local', 'destino', 'extra', 'hotel', 'identificador', 'agendamento', 'status'];
  let valores = [enderecoinicial, enderecofinal, ['Valor =',total1,' Distancia =',distanciatotal,' KM'].join(''), codigorec, codigounico, [sdata,' às ',shora].join(''), 'Solicitando'];
  for (let i = 0; i < colunas.length; i++) {
    jsonData[colunas[i]] = valores[i];
  }
    fetch(bb_baserow_url+"api/database/rows/table/"+'564559'+"/?user_field_names=true", {
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
        let msg_uri_encoded = window.encodeURIComponent((['Hugo me confirme o agendamento =',"\n",url,'/?tx=',codigounico].join('')));
    window.open("https://api.whatsapp.com/send?phone=" + '+5577988331234' + "&text=" + msg_uri_encoded, "_blank");
    localStorage.setItem('tx',codigounico);
    $("#"+'btncallzap').hide();
    $("#"+'btnacompanhar').show();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  insertRow();
}


//feito com bootblocks.com.br
  key_do_google = 'AIzaSyAut0bHyEfU5ozP9Ww90AhF6UpYBylL6BA';
  tabelaidsaldo = '208538';
  tabelaidgasto = '208539';
  tabelaidgastodata = '1438289';
  tabelaidsaldodata = '1438286';
  tabelaidcorridavalor = '1438283';
  tabelaidlogin = '208536';
  tabelaidloginnome = '1438278';
  tabelaidcorridacliente = '1438281';
  tabelaidcorridas = '208537';
  tabelaidlogin = '556438';
  tabelaidcodigo = '4461217';

    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var timeString = hours + ":" + minutes;

    var timePicker = document.getElementById('shora');
    if (timePicker) {
      timePicker.value = timeString;
    } else {
      console.warn('Seletor de hora com ID ' + 'shora' + ' não encontrado.');
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro é 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("sdata").value = today;
    saidaa = 0;
  cupomvalido = 0;
  contclick = 0;
  tabelaidlogin = [];
  tabelaidcodigo = [];
  codigorec = [];
  idrec = [];
  nomerec = [];
  telefonerec = [];
  chavepixrec = [];
  enderecorec = [];
  valorrec = [];
  mensagemcompleta = [];
  enderecofinal = [];
  codigounico = [];
  enderecoinicial = [];
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

//feito com bootblocks.com.br
  codigorec = 'nada';
  codigounico = String(mathRandomInt(100, 999)) + String(mathRandomInt(100, 999));
  sdata = document.getElementById('sdata').value;
  shora = document.getElementById('shora').value;

//feito com bootblocks.com.br
  $("#card_iniciar").css("background-color", "#ffffff");
  document.getElementById('card_iniciar').style.height = '' + "px";
  document.getElementById('card_iniciar').style.width = '95' + "%";
  document.getElementById('card_iniciar').style.height = "auto";
  $("#"+'card_iniciar').css("margin-left", (window.innerWidth * (2 / 100))+ "px");
  $("#"+'card_iniciar').css("margin-right", (window.innerWidth * (2 / 100))+ "px");
  $("#"+'card_iniciar').css("margin-top", 10+ "px");
  $("#"+'card_iniciar').css("margin-bottom", 10+ "px");
  document.getElementById('card_iniciar').style.position = "fixed";
  document.getElementById('card_iniciar').style.top = "0px";
  document.getElementById('card_iniciar').style.left = "0";
  document.getElementById('card_iniciar').style.right = "0";
  document.getElementById('card_iniciar').style.zIndex = "20";
  document.getElementById('telafim').style.position = "fixed";
  document.getElementById('telafim').style.bottom = "0px";
  document.getElementById('telafim').style.left = "0";
  document.getElementById('telafim').style.right = "0";
  document.getElementById('telafim').style.zIndex = "20";
  document.getElementById('telafim').style.height = '' + "px";
  document.getElementById('telafim').style.width = '90' + "%";
  document.getElementById('telafim').style.height = "auto";
  $("#"+'telafim').css("margin-left", (window.innerWidth * (5 / 100))+ "px");
  $("#"+'telafim').css("margin-right", (window.innerWidth * (5 / 100))+ "px");
  $("#"+'telafim').css("margin-top", 10+ "px");
  $("#"+'telafim').css("margin-bottom", 10+ "px");
  $("#telafim").css("display", "flex");
  $("#telafim").css("justify-content", "center");
  document.getElementById('endereco_destino').style.height = '' + "px";
  document.getElementById('endereco_destino').style.width = (window.innerWidth * (100 / 100)) + "px";
  document.getElementById('endereco_destino').style.height = "auto";
  document.getElementById('space_5').style.height = '' + "px";
  document.getElementById('space_5').style.width = (window.innerWidth * (40 / 100)) + "px";
  document.getElementById('space_5').style.height = "auto";
  document.getElementById('space_7').style.height = '' + "px";
  document.getElementById('space_7').style.width = (window.innerWidth * (50 / 100)) + "px";
  document.getElementById('space_7').style.height = "auto";
  $("#"+'btnacompanhar').hide();
  $("#"+'telafim').hide();

var bb_baserow_token = 'IKrER8jZ6NQENRIxVlNeF65L5J3ss1LH';
var bb_baserow_url = 'https://api.baserow.io/';

function onMapClick(event) {
lat = event.latLng.lat();
long = event.latLng.lng();
  if (saidaa == 0) {
    lat0 = lat;
    log0 = long;
    for (var i = 0; i < Makers.length; i++) {
    if (Makers[i].marker_id === 0) {
    Makers[i].setMap(null);
    Makers.splice(i, 1);
    }
    }
    var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    marker_id: 0
    });
    Makers.push(marker);
  } else if (saidaa == 1) {
    lat1 = lat;
    log1 = long;
    for (var i = 0; i < Makers.length; i++) {
    if (Makers[i].marker_id === 1) {
    Makers[i].setMap(null);
    Makers.splice(i, 1);
    }
    }
    var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    marker_id: 1
    });
    Makers.push(marker);
  } else if (saidaa == 2) {
    lat2 = lat;
    log2 = long;
    for (var i = 0; i < Makers.length; i++) {
    if (Makers[i].marker_id === 2) {
    Makers[i].setMap(null);
    Makers.splice(i, 1);
    }
    }
    var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    marker_id: 2
    });
    Makers.push(marker);
  }
}

function onMapInitilize(){
  map.setOptions({streetViewControl: false});
  map.setOptions({zoomControl: false});
  map.setOptions({mapTypeControl: false});
  map.setOptions({scaleControl: false});
  map.setOptions({fullscreenControl: false});
  function addAutocomplete() {
  var input = document.getElementById('endereco_destino');
  let radius = 5000;
  let center = new google.maps.LatLng(-14.851078, -40.848206);
  let circle = new google.maps.Circle({
  center: center,
  radius: radius
  });
  let options = {
  bounds: circle.getBounds()
  };
  autocomplete_endereco_destino = new google.maps.places.Autocomplete(input, options);
  autocomplete_endereco_destino.addListener("place_changed", () => {
  let place = autocomplete_endereco_destino.getPlace();
  endereco_texto = place.formatted_address;
  lat = place.geometry.location.lat();
  lng = place.geometry.location.lng();
    if (saidaa == 0) {
      lat0 = lat;
      log0 = lng;
      for (var i = 0; i < Makers.length; i++) {
      if (Makers[i].marker_id === 0) {
      Makers[i].setMap(null);
      Makers.splice(i, 1);
      }
      }
      var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      marker_id: 0
      });
      Makers.push(marker);
    } else if (saidaa == 1) {
      lat1 = lat;
      log1 = lng;
      for (var i = 0; i < Makers.length; i++) {
      if (Makers[i].marker_id === 1) {
      Makers[i].setMap(null);
      Makers.splice(i, 1);
      }
      }
      var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      marker_id: 1
      });
      Makers.push(marker);
    } else if (saidaa == 2) {
      lat2 = lat;
      log2 = lng;
      for (var i = 0; i < Makers.length; i++) {
      if (Makers[i].marker_id === 2) {
      Makers[i].setMap(null);
      Makers.splice(i, 1);
      }
      }
      var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      marker_id: 2
      });
      Makers.push(marker);
    }
  });
  }
  addAutocomplete();
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
    lat0 = latitude;
    log0 = longitude;
    function geocodeLatLng() {
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat: latitude, lng: longitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
    if (results[0]) {
    endereco = results[0].formatted_address;
      endereco =
      (function() {
        var texto = endereco || "";
        var index = texto.indexOf("Vitória da Conquista");
        if (index !== -1) {
          return texto.substring(0, index);
        } else {
          return texto;
        }
      })();
      ;
      $("#endereco_destino").val(endereco);
    } else {
    window.alert('Nenhum Resultado Encontrado');
    }
    } else {
    window.alert('Geocoder falhou: ' + status);
    }
    });
    }
    geocodeLatLng();
  }, function() {
  handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
  }
  iniciar();
};


        function qclick() {
            let elementoClick = document.getElementById('lblindica');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      contclick = contclick + 1;
  if (contclick >= 3) {
    window.location.href = "indicador.html";}

                });
            }
        }
        qclick();


        function qclick2() {
            let elementoClick = document.getElementById('btncupom');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      if (!document.getElementById('txtcupom').value.length) {
    Swal.fire('vazio');
  } else {
    temcupom = 1;
    codigorec = document.getElementById('txtcupom').value;
    procurar_cupom();
  }

                });
            }
        }
        qclick2();


        function qclick3() {
            let elementoClick = document.getElementById('btncallzap');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      if (cupomvalido == 1) {
    total1 = desconto;
    enviar();
  } else {
    enviar();
  }

                });
            }
        }
        qclick3();


        function qclick4() {
            let elementoClick = document.getElementById('btnreset');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      window.location.href = "index.html";
                });
            }
        }
        qclick4();


        function qclick5() {
            let elementoClick = document.getElementById('confirm');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      if (saidaa == 0) {
    enderecoinicial = document.getElementById('endereco_destino').value;
    function geocodeAddress() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': document.getElementById('endereco_destino').value}, function(results, status) {
    if (status === 'OK') {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
      lat0 = latitude;
      log0 = longitude;
      for (var i = 0; i < Makers.length; i++) {
      if (Makers[i].marker_id === 0) {
      Makers[i].setMap(null);
      Makers.splice(i, 1);
      }
      }
      var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      marker_id: 0
      });
      Makers.push(marker);
      map.panTo(new google.maps.LatLng(latitude, longitude));
    } else {
    alert('Erro na api do Geocode: ' + status);
    }
    });
    }
    geocodeAddress();
    saidaa = 1;
    $("#endereco_destino").val('');
    $("#lblindica").html('Ponto Final:');
  } else if (saidaa == 1) {
    enderecofinal = document.getElementById('endereco_destino').value;
    function geocodeAddress() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': document.getElementById('endereco_destino').value}, function(results, status) {
    if (status === 'OK') {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
      map.panTo(new google.maps.LatLng(latitude, longitude));
      lat1 = latitude;
      log1 = longitude;
      linha();
    } else {
    alert('Erro na api do Geocode: ' + status);
    }
    });
    }
    geocodeAddress();
  }

                });
            }
        }
        qclick5();


        function qclick6() {
            let elementoClick = document.getElementById('extra');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      window.location.href = "index.html";
                });
            }
        }
        qclick6();


        function qclick7() {
            let elementoClick = document.getElementById('btnacompanhar');
            if (elementoClick) {
                elementoClick.addEventListener("click", function () {
                      window.location.href = "index.html";
                });
            }
        }
        qclick7();

$("#sdata").change(function(){
  sdata = document.getElementById('sdata').value;
});

$("#shora").change(function(){
  shora = document.getElementById('shora').value;
});
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