//const abecedario = "1234567890abcdefghijklmnñopqrstuvwxyzç., ";
const querty = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
const idLetras = document.getElementById("letras");

// funcion para mostrar las letras, recibe por parametro el abecedario
const dibujaTeclas = listadoLetras => {
    idLetras.innerHTML="";
    // añadimos las letras
    listadoLetras.split('').map(elemento => {
        let span=document.createElement("span");
        span.addEventListener("click", teclaPulsada);
        span.innerText = elemento;
        idLetras.appendChild(span);
    });
}

// por defecto indicamos que muestre el teclado querty
dibujaTeclas(querty);

// función que recibe la pulsación de la tecla
// tanto del teclado fisico como del teclado dibujado en la pantalla
function teclaPulsada(e) {
    const tecla = this.classList && this.classList.contains("space") ? " " : this.innerText;
    
    if (querty.indexOf(tecla)>=0) {
        document.getElementById("texto").value+=tecla;
        tecla.style.color = "indianred";
    }

}
