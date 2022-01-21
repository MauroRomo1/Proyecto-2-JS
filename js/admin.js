let boton = document.getElementById('botonAgregar');
//habilito las funciones del modal
let myModal = new bootstrap.Modal(document.getElementById("updateModal"));



const cargarTabla = function () {
    contenidoTabla.innerHTML = "";
    let usuariosActivos = usuarios.filter(function (user) {
      return user.activo === true;
    });
    usuariosActivos.map(function (user, index) {
  
      let fila = document.createElement("tr");
  
      let estructura = `
              <td>${user.codigo}</td>
              <td>${user.pelicula}</td>
              <td>${user.categoria}</td>
              <td>${user.descripcion}</td>
              <td>${user.publicado}</td>
              <td>
              <i class="fa fa-pencil-square-o fa-2x text-info" aria-hidden="true" role="button" onclick="abrirModal(${index})"></i>
              <i class="fa fa-trash-o fa-2x text-danger" aria-hidden="true" role="button" onclick="borrarUsuario(${index})"></i>
              <i class="fa fa-trash-o fa-2x text-danger" aria-hidden="true" role="button" onclick="destacar(${index})"></i> // falta hacer
              </td>
          `;
  
      fila.innerHTML = estructura;
      contenidoTabla.appendChild(fila);
    });
  };
  
  //Funcion que actualiza los datos del usuario cargado en el modal
  const updateUsuario = function (e) {
    e.preventDefault();
  
  
    usuarios[indiceUser].nombre = document.querySelector("#nombre").value;
    usuarios[indiceUser].email = document.querySelector("#email").value;
    usuarios[indiceUser].username = document.querySelector("#username").value;
    usuarios[indiceUser].imagen = document.querySelector("#avatar").value;
  
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarTabla();
    myModal.hide();
  };
  
  //Funcion que borra un usuario---------------------------------------------
  const borrarUsuario = function (indice) {
    let validar = confirm(
      `Está seguro que quiere eliminar al usuario ${usuarios[indice].nombre}?`
    );
  
    if (validar) {
      usuarios[indice].activo = false;
  
      // usuarios.splice(indice, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      cargarTabla();
      alert("Usuario eliminado");
    }
  };
// Abrir modal NUEVA PELICULA -----------------
const abrirModalAgregar = function(){
myModal.show();
CargarNuevaPelicula();
}

document.querySelector("#botonAgregar").addEventListener("click",function(){
  abrirModalAgregar();
});
// Fin abrir modal NUEVA PELICULA ------

  //Funcion para cargar datos en el Boton Agregar Pelicula
  const CargarNuevaPelicula = function() {
    let datos = `
                <div class="mb-2">
                <label><b>Correo electrónico</b></label>
                  <input type="email" class="form-control" id="email"  value="" required>
                  
                </div>
                <div class="mb-2">
                <label><b>Nombre</b></label>
                  <input type="text" class="form-control" id="nombre"  value="Juan" required>
                  
                </div>
                <div class="mb-2">
                <label><b>Username</b></label>
                  <input type="text" class="form-control" id="username"  value="" required>
                 
                </div>
                
               
                <div class="mb-3">
              <label>Categoria</label>
                  <select class="form-select" id="avatar">
                    <option>Seleccione su categoria</option>
                    <option value="Terror">Terror</option>
                    <option value="Acción">Acción</option>
                    <option value="Drama">Drama</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="CienciaFiccion">Ciencia Ficción</option>
                    <option value="Otro">Otro</option>
                  </select>
            </div>
                  
                </div>
                            
    `;


  form.innerHTML = datos;
  }