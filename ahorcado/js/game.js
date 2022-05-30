document.addEventListener('DOMContentLoaded', function () {
const abc = "ABCDEFJHIJKLMNÑOPQRSTUVWXYZ"
const idTeclas = document.getElementById("teclas");
var listaPalabras = ["PARLANTE","AZUCAR","ARGENTINA","RADIO","FOTOGRAFIA", "IMPRESORA", "MASCOTA"];//Array de Palabras para Jugar
let palabraAdivinar = []; //Array de letras que forman la palabra a adivinar
let palabraMostrar = []; //Array de guiones y letras para mostrar el desarrollo del juego
let historialLetrasUsuario = [];
let numIntentos = 7;
let guiones = document.getElementById("guiones");
const dibujaTeclas = listadoLetras => {
    idTeclas.innerHTML="";
    listadoLetras.split('').map(elemento => {
        let span=document.createElement("span");
        span.addEventListener("click", teclaPulsada);
        span.innerText = elemento;
        idTeclas.appendChild(span);
    });
}
dibujaTeclas(abc);
function teclaPulsada(e) {
    const tecla = this.classList && this.classList.contains("space") ? " " : this.innerText;
    if (abc.indexOf(tecla)>=0) {
        document.getElementById("texto").value+=tecla;
        compara(tecla);
        return tecla.value;
    }
}
function mayusculas(e) {
    e.value = e.value.toUpperCase();
}
palabraAdivinar = listaPalabras[Math.floor(Math.random()*(listaPalabras.length))];
palabraAdivinar = palabraAdivinar.split('');
palabraAdivinar.forEach(element => {
    palabraMostrar.push('_');
});
guiones.textContent = palabraMostrar.join(' ');
function compara(e){
    for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
        if (e == letraAdivinar) {
            palabraMostrar[posicion] = letraAdivinar;
        }
    }
        if (!palabraAdivinar.includes(e)) {
            numIntentos -= 1;
            mostrarImagen(numIntentos);
            historialLetrasUsuario.push(e);
        }
muestraJuego();
ahorcado();
}
function muestraJuego() {
    guiones.textContent = palabraMostrar.join(' ');
    document.getElementById("intentos").textContent = numIntentos;
    document.getElementById("historial").textContent = historialLetrasUsuario.join(' ');
}
function ahorcado() {
    if (!palabraMostrar.includes('_')) {
        alert('Has ganado!!!');
        location.reload(true);
    }
    if (numIntentos == 0) {
        alert('Has Perdido!!! La palabra era: ' + palabraAdivinar.join(''));
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
});