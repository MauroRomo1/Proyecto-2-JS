let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// ID del elemento LI del home.
let linkCategoria = document.querySelector("#linkCategoria");

// Para abrir el modal.
let myModal = new bootstrap.Modal(document.getElementById("modalUser"), {
  keyboard: false,
});

// Funcion que actualiza el navbar si es que se logea un admin.
const actualizarNav = function () {
  if (usuario.email === "admin@gmail.com") {
    linkCategoria.innerHTML = `<a class="nav-link" href="../page/admin.html">Administracion</a>`;
  } else {
    linkCategoria.innerHTML = `<a class="nav-link" href="#">Mi lista</a>`;
  }
};
actualizarNav();

// ID del body del modal.
let modalBody = document.querySelector("#bodyModal");

let estructuraCard = `
<!-- Card del modal -->
            <div class="card mb-3 border border-white" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="../img/${usuario.avatar}.png"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h3 class="card-title text-black">${usuario.username}</h3>
                    <p class="card-text text-muted">
                      ${usuario.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
<!-- Card modal fin -->
`;
modalBody.innerHTML = estructuraCard;
// Evento del modal
document.querySelector("#userLink").addEventListener("click", function () {
  myModal.show();
});
