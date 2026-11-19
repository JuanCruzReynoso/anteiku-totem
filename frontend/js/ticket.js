// pantalla del ticket: muestra la compra y permite descargarla en PDF
const sale = JSON.parse(sessionStorage.getItem("anteiku_last_sale"));

if (!sale) {
    window.location.href = "index.html";
}

const ticket = document.getElementById("ticket");
const date = new Date(sale.date).toLocaleString("es-AR");

ticket.innerHTML = `
    <div class="ticket-head">
        <img src="img/logo-color.png" alt="Anteiku">
        <h2>Anteiku</h2>
        <p class="ticket-sub">Ticket #${sale.id}</p>
        <p class="ticket-sub">${date}</p>
        <p class="ticket-sub">Cliente: ${sale.user_name}</p>
    </div>
    <div class="ticket-items">
        ${sale.products.map(p => `
            <div class="ticket-row">
                <span>${p.name} x${p.cantidad}</span>
                <span>$ ${Number(p.subtotal).toLocaleString("es-AR")}</span>
            </div>
        `).join("")}
    </div>
    <div class="ticket-total">
        <span>TOTAL</span>
        <span>$ ${Number(sale.total_price).toLocaleString("es-AR")}</span>
    </div>
    <p class="ticket-thanks">Gracias por tu compra!</p>
`;

document.getElementById("pdfBtn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a5" });
    const ancho = doc.internal.pageSize.getWidth();

    doc.setDrawColor(185, 28, 28);
    doc.setLineWidth(0.5);
    doc.rect(8, 8, ancho - 16, 194);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ANTEIKU", ancho / 2, 24, { align: "center", charSpace: 2 });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 115);
    doc.text("Cafeteria & Store", ancho / 2, 30, { align: "center" });
    doc.setDrawColor(185, 28, 28);
    doc.line(45, 33, ancho - 45, 33);

    doc.setTextColor(10, 10, 10);
    doc.setFontSize(10);
    doc.text(`Ticket #${sale.id}`, 14, 42);
    doc.text(`${date}`, 14, 48);
    doc.text(`Cliente: ${sale.user_name}`, 14, 54);

    let y = 64;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, ancho - 14, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(115, 115, 115);
    doc.text("Producto", 14, y);
    doc.text("Cant.", 100, y, { align: "right" });
    doc.text("Subtotal", ancho - 14, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(10, 10, 10);

    sale.products.forEach(p => {
        const lineas = doc.splitTextToSize(p.name, 80);
        doc.text(lineas, 14, y);
        doc.text(String(p.cantidad), 100, y, { align: "right" });
        doc.text(`$ ${Number(p.subtotal).toFixed(2)}`, ancho - 14, y, { align: "right" });
        y += lineas.length * 4.5 + 2;
    });

    doc.setDrawColor(185, 28, 28);
    doc.setLineWidth(0.8);
    doc.line(14, y + 2, ancho - 14, y + 2);
    y += 9;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("TOTAL", 14, y);
    doc.text(`$ ${Number(sale.total_price).toFixed(2)}`, ancho - 14, y, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 115);
    doc.text("Gracias por tu compra!", ancho / 2, 190, { align: "center" });
    doc.text("Anteiku - autoservicio", ancho / 2, 195, { align: "center" });

    doc.save(`ticket_anteiku_${sale.id}.pdf`);
});

// al salir, el autoservicio vuelve a empezar de cero
document.getElementById("exitBtn").addEventListener("click", () => {
    localStorage.removeItem("anteiku_name");
    sessionStorage.removeItem("anteiku_last_sale");
});
