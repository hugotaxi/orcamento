var chavecp, chavetx;

// Descreva esta função...
function verchaves() {
  if (chavetx != '') {
    localStorage.setItem('tx',chavetx);
    window.location.href = "status.html";} else if (chavecp != '') {
    localStorage.setItem('cp',chavecp);
    window.location.href = "mapanormal.html";} else if (localStorage.getItem('tx') || '' != '') {
    window.location.href = "status.html";} else if (chavecp == '') {
    window.location.href = "mapanormal.html";}
}


//feito com bootblocks.com.br
  localStorage.setItem('url','orcamento.use.taxi.br');
  chavecp = getParameters()['cp'] === undefined ? "" : getParameters()['cp'];
  chavetx = getParameters()['tx'] === undefined ? "" : getParameters()['tx'];
  verchaves();

//feito com bootblocks.com.br
function getParameters(){
                let url = window.location.href;
                let parametros = url.split("?");
                let retorno = [];
                if(parametros.length > 1){
                    parametros = parametros[1].split("&");
                    for(let i = 0; i < parametros.length; i++){
                        let parametro = parametros[i].split("=");
                        retorno[parametro[0]] = parametro[1];
                    }
                }
                return retorno;
            }  
            
        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });