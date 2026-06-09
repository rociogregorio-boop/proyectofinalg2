/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from "./stays";
async function capturarDatos() {
    try{
        let respuesta = await fetch("/stays.json");
        let data = await respuesta.json();
        return data;

    } catch (error){
        console.error(`${error}`)
    }
}
let tarjet = await capturarDatos();
// console.log(tarjet)
let contenedorTarjeta = document.querySelector("#tarjeta");

for (const tarjeta of tarjet){
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
         <p>${tarjeta.type}. ${tarjeta.beds ??= ""} beds  </p>
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
