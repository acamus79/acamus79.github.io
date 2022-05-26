//const completo = "1234567890abcdefghijklmnñopqrstuvwxyzç., ";
//const querty = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
const abc = "ABCDEFJHIJKLMNÑOPQRSTUVWXYZ"
const idTeclas = document.getElementById("teclas");
let palabraJugando = [];

// funcion para mostrar las letras, recibe por parametro el abecedario
const dibujaTeclas = listadoLetras => {
    idTeclas.innerHTML="";
    // añadimos las letras
    listadoLetras.split('').map(elemento => {
        let span=document.createElement("span");
        span.addEventListener("click", teclaPulsada);
        span.innerText = elemento;
        idTeclas.appendChild(span);
    });
}

// por defecto indicamos que muestre el teclado querty
dibujaTeclas(abc);

// función que recibe la pulsación de la tecla
// tanto del teclado fisico como del teclado dibujado en la pantalla
function teclaPulsada(e) {
    const tecla = this.classList && this.classList.contains("space") ? " " : this.innerText;
    
    if (abc.indexOf(tecla)>=0) {
        document.getElementById("texto").value+=tecla;
        palabraJugando.push(tecla);
        console.log(palabraJugando);
        return tecla.value;
    }
}

// Funcion JavaScript para la conversion a mayusculas
function mayusculas(e) {
    e.value = e.value.toUpperCase();
}