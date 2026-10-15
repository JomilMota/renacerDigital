
document.addEventListener("DOMContentLoaded", () => {

    const btnRecuperar = document.getElementById("btn-recuperar");
    const pantallaError = document.getElementById("pantalla-error");
    const contenido = document.getElementById("contenido");

    if (btnRecuperar && pantallaError && contenido) {
        btnRecuperar.addEventListener("click", () => {
            pantallaError.style.display = "none";
            contenido.style.display = "block";
        });
    }

    const abrirChat = document.getElementById("abrirChat");
    const chatVentana = document.getElementById("chatVentana");

    if (abrirChat && chatVentana) {
        abrirChat.addEventListener("click", () => {
            const estaAbierto =
                window.getComputedStyle(chatVentana).display !== "none";

            chatVentana.style.display = estaAbierto ? "none" : "block";
        });
    }

    const modoOscuro = document.getElementById("modoOscuro");

    if (modoOscuro) {
        modoOscuro.addEventListener("click", () => {
            document.body.classList.toggle("modoOscuro");
        });
    }

    let texto = "";

    document.addEventListener("keydown", (e) => {

        // Ignorar teclas especiales.
        if (e.key.length !== 1) return;

        texto += e.key.toLowerCase();
        texto = texto.slice(-20);

        if (texto.includes("culpable")) {
            texto = "";

            // Evitar abrir varios modales simultáneamente.
            if (document.getElementById("modalImagenIA")) return;

            // Fondo del modal.
            const modal = document.createElement("div");
            modal.id = "modalImagenIA";

            Object.assign(modal.style, {
                position: "fixed",
                inset: "0",
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                zIndex: "9999"
            });

            // Contenido.
            const caja = document.createElement("div");

            Object.assign(caja.style, {
                backgroundColor: "#101525",
                color: "#ffffff",
                padding: "25px",
                border: "2px solid #00e5ff",
                borderRadius: "12px",
                boxShadow: "0 0 25px rgba(0, 229, 255, 0.4)",
                textAlign: "center",
                maxWidth: "500px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto"
            });

            // Título.
            const titulo = document.createElement("h2");
            titulo.textContent = "Imagen generada con IA";
            titulo.style.color = "#00e5ff";

            // Imagen.
            const imagen = document.createElement("img");
            imagen.src = "assets/culpable.jpeg";
            imagen.alt = "culpable de saboteo digital";

            Object.assign(imagen.style, {
                display: "block",
                maxWidth: "100%",
                maxHeight: "55vh",
                objectFit: "contain",
                margin: "20px auto",
                borderRadius: "8px"
            });

            // Botón cerrar.
            const cerrar = document.createElement("button");
            cerrar.type = "button";
            cerrar.textContent = "Cerrar";

            Object.assign(cerrar.style, {
                padding: "10px 25px",
                backgroundColor: "#00e5ff",
                color: "#101525",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
            });

            // Función para cerrar.
            const cerrarModal = () => {
                modal.remove();
                document.removeEventListener("keydown", cerrarEscape);
            };

            // Cerrar con Escape.
            const cerrarEscape = (evento) => {
                if (evento.key === "Escape") {
                    cerrarModal();
                }
            };

            cerrar.addEventListener("click", cerrarModal);
            document.addEventListener("keydown", cerrarEscape);

            // Cerrar al hacer clic en el fondo.
            modal.addEventListener("click", (evento) => {
                if (evento.target === modal) {
                    cerrarModal();
                }
            });

            // Construir modal.
            caja.appendChild(titulo);
            caja.appendChild(imagen);
            caja.appendChild(cerrar);
            modal.appendChild(caja);

            document.body.appendChild(modal);
        }
    });

});
