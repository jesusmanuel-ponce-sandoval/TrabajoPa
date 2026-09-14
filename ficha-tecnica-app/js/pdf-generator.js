window.prepararYGenerarPDF = function() {
    const fields = [
        "cliente", "lugar", "fecha", "atendidos", "motor", "serie", "ht", "motivo",
        "rev-combustible", "rev-racor", "rev-escape", "rev-admision", "rev-flujo", "rev-radiador",
        "rev-anclaje", "rev-transmision", "rev-cables", "rev-tablero", "rev-sensores", "rev-cubierta",
        "diag-arranque", "diag-prueba", "diag-causas",
        "pf-presion", "pf-aceite", "pf-agua-del", "pf-agua-al", "pf-gases", "pf-rodamientos",
        "trabajos-motor", "trabajos-electrico"
    ];

    fields.forEach(id => {
        const input = document.getElementById(id);
        const valor = input ? input.value : "";
        const outElement = document.getElementById("out-" + id);
        if (outElement) outElement.textContent = valor || "-";
    });

    const pdfFotoImg = document.getElementById("out-foto-img");
    if (pdfFotoImg && typeof fotoBase64 !== 'undefined' && fotoBase64 !== "") {
        pdfFotoImg.src = fotoBase64;
        pdfFotoImg.style.display = "block";
    } else if (pdfFotoImg) {
        pdfFotoImg.style.display = "none";
    }

    const element = document.getElementById('pdf-content');
    const container = document.getElementById('pdf-container');
    if (!element || !container) {
        alert("No se encontró la plantilla del PDF.");
        return;
    }
    const cliente = document.getElementById("cliente");
    const fileName = `Informe_${(cliente ? cliente.value : "Visita") || "Visita"}`
        .replace(/[\\/:*?"<>|]+/g, "-");
    const printWindow = window.open("", "_blank", "width=900,height=1200");

    if (!printWindow) {
        alert("El navegador bloqueó la ventana del PDF. Permite las ventanas emergentes e inténtalo de nuevo.");
        return;
    }

    const pdfMarkup = element.cloneNode(true).outerHTML;
    printWindow.document.open();
    printWindow.document.write(`<!doctype html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>${fileName}</title>
            <style>
                @page { size: A4 portrait; margin: 12mm; }
                * { box-sizing: border-box; }
                body { margin: 0; color: #111; background: #fff; font-family: Arial, sans-serif; }
                #pdf-content { width: 100%; min-height: 270mm; padding: 5mm; font-size: 11px; }
                p { line-height: 1.35; }
                h4 { margin-bottom: 5px; }
                img { max-width: 100%; }
                a { color: #111; }
            </style>
        </head>
        <body>${pdfMarkup}</body>
        </html>`);
    printWindow.document.close();
    printWindow.document.title = fileName;
    printWindow.addEventListener("load", () => {
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 250);
    });
};