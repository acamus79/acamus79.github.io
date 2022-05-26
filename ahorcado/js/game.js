//const completo = "1234567890abcdefghijklmnñopqrstuvwxyzç., ";
//const querty = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
const abc = "ABCDEFJHIJKLMNÑOPQRSTUVWXYZ"
const idTeclas = document.getElementById("teclas");
let palabraJugando = [];

var listaPalabras = ["PYTHON","AZUCAR","MEXICO","RADIO","BITCOIN"];
let palabraAdivinar = [];
let palabraMostrar = [];
let historialLetrasUsuario = [];
let numIntentos = 10;
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

// por defecto indicamos que muestre el teclado querty
dibujaTeclas(abc);

// función que recibe la pulsación de la tecla
// tanto del teclado fisico como del teclado dibujado en la pantalla
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

//necesito capturar lo que ingrese el usuario mediante el teclado y cada vez que lo haga
// esto lo hago con la funcion teclaPulsada del teclado
function compara(e){

    for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
        // Comprobamos si la letra del usuario es igual a la letra a adivinar
        if (e == letraAdivinar) {
            // Sustituimos el guion por la letra acertada
            palabraMostrar[posicion] = letraAdivinar;
        }
    }
    
    //// 2 Comprobamos si se ha equivocado
        // ¿No esta la letra?
        if (!palabraAdivinar.includes(e)) {
            // Restamos un intento
            numIntentos -= 1;
            // Guardamos en el historial la letra pulsada por el usuario
            historialLetrasUsuario.push(e);
        }
console.log(palabraMostrar)
muestraJuego();

}

function muestraJuego () {
    guiones.textContent = palabraMostrar.join(' ');
    //Muestro la cantidad de intentos
    document.getElementById("intentos").textContent = numIntentos;
}
