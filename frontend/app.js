const API = "https://todo-list-app-0p2s.onrender.com";

const pages = {
    home: `
        <div class="page-header">
            <h1>Bienvenue sur MDS Cloud</h1>
            <p>Votre outil de gestion de tâches haute performance.</p>
        </div>
        <div class="card">
            <h3>Résumé de l'activité</h3>
            <p>Accédez à votre liste pour commencer à organiser votre journée.</p>
            <button class="btn" onclick="navigateTo('todo')">Voir mes tâches</button>
        </div>
    `,
    todo: `
        <div class="page-header">
            <h1>Ma Liste de Tâches</h1>
        </div>
        <div class="card">
            <div class="input-group">
                <input id="taskInput" placeholder="Ex: Déployer l'API..." />
                <button class="btn" onclick="addTask()">Ajouter</button>
            </div>
            <ul id="list"></ul>
        </div>
    `,
    stats: `
        <div class="page-header">
            <h1>Statistiques</h1>
        </div>
        <div class="card">
            <p id="statCount">Chargement des données...</p>
            <div class="progress-bar"><div class="progress" style="width: 70%"></div></div>
        </div>
    `,
    infra: `
        <div class="page-header">
            <h1>Infrastructure & Sécurité</h1>
        </div>
        <div class="card">
            <ul>
                <li><strong>Backend :</strong> Render (Node.js)</li>
                <li><strong>Frontend :</strong> Vercel (PaaS)</li>
                <li><strong>Sécurité :</strong> HTTPS SSL activé</li>
                <li><strong>Status :</strong> <span class="badge-online">En ligne</span></li>
            </ul>
        </div>
    `
};

// Éléments du DOM pour le menu burger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');

// UNE SEULE fonction navigateTo pour tout gérer
async function navigateTo(pageId) {
    const content = document.getElementById('content');
    
    // On injecte le contenu de la page
    if (pages[pageId]) {
        content.innerHTML = pages[pageId];
    }

    // On ferme le menu burger s'il est ouvert (Mobile)
    if (nav && burger) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    }

    // On lance les chargements spécifiques
    if (pageId === 'todo') loadTasks();
    if (pageId === 'stats') updateStats();
}

// Logique de l'API
async function loadTasks() {
    try {
        const res = await fetch(API + "/tasks");
        const tasks = await res.json();
        const list = document.getElementById("list");
        if (!list) return;
        list.innerHTML = tasks.map(t => `
            <li class="task-item">
                <span>${t.title}</span>
                <button class="btn-delete" onclick="deleteTask(${t.id})">Supprimer</button>
            </li>
        `).join('');
    } catch (err) {
        console.error("Erreur chargement tâches:", err);
    }
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();
    if (!title) return;
    
    try {
        await fetch(API + "/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        input.value = "";
        loadTasks();
    } catch (err) {
        console.error("Erreur ajout tâche:", err);
    }
}

async function deleteTask(id) {
    try {
        await fetch(API + "/tasks/" + id, { method: "DELETE" });
        loadTasks();
    } catch (err) {
        console.error("Erreur suppression tâche:", err);
    }
}

async function updateStats() {
    try {
        const res = await fetch(API + "/tasks");
        const tasks = await res.json();
        const statElem = document.getElementById('statCount');
        if (statElem) {
            statElem.innerText = `Vous avez actuellement ${tasks.length} tâches en attente.`;
        }
    } catch (err) {
        console.error("Erreur stats:", err);
    }
}

// Listener pour le bouton burger
if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Initialisation au chargement
navigateTo('home');