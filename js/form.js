
var form = document.getElementById("contactForm");
    
    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("my-form-status");
        var data = new FormData(event.target);
        fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.classList.add("text-success");
            status.innerHTML = "¡Gracias por su mensaje!, me pondré en contacto con usted muy pronto";
            form.reset()
        } else {
            status.classList.add("text-danger");
            response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.innerHTML = "¡Oops! Hubo un problema al enviar su mensaje"
            }
            })
        }
    }).catch(error => {
        status.innerHTML = "¡Oops! Hubo un problema al enviar su formulario"
    });
    }
    
    form.addEventListener("submit", handleSubmit);
