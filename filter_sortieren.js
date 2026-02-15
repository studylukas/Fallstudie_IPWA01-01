const table = document.getElementById("companyTable");
const tbody = table.querySelector("tbody");
const rows = Array.from(tbody.querySelectorAll("tr"));

// ---------------- SPALTEN-FILTER ----------------
document.querySelectorAll(".column-filter").forEach(input => {
    input.addEventListener("input", () => {
        const filters = {};

        // Alle Filter einsammeln
        document.querySelectorAll(".column-filter").forEach(inp => {
            const col = inp.dataset.col;
            const val = inp.value.toLowerCase();
            if (val.trim() !== "") filters[col] = val;
        });

        // Jede Tabellenzeile prüfen
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            let visible = true;

            for (const col in filters) {
                const cellText = cells[col].textContent.toLowerCase();
                if (!cellText.includes(filters[col])) {
                    visible = false;
                    break;
                }
            }

            row.style.display = visible ? "" : "none";
        });
    });
});


let sortColumn = null;
let sortDirection = "asc";

table.querySelectorAll("th[data-col]").forEach(th => {
    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
        const col = th.dataset.col;

        // Richtung umschalten
        if (sortColumn === col) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortColumn = col;
            sortDirection = "asc";
        }

        const sortedRows = [...rows].sort((a, b) => {
            const A = a.children[col].textContent.trim();
            const B = b.children[col].textContent.trim();

            // Zahlen korrekt sortieren (auch mit Punkten)
            const valA = isNaN(A.replace(/\./g, "")) ? A.toLowerCase() : Number(A.replace(/\./g, ""));
            const valB = isNaN(B.replace(/\./g, "")) ? B.toLowerCase() : Number(B.replace(/\./g, ""));

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        // Tabelle neu rendern
        tbody.innerHTML = "";
        sortedRows.forEach(row => tbody.appendChild(row));
    });
});
