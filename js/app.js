class Usuario {
  constructor(nombre, username, email, password, imagen) {
    this.nombre = nombre;
    this.username = username;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
  }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Llamamos al formulario apartir de su clase, que trae todo los input o nodos que hay en el
let forms = document.querySelectorAll(".needs-validation");

//  esta parte sirve para comprovar que el usuario ingrese los datos y no deje los campos vacios
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      agregarUsuarios();
    }
    form.classList.add("was-validated");
  });
});

const agregarUsuarios = function () {
  let email = document.querySelector("#validationCustom01").value;
  let nombre = document.querySelector("#validationCustom02").value;
  let username = document.querySelector("#validationCustom03").value;
  let password = document.querySelector("#validationCustom04").value;
  let avatar = document.querySelector("#validationCustom05").value;

  // Validar si el correo o el username ya existen
  let validacion = validarUsuario(email, username);
  if (!validacion) {
    usuarios.push(new Usuario(nombre, username, email, password, avatar));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.href = "../index.html";
  } else {
    alert(
      "El usuario o correo electrónico ya existe, inicie sesión con sus datos."
    );
    location.reload();
  }
};

// Funcion que valida el usuario.
const validarUsuario = function (correo, username) {
  let checkEmail = usuarios.find(function (user) {
    return user.email === correo;
  });
  let checkUsername = usuarios.find(function (user) {
    return user.username === username;
  });

  if (checkEmail || checkUsername) {
    return true;
  } else {
    return false;
  }
};

//==== Esta funcion es para validar los datos de logueo ====
const validarDatos = function () {
  let inputEmail = document.querySelector("#input_email").value;
  let inputPassword = document.querySelector("#input_password").value;

  let validar_email = usuarios.find(function (usuario) {
    return usuario.email === inputEmail;
  });

  if (validar_email) {
    if (validar_email.password === inputPassword) {
      let datos = {
        email: validar_email.email,
        username: validar_email.username,
        avatar: validar_email.imagen,
      };
      localStorage.setItem("usuario", JSON.stringify(datos));
      location.replace("../page/home.html");
    } else {
      alert("Email o contraseña incorrectos");
    }
  } else {
    alert("Email o contraseña incorrectos");
  }
};

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  validarDatos();
});
