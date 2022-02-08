class Pelicula {
  constructor(codigo,nombre,descripcion,categoria,publicado=false,destacado = false){
      this.codigo = codigo;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.categoria = categoria;
      this.publicado = publicado;
      this.destacado = destacado;
  }
}
let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

//container
let contenedor = document.querySelector("#contenedorAdm");
//Tbody de la tabla
let contenidoTabla = document.querySelector("#cuerpoTabla");
//Traigo la etiqueta form
let form = document.querySelector("#formulario");
let formEditar = document.querySelector("#formularioEditar");
//habilito las funciones del modal
let myModal = new bootstrap.Modal(document.getElementById("updateModal"));

let myModalEditar = new bootstrap.Modal(document.getElementById("updateModalEditar"));

let indiceUser = null;



const abrirModalAgregar = function(){
  myModal.show();
  agregarPelicula();
}

const abrirModalEditar = function(indice){
  myModalEditar.show();
  modificarPelicula(indice)
}
document.querySelector("#botonAgregar").addEventListener("click",function(){
  abrirModalAgregar();
});

//Funcion que crea la estructura de los datos en el modal
const modificarPelicula = function (indice) {
  indiceUser= indice;
  let datos = `
    <div class="mb-3">
      <label for="exampleInputCodigo" class="form-label">Codigo</label>
      <input type="codigo" placeholder="Escriba su codigo" class="form-control" id="exampleInputCodigoModificar" value=${peliculas[indice].codigo} required>
    </div>
    <div class="mb-3">
      <label for="exampleInputNombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="exampleInputNombreModificar" value=${peliculas[indice].nombre} required>
    </div>
    <div class="mb-3">
      <label for="exampleInputDescripcion" class="form-label">Descripción</label>
      <textarea type="text-center" class="form-control" id="exampleInputDescripcionModificar" value=${peliculas[indice].descripcion} required>${peliculas[indice].descripcion} </textarea>
    </div>
    <div class="mb-3">
      <label>Categoria</label>
          <select class="form-select" id="exampleInputCategoriaModificar" required>
          <option selected disabled value=${peliculas[indice].categoria}>${peliculas[indice].categoria}</option>
            <option value="Terror">Terror</option>
            <option value="Acción">Acción</option>
            <option value="Drama">Drama</option>
            <option value="Suspenso">Suspenso</option>
            <option value="CienciaFiccion">Ciencia Ficción</option>
            <option value="Otro">Otro</option>
          </select>
    </div>
    <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1Modificar" checked=${peliculas[indice].publicado}>
      <label class="form-check-label" for="exampleCheck">Publicado</label>
    </div>
    <div>
      <button type="submit" class="btn btn-danger">Actualizar</button>
    </div>
                            
    `;


  formEditar.innerHTML = datos;
};

// Funcion que modifica los datos de una pelicula
const actualizarPelicula = function(){
  peliculas[indiceUser].codigo = document.querySelector("#exampleInputCodigoModificar").value;
  peliculas[indiceUser].nombre = document.querySelector("#exampleInputNombreModificar").value;
  peliculas[indiceUser].descripcion = document.querySelector("#exampleInputDescripcionModificar").value;
  peliculas[indiceUser].categoria = document.querySelector("#exampleInputCategoriaModificar").value;
  peliculas[indiceUser].publicado = document.querySelector("#exampleCheck1Modificar").checked;
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  myModalEditar.hide();
  cargarTabla();
}

//Funcion que crea la estructura del modal Agregar
const agregarPelicula = function () {
  let datos = `
  <div class="mb-3">
  <label for="exampleInputCodigo" class="form-label">Codigo</label>
  <input type="codigo" placeholder="Escriba su codigo" class="form-control" id="exampleInputCodigo"  required>
</div>
<div class="mb-3">
  <label for="exampleInputNombre" class="form-label">Nombre</label>
  <input type="text" class="form-control" id="exampleInputNombre"  required>
</div>
<div class="mb-3">
  <label for="exampleInputDescripcion" class="form-label">Descripción</label>
  <textarea type="text-center" class="form-control" id="exampleInputDescripcion"  required> </textarea>
</div>
<div class="mb-3">
  <label>Categoria</label>
      <select class="form-select" id="exampleInputCategoria"  required>
        <option selected disabled> Seleccione su categoria</option>
        <option value="Terror">Terror</option>
        <option value="Acción">Acción</option>
        <option value="Drama">Drama</option>
        <option value="Suspenso">Suspenso</option>
        <option value="CienciaFiccion">Ciencia Ficción</option>
        <option value="Otro">Otro</option>
      </select>
</div>
<div class="mb-3 form-check">
  <input type="checkbox" class="form-check-input" id="exampleCheck1">
  <label class="form-check-label" for="exampleCheck">Publicado</label>
</div>
<div>
  <button type="submit" class="btn btn-dark">Close</button>
  <button type="submit" class="btn btn-danger">Save changes</button>
</div>
                            
    `;


  form.innerHTML = datos;
};



//Crear cuerpo de la tabla
const cargarTabla = function () {
  contenidoTabla.innerHTML = "";
  
  peliculas.map(function (user, index) {

    let fila = document.createElement("tr");

    let estructura = `
            <td>${user.codigo}</td>
            <td>${user.nombre}</td>
            <td>${user.categoria}</td>
            <td>${user.descripcion}</td>
            <td>${user.publicado}</td>
            <td>
            <i class="fa fa-pencil-square-o fa-2x text-danger" aria-hidden="true" role="button" onclick="abrirModalEditar(${index})"></i>
            <i class="fa fa-trash-o fa-2x text-danger" aria-hidden="true" role="button" onclick="borrarUsuario(${index})"></i>
            <span class="estrella" onclick="destacar(${index})">
            ${
              estrellaLlena(user) 
              ? `<i class="fa fa-star fa-2x text-danger" aria-hidden="true"></i>`
              :  `<i class="fa fa-star-o fa-2x text-danger" aria-hidden="true"></i>`
               
               
            }</span>
            </td>
        `;

    fila.innerHTML = estructura;
    contenidoTabla.appendChild(fila);
  });
};

//Function destacar cuando hacemos click en la estrella 
const destacar = function (index) {
  console.log(peliculas);
  console.log(index);

  if (peliculas[index].destacado === false){ // si no le dio click a la estrella vacia
    console.log(peliculas[index].destacado);
    
    for (i=0; i < peliculas.length; i++) { // todo lo de destacado que este true (estrella llena) lo vuelve false
      if (peliculas[i].destacado = true) {
        peliculas[i].destacado = false;
        console.log(peliculas[i]);
      }
    }
    peliculas[index].destacado = true; // y al que si le dio click le pone true
  } else {
    peliculas[index].destacado = false;
  }
  
    
  
  //guardar cambios en localstorage y recargar tarjetas
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  cargarTabla();
};
const estrellaLlena = function(user) {
  if (user.destacado === true)
  
    return user; 
};
//Funcion que crea la estructura de los datos en el modal
const CargarNuevaPelicula = function () {
  let codigo = document.querySelector("#exampleInputCodigo").value;
  let nombre = document.querySelector("#exampleInputNombre").value;
  let descripcion = document.querySelector("#exampleInputDescripcion").value;
  let categoria = document.querySelector("#exampleInputCategoria").value;
  let publicado = document.querySelector("#exampleCheck1").checked;

  //llamo a la función que valida email y username si ya existe
  let validar = validarPelicula(codigo);
  
  if (!validar) {
    peliculas.push(new Pelicula(codigo, nombre, descripcion, categoria,publicado));
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    
  } else {
    alert("La pelicula ingresada ya existe");


    location.reload();
  }
  myModal.hide();
  cargarTabla();
}



//Validar si la pelicula  ya existe en el arreglo de peliculas
const validarPelicula = function (codigo) { // uso el codigo ya que es unico
  let checkCodigo = peliculas.find(function (usuario) {
    return usuario.codigo === codigo;
  });


  if (checkCodigo) {
    return true;
  } else {
    return false;
  }
};

//Funcion que borra un usuario---------------------------------------------
const borrarUsuario = function (indice) {
  let validar = confirm(`Está seguro que quiere eliminar la pelicula con el codigo: ${peliculas[indice].codigo}?`);

  if (validar) {
    peliculas.splice(indice, 1);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    cargarTabla();
    alert("Pelicula eliminada");
  }
};
cargarTabla();