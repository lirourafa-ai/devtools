// =========================
// BASE DE COMANDOS
// =========================

const commands = [

    // GIT
    {
        name: "git status",
        description: "Mostra o estado atual do repositório.",
        command: "git status",
        category: "git"
    },

    {
        name: "git clone",
        description: "Clona um repositório remoto.",
        command: "git clone URL_DO_REPOSITORIO",
        category: "git"
    },

    {
        name: "git add",
        description: "Adiciona arquivos para o próximo commit.",
        command: "git add .",
        category: "git"
    },

    {
        name: "git commit",
        description: "Registra as alterações no repositório.",
        command: 'git commit -m "mensagem"',
        category: "git"
    },

    {
        name: "git push",
        description: "Envia alterações para o repositório remoto.",
        command: "git push",
        category: "git"
    },

    {
        name: "git pull",
        description: "Baixa as alterações do repositório remoto.",
        command: "git pull",
        category: "git"
    },


    // LINUX
    {
        name: "mkdir",
        description: "Cria uma nova pasta.",
        command: "mkdir nome-da-pasta",
        category: "linux"
    },

    {
        name: "cd",
        description: "Acessa uma pasta pelo terminal.",
        command: "cd nome-da-pasta",
        category: "linux"
    },

    {
        name: "ls",
        description: "Lista arquivos e pastas.",
        command: "ls",
        category: "linux"
    },

    {
        name: "pwd",
        description: "Mostra o diretório atual.",
        command: "pwd",
        category: "linux"
    },

    {
        name: "clear",
        description: "Limpa o terminal.",
        command: "clear",
        category: "linux"
    },


    // PYTHON
    {
        name: "python --version",
        description: "Mostra a versão instalada do Python.",
        command: "python --version",
        category: "python"
    },

    {
        name: "pip install",
        description: "Instala um pacote Python.",
        command: "pip install nome-do-pacote",
        category: "python"
    },

    {
        name: "python",
        description: "Inicia o interpretador Python.",
        command: "python",
        category: "python"
    },

    {
        name: "pip list",
        description: "Lista os pacotes Python instalados.",
        command: "pip list",
        category: "python"
    },


    // SQL
    {
        name: "SELECT",
        description: "Consulta registros de uma tabela.",
        command: "SELECT * FROM usuarios;",
        category: "sql"
    },

    {
        name: "INSERT",
        description: "Insere um novo registro.",
        command: "INSERT INTO usuarios VALUES (...);",
        category: "sql"
    },

    {
        name: "UPDATE",
        description: "Atualiza registros existentes.",
        command: "UPDATE usuarios SET nome = 'João';",
        category: "sql"
    },

    {
        name: "DELETE",
        description: "Remove registros de uma tabela.",
        command: "DELETE FROM usuarios WHERE id = 1;",
        category: "sql"
    }

];


// =========================
// ELEMENTOS DA PÁGINA
// =========================

const commandsContainer =
    document.querySelector("#commandsContainer");

const search =
    document.querySelector(".search");

const categoryButtons =
    document.querySelectorAll(".category");

const totalCommands =
    document.querySelector("#totalCommands");

const totalCategories =
    document.querySelector("#totalCategories");

const totalFavorites =
    document.querySelector("#totalFavorites");


// =========================
// FAVORITOS
// =========================

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

let selectedCategory = "todos";


// =========================
// CRIAR CARDS
// =========================

commands.forEach(function (item) {

    const card =
        document.createElement("div");

    card.classList.add("command-card");

    card.dataset.category =
        item.category;

    card.innerHTML = `

        <button class="favorite">☆</button>

        <h2>${item.name}</h2>

        <p>${item.description}</p>

        <code>${item.command}</code>

        <button class="copy-button">Copiar</button>

    `;

    commandsContainer.appendChild(card);

});


// =========================
// SELECIONAR CARDS
// =========================

const commandCards =
    document.querySelectorAll(".command-card");

const favoriteButtons =
    document.querySelectorAll(".favorite");

const copyButtons =
    document.querySelectorAll(".copy-button");


// =========================
// DASHBOARD
// =========================

function updateDashboard() {

    totalCommands.innerText =
        commandCards.length;

    totalCategories.innerText =
        categoryButtons.length - 2;

    totalFavorites.innerText =
        favorites.length;

}


// =========================
// FILTRAR COMANDOS
// =========================

function filterCommands() {

    const searchText =
        search.value.toLowerCase().trim();


    commandCards.forEach(function (card) {

        const commandText =
            card.innerText.toLowerCase();

        const command =
            card.querySelector("code").innerText;


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


        // MOSTRAR OU ESCONDER

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

        selectedCategory =
            button.dataset.category;


        categoryButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        filterCommands();

    });

});


// =========================
// COPIAR COMANDO
// =========================

copyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const command =
            button.parentElement
            .querySelector("code")
            .innerText;


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

    const card =
        button.closest(".command-card");

    const command =
        card.querySelector("code").innerText;


    // VERIFICAR FAVORITO SALVO

    if (favorites.includes(command)) {

        button.innerText = "★";

    }


    // CLIQUE

    button.addEventListener("click", function () {

        if (favorites.includes(command)) {

            favorites =
                favorites.filter(function (item) {

                    return item !== command;

                });

            button.innerText = "☆";

        } else {

            favorites.push(command);

            button.innerText = "★";

        }


        // SALVAR

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );


        // ATUALIZAR

        updateDashboard();

        filterCommands();

    });

});


// =========================
// MODO ESCURO
// =========================

const themeToggle =
    document.querySelector("#themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerText = "☀️";

}


// ALTERNAR TEMA

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeToggle.innerText = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.innerText = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// =========================
// INICIALIZAÇÃO
// =========================

updateDashboard();

filterCommands();