// class Admin extends Usuario{
// constructor(username,email, password,imagen,peliFavorita =false, )
// super(username,email, password,imagen,peliFavorita =false)
// }

class Usuario {
  constructor(
    username,
    email,
    password,
    imagen,
    peliFavorita = false,
    admin = false
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
    this.peliFavorita = peliFavorita;
    this.admin = admin;
  }
}
let usuarios = [];

let user1 = new Usuario(
  "pgonzalez",
  "pedritobueno@gmail.com",
  "pp123456",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3b7G544olENi0w5Nxr95EW3K3AB5a3t-mbaVh644XQIRNaRXJ2WqHAAHcJPQajU_jmo&usqp=CAU"
);

const agregarUsuario = function () {
  let email = document.querySelector("#").value;
  let username = document.querySelector("#").value;
  let password = document.querySelector("#").value;
  let avatar = document.querySelector("#").value;

  //validar si el correo o el username ya existen
  let validacion = validarUsuario(email, username);

  if (!validacion) {
    usuarios.push(
      new Usuario(username, email, password, avatar, peliFavorita, admin)
    );
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.href = "#";
    // location.replace("../index.html");
  } else {
    alert(
      "Usuario o correo electrónico ya existe, inicie sesión con sus datos"
    );
    location.reload();
  }
};

// Validar al usuario
const validarUsuario = function (correo, username) {
  let checkEmail = usuarios.find(function (user) {
    return user.email === correo;
  });

  let checkUserName = usuarios.find(function (user) {
    return user.username === username;
  });

  if (checkEmail || checkUserName) {
    return true;
  } else {
    return false;
  }
};

agregarUsuario(user1);

//Validar los datos de logueo----------------------
const validarDatos = function () {
  let inputEmail = document.querySelector("#").value;
  let inputPassword = document.querySelector("#").value;

  let validar_email = usuarios.find(function (usuario) {
    return usuario.email === inputEmail;
  });

  //   console.log(validar_email);
  if (validar_email) {
    if (validar_email.password === inputPassword) {
      console.log("Usuario encontrado");
      let datos = {
        email: validar_email.email,
        username: validar_email.username,
        avatar: validar_email.imagen,
      };
      localStorage.setItem("usuario", JSON.stringify(datos));

      location.replace("#");
    } else {
      alert("Email o contraseña incorrecto");
    }
  } else {
    alert("Email o contraseña incorrecto");
  }
};

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  validarDatos();
});
