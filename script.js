const search = document.querySelector(".search");
const commandCards = document.querySelectorAll(".command-card");
const categoryButtons = document.querySelectorAll(".category");
const favoriteButtons = document.querySelectorAll(".favorite");

const totalCommands = document.querySelector("#totalCommands");
const totalCategories = document.querySelector("#totalCategories");
const totalFavorites = document.querySelector("#totalFavorites");


// =========================
// FAVORITOS SALVOS
// =========================

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let selectedCategory = "todos";


// =========================
// DASHBOARD
// =========================

function updateDashboard() {

    totalCommands.innerText = commandCards.length;

    totalCategories.innerText = categoryButtons.length - 2;

    totalFavorites.innerText = favorites.length;

}


// =========================
// MOSTRAR COMANDOS
// =========================

function filterCommands() {

    const searchText = search.value.toLowerCase().trim();

    commandCards.forEach(function (card) {

        const commandText = card.innerText.toLowerCase();
        const command = card.querySelector("code").innerText;

        const matchesSearch =
            commandText.includes(searchText);

        let matchesCategory = true;


        // FILTRO DE CATEGORIA

        if (selectedCategory !== "todos") {

            if (selectedCategory === "favoritos") {

                matchesCategory =
                    favorites.includes(command);

            } else {

                matchesCategory =
                    card.dataset.category === selectedCategory;

            }

        }


        // RESULTADO FINAL

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================
// PESQUISA
// =========================

search.addEventListener("input", function () {

    filterCommands();

});


// =========================
// CATEGORIAS
// =========================

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory = button.dataset.category;


        // Remove categoria ativa

        categoryButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Ativa categoria escolhida

        button.classList.add("active");


        // Filtra

        filterCommands();

    });

});


// =========================
// COPIAR COMANDO
// =========================

const copyButtons =
    document.querySelectorAll(".command-card button:not(.favorite)");

copyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const command =
            button.parentElement.querySelector("code").innerText;

        navigator.clipboard.writeText(command);

        button.innerText = "Copiado!";

        setTimeout(function () {

            button.innerText = "Copiar";

        }, 1500);

    });

});


// =========================
// FAVORITOS
// =========================

favoriteButtons.forEach(function (button) {

    const card = button.closest(".command-card");

    const command =
        card.querySelector("code").innerText;


    // Verifica favoritos existentes

    if (favorites.includes(command)) {

        button.innerText = "★";

    }


    // Clique no favorito

    button.addEventListener("click", function () {

        if (favorites.includes(command)) {

            favorites = favorites.filter(function (item) {

                return item !== command;

            });

            button.innerText = "☆";

        } else {

            favorites.push(command);

            button.innerText = "★";

        }


        // Salvar

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        // Atualizar dashboard

        updateDashboard();


        // Atualizar filtros

        filterCommands();

    });

});


// =========================
// INICIALIZAÇÃO
// =========================

updateDashboard();

filterCommands();
// =========================
// =========================
// MODO ESCURO
// =========================

const themeToggle = document.querySelector("#themeToggle");


// Verifica o tema salvo

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerText = "☀️";

}


// Alternar tema

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        themeToggle.innerText = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.innerText = "🌙";

        localStorage.setItem("theme", "light");

    }

});
