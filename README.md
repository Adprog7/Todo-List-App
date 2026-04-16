# 📝 Todo List App - Full Stack Project

Ce projet est une application de gestion de tâches (Todo List) complète, développée dans le cadre du TP final. Elle repose sur une architecture découplée (Client/Serveur) et est entièrement déployée en ligne.

## 🚀 Liens du projet
- **Frontend (Vercel) :** [https://todo-list-app-phi-three.vercel.app/](https://todo-list-app-phi-three.vercel.app/)
- **API Backend (Render) :** [https://todo-list-app-0p2s.onrender.com](https://todo-list-app-0p2s.onrender.com)

## 🛠️ Stack Technique
- **Frontend :** HTML5, CSS3 (Modern UI), JavaScript Vanilla (Fetch API).
- **Backend :** Node.js, Express.
- **Base de données :** SQLite via la bibliothèque `better-sqlite3`.
- **Hébergement :** PaaS (Platform as a Service) avec Vercel pour le client et Render pour l'API.

## 🏗️ Architecture & Choix Techniques
L'application a été conçue pour répondre aux critères de la grille d'évaluation :
- **Découplage :** Le frontend et le backend sont séparés, permettant une maintenance indépendante.
- **Base de données :** Utilisation de SQLite pour une persistence de données légère, sans besoin d'un serveur DB tiers complexe.
- **Compatibilité Cloud :** Passage de `sqlite3` à `better-sqlite3` pour assurer la compilation native sur les environnements Linux de Render (gestion des bibliothèques GLIBC).

## 🔒 Sécurité & Bonnes Pratiques
- **HTTPS :** Toutes les communications sont sécurisées via SSL (certificats automatiques Render/Vercel).
- **CORS :** Configuration stricte du partage de ressources entre domaines.
- **Variables d'environnement :** Utilisation de `proce ss.env.PORT` pour une configuration dynamique du serveur.
- **Gestion des secrets :** Aucune clé sensible ou identifiant n'est stocké en dur dans le code source (`.gitignore` configuré).

## 📦 Installation en local
1. Cloner le projet : `git clone https://github.com/Adprog7/Todo-List-App`
2. Installer les dépendances backend : `cd backend && npm install`
3. Lancer le serveur : `node index.js`
4. Ouvrir `frontend/index.html` dans un navigateur.

---
*Projet réalisé en solo suite à des contraintes techniques d'équipe, afin d'assurer un rendu fonctionnel et déployé dans les délais impartis.*