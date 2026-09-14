let fotoBase64 = "";
const textFields = [
    "cliente", "lugar", "fecha", "atendidos", "motor", "serie", "ht", "motivo",
    "rev-combustible", "rev-racor", "rev-escape", "rev-admision", "rev-flujo", "rev-radiador",
    "rev-anclaje", "rev-transmision", "rev-cables", "rev-tablero", "rev-sensores", "rev-cubierta",
    "diag-arranque", "diag-prueba", "diag-causas",
    "pf-presion", "pf-aceite", "pf-agua-del", "pf-agua-al", "pf-gases", "pf-rodamientos",
    "trabajos-motor", "trabajos-electrico"
];

document.addEventListener("DOMContentLoaded", () => {
    const borrador = localStorage.getItem("borradorFichaV2");
    if (borrador) {
        const datos = JSON.parse(borrador);
        textFields.forEach(id => {
            if (datos[id]) document.getElementById(id).value = datos[id];
        });
        
        if (datos.foto) {
            fotoBase64 = datos.foto;
            document.getElementById("preview-foto").src = fotoBase64;
            document.getElementById("preview-foto").style.display = "block";
        }
    }
});

document.getElementById("foto").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoBase64 = event.target.result;
            document.getElementById("preview-foto").src = fotoBase64;
            document.getElementById("preview-foto").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

window.guardarBorrador = function() {
    const datos = {};
    textFields.forEach(id => {
        datos[id] = document.getElementById(id).value;
    });
    datos.foto = fotoBase64;
    
    localStorage.setItem("borradorFichaV2", JSON.stringify(datos));
    alert("Borrador guardado exitosamente. Puedes cerrar la app y continuar luego.");
};

window.limpiarFormulario = function() {
    if(confirm("¿Estás seguro de querer limpiar todo el informe?")) {
        localStorage.removeItem("borradorFichaV2");
        document.getElementById("tech-form").reset();
        document.getElementById("preview-foto").style.display = "none";
        fotoBase64 = "";
    }
};