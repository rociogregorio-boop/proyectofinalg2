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
        console.error(`${error}`);
    }
}

let tarjet = await capturarDatos();
let contenedorTarjeta = document.querySelector("#tarjeta");
let btnAl = document.querySelector("#btnAl");
let addL = document.querySelector("#addL");
renderizarHtml(tarjet)

function renderizarHtml(lista){
    contenedorTarjeta.innerHTML=""
    for (const tarjeta of lista){
     
        let tarjetasGeneradas = "" ;
    
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
    contenedorTarjeta.innerHTML += tarjetasGeneradas;
        }
    
}





// FILTRO POR CIUDAD
function filtrarCiudad() {

    let ciudad = addL.value.toLowerCase().trim();


    let resultado = tarjet.filter((lugar) =>

        lugar.city.toLowerCase().includes(ciudad)

    );
    renderizarHtml(resultado)

  
    console.log(resultado)
}


addL.addEventListener("input", () => {

    filtrarCiudad();

    btnAl.textContent =
        addL.value === ""
            ? "Add location"
            : addL.value;
});
console.log(filtrarCiudad)


// ABRIR Y CERRAR MODAL
let boton = document.querySelector("#boton");
let dropdwn = document.querySelector("#dropdwn");

boton.addEventListener("click", () => {
    dropdwn.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {

    if (
        !dropdwn.contains(e.target) &&
        !boton.contains(e.target)
    ) {
        dropdwn.classList.add("hidden");
    }
});