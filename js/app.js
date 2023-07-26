// Declarar variables para capturar la información
let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');
let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};
let requestUrl = "https://api.exchangerate.host/latest?base=USD";

// Funcion async
/**
 * await dice que hay que esperar que toma la respuesta de la api requestUrl
 */

// fetchRates();

async function fetchRates(){
    let res = await fetch(requestUrl);
    rer = await res.json();
    rates = res.rates();
}

// Función tradicional
/**
 * Función para las opciones
 */

function populateOptions() {
    let val = '';
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        // incrementar el option
        // val += str; equivalente a val = val +str;
        val += str;
    })
    // mostrar las opciones
    selects.forEach((s)=>(s.innerHTML = val));
}

/**
 * 
 * @param {Number} val valor de conversión
 * @param {Number} fromCurr moneda inicial
 * @param {Number} toCurr moneda a convertir
 */
// Crear la función para hacer la conversión
function convert(val,fromCurr,toCurr) {
    // declarar variables de ámbito local
    let v = (val/rates[fromCurr])*rates[toCurr];
    let v1 = v.toFixed(3);
    // validar con if ternario
    return v1 == 0.0 ? v1.toFixed(5): v1;
}

// función para los select
function displayRate() {
    // declarar variables en el ámbito local
    let v1 = sel1.value;
    let v2 = sel2.value;
    
    let val = convert(1,v1,v2);

    // imprimir en elemento html
    rate1.innerHTML = `1 ${v1} equals `;
    rate1.innerHTML = `${val} ${v2} `;
}