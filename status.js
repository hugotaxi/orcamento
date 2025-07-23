var key_do_google, chavetx, resultado_pesquisa, lat0, log0, tabelaidlogin, tabelaidcodigo, Item, local, lat1, log1, status2, destino, extra, polilinha, hotel, temporizador_1, identificador;

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
        for (var Item_index in resultado_pesquisa) {
      Item = resultado_pesquisa[Item_index];
      local = (Item['local']);
      destino = (Item['destino']);
      extra = (Item['extra']);
      hotel = (Item['hotel']);
      identificador = (Item['identificador']);
      status2 = (Item['status']);
      linha();
    }
    if (resultado_pesquisa == '') {
      localStorage.clear();
      window.location.href = "index.html";}

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  getRowsSearch();
}

// Descreva esta função...
function linha() {
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
        strokeColor: "#77edba",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        map: map
        });
        polyline.polyline_id = 10;
        polyline.setPath(google.maps.geometry.encoding.decodePath(polilinha));
        Polylines.push(polyline);
      } else {
      alert("Erro: " + status);
      }
      });
      }
      getPolyline();
    } else {
    alert('Erro na api do Geocode: ' + status);
    }
    });
    }
    geocodeAddress();
  } else {
  alert('Erro na api do Geocode: ' + status);
  }
  });
  }
  geocodeAddress();
  $("#txstatus").html(status2);
  $("#input_1").val(local);
  $("#input_2").val(destino);
  $("#text_1").html(extra);
  temporizador_1 = setInterval(function(){
    atualizarstatus();
  }, 20000);
}

// Descreva esta função...
function atualizarstatus() {
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
      if ((Item['status']) != status2) {
        status2 = (Item['status']);
        $("#txstatus").html(status2);
      } else if ((Item['status']) == 'cancelado') {
        Swal.fire('Desculpe mais nao conseguimos lhe atender nessa corrida');
        localStorage.clear();
        window.location.href = "index.html";} else if ((Item['status']) == 'finalizado') {
        Swal.fire('Corrida finalizada com Sucesso...');
        localStorage.clear();
        window.location.href = "index.html";}
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
  chavetx = localStorage.getItem('tx') || '0';
  map.setOptions({streetViewControl: false});
  map.setOptions({zoomControl: false});
  map.setOptions({mapTypeControl: false});
  map.setOptions({scaleControl: false});
  map.setOptions({fullscreenControl: false});
  verificarlogin();
};

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
  $("#telainfor").css("background-color", "#ffffff");
  document.getElementById('telainfor').style.height = '' + "px";
  document.getElementById('telainfor').style.width = '95' + "%";
  document.getElementById('telainfor').style.height = "auto";
  $("#"+'telainfor').css("margin-left", 5+ "px");
  $("#"+'telainfor').css("margin-right", 5+ "px");
  $("#"+'telainfor').css("margin-top", 10+ "px");
  $("#"+'telainfor').css("margin-bottom", 10+ "px");
  document.getElementById('telainfor').style.position = "fixed";
  document.getElementById('telainfor').style.top = "0px";
  document.getElementById('telainfor').style.left = "0";
  document.getElementById('telainfor').style.right = "0";
  document.getElementById('telainfor').style.zIndex = "20";
  $("#telainfor").css("display", "flex");
  $("#telainfor").css("justify-content", "center");

//feito com bootblocks.com.br

//feito com bootblocks.com.br

//feito com bootblocks.com.br

        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });