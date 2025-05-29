# Frontend : Étapes à suivre (Step by Step)

## 1. Générer les composants et services nécessaires
- `ng generate service services/auth`
- `ng generate component pages/login`
- `ng generate component pages/register`
- `ng generate guard guards/auth`
- `ng generate guard guards/admin`

## 2. Créer le service d'authentification
- Méthodes : `login`, `register`, `logout`, `isLoggedIn`, `isAdmin`, `getToken`, etc.
- Stocker le token JWT et le rôle dans le `localStorage` ou `sessionStorage`.

## 3. Créer les composants Login et Register
- Formulaires pour saisir username/password
- Appeler le service d'authentification
- Afficher les erreurs éventuelles
- Rediriger après succès

## 4. Mettre en place un intercepteur HTTP
- Générer : `ng generate interceptor interceptors/auth`
- Ajouter automatiquement le token JWT dans les headers `Authorization` pour chaque requête API

## 5. Protéger les routes Angular
- Utiliser le guard `auth` pour les routes nécessitant une connexion
- Utiliser le guard `admin` pour les routes réservées à l'admin (edit/delete)
- Exemple dans le router :
  ```ts
  { path: 'edit/:id', component: EditAssignmentComponent, canActivate: [AdminGuard] }
  ```

## 6. Adapter l'affichage selon le rôle
- Afficher/masquer les boutons "Edit" et "Delete" selon que l'utilisateur est admin ou non
- Afficher le nom de l'utilisateur connecté

## 7. Gérer la déconnexion
- Bouton "Logout" qui efface le token et redirige vers le login

## 8. Bonus UI/UX
- Ajouter des messages de succès/erreur (snackbar)
- Ajouter une Toolbar et une SideNav (Angular Material)
- Rendre l'UI agréable et responsive

## 9. Tester
- Tester tous les cas : utilisateur normal, admin, routes protégées, etc.

---

**Astuce :**
- Utilise les transparents 179 à 187 pour la gestion des accès par le routeur Angular.
- Regarde la vidéo du TP pour voir un exemple complet. 