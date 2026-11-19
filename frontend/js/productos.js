// pantalla de productos: menu por categoria con paginacion
const clientName = localStorage.getItem("anteiku_name");
if (!clientName) {
    window.location.href = "index.html";
}
document.getElementById("clientGreeting").textContent = clientName;
updateBadge();

const grid = document.getElementById("productsGrid");
const pageInfo = document.getElementById("pageInfo");
let page = 1;
let totalPages = 1;
let category = "coffee";

async function load() {
    grid.innerHTML = "<p class='loading'>Cargando productos...</p>";
    try {
        const data = await fetchProducts(page, category);
        totalPages = data.totalPages;
        render(data.products);
        pageInfo.textContent = `Pagina ${data.page} de ${data.totalPages}`;
    } catch (error) {
        renderLoadError();
    }
}

function render(products) {
    grid.innerHTML = "";
    if (products.length === 0) {
        grid.innerHTML = "<p class='loading'>No hay productos en esta categoria.</p>";
        return;
    }
    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-img">
                <img src="${imageUrl(product.image)}" alt="${product.name}">
            </div>
            <div class="card-body">
                <h3 title="${product.name}">${product.name}</h3>
                <span class="cat">${product.category === "coffee" ? "Cafeteria" : "Merchandising"}</span>
                <p class="price">$ ${Number(product.price).toLocaleString("es-AR")}</p>
                <button class="btn btn-primary" data-id="${product.id}">Agregar al carrito</button>
            </div>
        `;
        card.querySelector("button").addEventListener("click", () => {
            addToCart(product);
            updateBadge();
        });
        grid.appendChild(card);
    });
}

function renderLoadError() {
    grid.innerHTML = `
        <div class="load-error">
            <p>No pudimos cargar el menu en este momento.</p>
            <button class="btn" id="retryBtn">Reintentar</button>
        </div>
    `;
    document.getElementById("retryBtn").addEventListener("click", load);
}

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");
        category = tab.dataset.cat;
        page = 1;
        load();
    });
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (page > 1) {
        page--;
        load();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (page < totalPages) {
        page++;
        load();
    }
});

load();
