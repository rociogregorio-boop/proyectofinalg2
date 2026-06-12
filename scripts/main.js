/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
async function capturarDatos() {
    try {
        let respuesta = await fetch("/stays.json");
        let data = await respuesta.json();
        return data;
    } catch (error) {
        alert(`${error}`);
    }
}
//defino variables globales para comunicarme con el DOM
let tarjet = await capturarDatos();
let contenedorTarjeta = document.querySelector("#tarjeta");
let btnAl = document.querySelector("#btnAl");
let addL = document.querySelector("#addL");
renderizarHtml(tarjet)


function renderizarHtml(lista){
    //limpia el contenedor principal
    contenedorTarjeta.innerHTML=""
    //declaro una variable q almacena mis tarj
        let tarjetasGeneradas = "" ;
        //recorre el array y los almacen dentro de mi tarjetasGeneradas
        for (const tarjeta of lista){
     
      tarjetasGeneradas+=`
            <div>

            <img class="rounded-3xl w-full h-60 object-cover p-4" src=${tarjeta.photo} alt="Stylist apartment in center of the city">
            <div class="flex justify-between text-xs text-gray-600">
            <div class="flex items-center gap-2 text-xs text-gray-600">
           <div class="flex items-center gap-2 text-xs text-gray-600">
          ${tarjeta.superHost 
            ? `<span class="border border-gray-400 text-gray-700 font-bold uppercase px-2 py-0.5 rounded-full text-[10px]">SUPERHOST</span>` 
           : ''
          }
         <p>${tarjeta.type}. ${tarjeta.beds ?? ""} beds  </p>
          </div>

            </div>
            <span class="flex items-center gap-1">
            
             <img src="/star.svg" alt= "star" class="w-4 h-4 ">${tarjeta.rating}</span>
            </div>
            <h2 class="text-lg font-bold dark:text-[#EBEFF5]"> ${tarjeta.title}</h2> 
           
            </div>
            </div>

        </div>`
   
        }
//convierte targetaGeneradas en html
     contenedorTarjeta.innerHTML = tarjetasGeneradas;
}





//
function filtrarCiudad() {

    let ciudad = addL.value.toLowerCase().trim();


    let resultado = tarjet.filter((lugar) =>

        lugar.city.toLowerCase().includes(ciudad)

    );
    renderizarHtml(resultado)

  
   
}


addL.addEventListener("input", () => {

    filtrarCiudad();

    btnAl.textContent =
        addL.value === ""
            ? "Add location"
            : addL.value;
});



// 

let ocultar = document.querySelector("#close");   // search
let mostrar = document.querySelector("#boton");   // Barra del header
let menu    = document.querySelector("#dropdwn"); // El modal entero

ocultar.addEventListener("click", () => {
    menu.classList.add("hidden");
});

mostrar.addEventListener("click", () => {
  
    menu.classList.remove("hidden");
});

//defini variable para interactuar con contadoresde huesped

let btnAddGuest = document.querySelector("#btnAddGuest");

let menosAdult = document.querySelector("#menosAdult");
let masAdult = document.querySelector("#masAdult");
let adultCount = document.querySelector("#adultCount");

let menosNinos = document.querySelector("#menosNinos");
let masNinos = document.querySelector("#masNinos");
let childCount = document.querySelector("#childCount");

let addGuestAC = document.querySelector("#addGuestAC");
//
let contador = 0;
let contadorNinos = 0;
function filtrarTodo() {

    let ciudad = addL.value.toLowerCase().trim();

    let huespedes = contador + contadorNinos;

    let resultado = tarjet.filter((lugar) => {

        let coincideCiudad =
            ciudad === "" ||
            lugar.city.toLowerCase().includes(ciudad) ||
            lugar.country.toLowerCase().includes(ciudad);

        let coincideHuespedes =
            huespedes === 0 ||
            lugar.maxGuests >= huespedes;

        return coincideCiudad && coincideHuespedes;
    });

   renderizarHtml(resultado);
}
addL.addEventListener("input", () => {

    btnAl.textContent =
        addL.value.trim() === ""
            ? "Add location"
            : addL.value;

    filtrarTodo();
});

btnAddGuest.addEventListener("click", () => {

    addGuestAC.classList.toggle("hidden");
});
masAdult.addEventListener("click", () => {

    contador++;

    adultCount.textContent = contador;

    actualizarHuespedes();
});

menosAdult.addEventListener("click", () => {

    if (contador > 0) {

        contador--;

        adultCount.textContent = contador;

        actualizarHuespedes();
    }
});
masNinos.addEventListener("click", () => {

    contadorNinos++;

    childCount.textContent = contadorNinos;

    actualizarHuespedes();
});

menosNinos.addEventListener("click", () => {

    if (contadorNinos > 0) {

        contadorNinos--;

        childCount.textContent = contadorNinos;

        actualizarHuespedes();
    }
});

function actualizarHuespedes() {

    let total = contador + contadorNinos;

    btnAddGuest.value =
        total > 0
            ? `${total} guests`
            : "";

    filtrarTodo();
}
let btnBuscar = document.querySelector("#btnBuscar");

btnBuscar.addEventListener("click", () => {

    filtrarTodo();

    dropdwn.classList.add("hidden");
});