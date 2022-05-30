/*
 
*/
//Antes de ejecutar el script espera que toda la página se dibuje
document.addEventListener('DOMContentLoaded', function () {

//==== DECLARACION DE CONSTANTES ====
//const completo = "1234567890abcdefghijklmnñopqrstuvwxyzç., ";
//const querty = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
const abc = "ABCDEFJHIJKLMNÑOPQRSTUVWXYZ"
const idTeclas = document.getElementById("teclas");

// ==== DECLARACION DE VARIABLES ====
var listaPalabras = ["PYTHON","AZUCAR","MEXICO","RADIO","BITCOIN"];//Array de Palabras para Jugar
let palabraAdivinar = []; //Array de letras que forman la palabra a adivinar
let palabraMostrar = []; //Array de guiones y letras para mostrar el desarrollo del juego
let historialLetrasUsuario = [];
let numIntentos = 7;
let guiones = document.getElementById("guiones");

//============== TECLADO ==============
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
// llamo a la funcion para dibujar las teclas y le indico que muestre el teclado abc
dibujaTeclas(abc);

// función que recibe la pulsación de la tecla tanto del teclado fisico como del teclado dibujado en la pantalla
function teclaPulsada(e) {
    const tecla = this.classList && this.classList.contains("space") ? " " : this.innerText;
    if (abc.indexOf(tecla)>=0) {
        document.getElementById("texto").value+=tecla;
        compara(tecla); //por cada tecla que se pulse llamo a la funcion compara
        return tecla.value;
    }
}

// Funcion JavaScript para la conversion a mayusculas
function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

// =================== JUEGO =====================

//de la lista de palabras obtengo una para adivinar de forma aleatoria con random
palabraAdivinar = listaPalabras[Math.floor(Math.random()*(listaPalabras.length))];
console.log("Aca solo elegi la palabra = " + palabraAdivinar);

//esa palabra la transformo en un array de letras
palabraAdivinar = palabraAdivinar.split('');
console.log("Aca la separe en letras = " + palabraAdivinar);
console.log(palabraAdivinar);
//necesito un array de guiones con el mismo indice que la palabra a adivinar
//recorro la palabra y por cada posicion asigno un guion en mi array para mostrar
palabraAdivinar.forEach(element => {
    palabraMostrar.push('_');
});
console.log("Aca hice que los guiones a mostrar tengan el mismo indice de la palabra = " + palabraMostrar);
console.log(palabraMostrar);
//ahora le tengo que mostrar al usuario ese array de guiones
//con el join le digo como quiero que me muestre las uniones de los indices
guiones.textContent = palabraMostrar.join(' ');

/*
Funcion compara(e): 
Necesito capturar lo que ingrese el usuario mediante el teclado, cada vez que presione o haga
click en una tecla debo comparar la letra seleccionada con la palabra elegida aleatoriamente
esto lo hago desde la funcion teclaPulsada() por cada pulsacion llamo a esta funcion compara()
*/
function compara(e){
//por cada posicion del array palabraAdivinar creo una variable letraAdivinar
    for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
        // Compruevo si la letra del usuario es igual a la letra a adivinar
        if (e == letraAdivinar) {
            // si coincide cambio el guion por la letra acertada
            palabraMostrar[posicion] = letraAdivinar;
        }
    }
// Compruebo si se ha equivocado: si el array palabraAdivinar no contiene la letra elegida
        if (!palabraAdivinar.includes(e)) {
            // Restamos un intento
            numIntentos -= 1;
            //aca debo llamar a la funcion para que muestre u oculte imagen
            mostrarImagen(numIntentos);
            // Guardo en el historial la letra pulsada por el usuario
            historialLetrasUsuario.push(e);
        }
console.log(palabraMostrar)
muestraJuego();
ahorcado();

}

function muestraJuego() {

    guiones.textContent = palabraMostrar.join(' ');
    //Muestro la cantidad de intentos
    document.getElementById("intentos").textContent = numIntentos;
}

function ahorcado() {
    // Reviso si quedan guiones
    if (!palabraMostrar.includes('_')) {
        alert('Has ganado!!!');
        //Recargo la página para volver a jugar
        location.reload(true);
    }
    // Reviso intentos
    if (numIntentos == 0) {
        alert('Has Perdido!!! La palabra era: ' + palabraAdivinar.join(''));
        //Recargo la página para volver a jugar
        location.reload(true);
    }
}

function mostrarImagen(numIntentos){
    switch (numIntentos) {
        case 0:
            document.getElementById("img7").style.visibility = "visible";
            break;
        case 1:
            document.getElementById("img6").style.visibility = "visible";
            break;
        case 2:
            document.getElementById("img5").style.visibility = "visible";
            break;
        case 3:
            document.getElementById("img4").style.visibility = "visible";
            break;
        case 4:
            document.getElementById("img3").style.visibility = "visible";
            break;
        case 5:
            document.getElementById("img2").style.visibility = "visible";
            break;
        case 6:
            document.getElementById("img1").style.visibility = "visible";
            break;

}

}




// ==== FIN ====
});