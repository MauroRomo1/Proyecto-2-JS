const abrirModalEditar = function(indice){
  myModal.show();
  actualizarPelicula(indice);
}
const actualizarPelicula = function(indice) {
  indicePeli = indice;
  let datos = `document.querySelector("#exampleInputCodigo").value=${peliculas[indice].codigo};
  document.querySelector("#exampleInputNombre").value=${peliculas[indice].nombre};
  document.querySelector("#exampleInputDescripcion").value=${peliculas[indice].descripcion};
  document.querySelector("#exampleInputCategoria").value=${peliculas[indice].categoria};
  document.querySelector("#exampleCheck1").value=${peliculas[indice].publicado};
  <div class="d-grid mt-3">
    <button class="btn btn-primary" type="submit">Actualizar</button>            
  </div>`
}

//Funcion que actualiza los datos del usuario cargado en el modal
const updateUsuario = function (e) {
  e.preventDefault();


  peliculas[indiceUser].codigo = document.querySelector("#exampleInputCodigo").value;
  peliculas[indiceUser].nombre = document.querySelector("#exampleInputNombre").value;
  peliculas[indiceUser].descripcion = document.querySelector("#exampleInputDescripcion").value;
  peliculas[indiceUser].categoria = document.querySelector("#exampleInputCategoria").value;
  peliculas[indiceUser].publicado = document.querySelector("#exampleCheck1").value;

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  cargarTabla();
  myModal.hide();
};