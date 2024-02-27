const moduloMostrar = (function () {
  const urlAPIConsulta = "https://randomuser.me/api/?results=10";

  async function consultaAPI() {
    try {
      const resultObject = await fetch(urlAPIConsulta);

      if (resultObject.status == 200) {
        const data = await resultObject.json();
        const resultado = data.results;

        insertData(resultado);
        detectarCargaImagenes(resultado.length);
      }
      if (resultObject.status == 404) {
        console.log("Ha ocurrido un error 404");
      }
    } catch (error) {
      console.log(`Ha ocurrido un error en el fetch: ${error.name}`);
    }
  }
  return consultaAPI;
})();
moduloMostrar();

function detectarCargaImagenes(length) {
  let contador = 0;
  function verificarCargaCompleta() {
    contador++;
    if (contador === length) {
      toggleLoader();
    }
  }

  const imagenes = document.querySelectorAll(".card img");
  imagenes.forEach(function (img) {
    img.addEventListener("load", verificarCargaCompleta);
  });
}

function toggleLoader() {
  const toggleTag = document.querySelector(".loader");
  const userDataTag = document.getElementById("user-data");
  toggleTag.style.display = "none";
  userDataTag.style.display = "block";
}

function insertData(data) {
  const rowContenedor = document.querySelector(".user-data");
  let contenido = "";
  for (let i = 0; i < data.length; i++) {
    contenido += `<div class="col col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card" >
        <img src="${data[i].picture.large}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${Object.values(data[i].name).join(" ")}</h5>
            <div class="card-text">
            <h6 class='card-text-titulos mb-0'>Email:</h6>
            <p class='card-text-contenido'>${data[i].email}</p>
            <h6 class='card-text-titulos mb-0'>Phone:</h6>
            <p class='card-text-contenido'>${data[i].phone}</p>
            <h6 class='card-text-titulos mb-0'>Country:</h6>
            <p class='card-text-contenido'>${data[i].location.country}</p>
            </div>
        </div>
    </div>
    
    </div>`;
  }
  rowContenedor.innerHTML = contenido;
}
