# Assignment App

Le projet d'application de gestion d'assignments pour le cours de Web M1 Informatique. C'est une app Angular avec un backend Node.js/Express et MongoDB.

Yassin Es Saim - Malik Moussa

## Fonctionnalités

### Gestion des assignments
- Créer, voir, modifier et supprimer des assignments
- Interface avec un stepper Material Design pour la création
- Voir les détails complets de chaque assignment
- Suivre qui a rendu ou pas

### Système de matières
Implémenté avec 6 matières fixes avec leurs profs associés

### Comment ça marche
1. **Le prof** crée l'assignment (nom, date limite, matière)
2. **L'étudiant** clique simplement sur "Marquer comme rendu" - son nom d'utilisateur et un avatar généré automatiquement sont ajoutés
3. **Le prof** peut noter et ajouter des commentaires seulement si le devoir a été rendu

### Authentification
- Système de login avec rôles admin/user
- **Note importante :** Pour créer un compte administrateur, il faut utiliser l'API directement (via Postman ou curl) car seule l'inscription d'un user (élève) est disponible dans l'interface
- Protection des routes selon les permissions
- Les admins peuvent tout faire, les users peuvent juste consulter et rendre

### Interface
- Design Material moderne
- Navigation avec sidebar (si admin : peut peupler la base de données)
- Badges colorés pour les statuts
- Images circulaires pour les photos
- Images des matières
- Notifications avec snackbar
- Responsive design

## Technologies utilisées

**Frontend :**
- Angular 18
- Angular Material
- TypeScript
- RxJS

**Backend :**
- Node.js & Express
- MongoDB avec Mongoose
- API hébergée sur Render ([voir le README du backend](https://github.com/yisola2/assignment_api.git))

**Services externes :**
- Unsplash pour les images des matières et professeurs
- Générateur d'avatars automatique pour les étudiants
- Mockaroo pour la génération de données de test

## Installation

```bash
git clone <https://github.com/yisola2/TP_WEB.git>
cd webCoursAngular/CoursWEBAngular
npm install
ng serve
```

L'app sera dispo sur `http://localhost:4200`

**Application déployée :** `https://assignment-front-oone.onrender.com/home`

## Comptes de test

On a créé deux comptes pour tester :

**Admin :**
- Login : `admin1` 
- Password : `azerty`
- Peut tout faire (création, modification, suppression, notation)

**User normal :**
- Login : `user`
- Password : `azerty` 
- Peut juste voir et rendre les assignments

## Structure du code

```
src/app/
├── assignments/
│   ├── add-assignment/          # Création avec stepper
│   ├── assignment-detail/       # Page de détail
│   ├── edit-assignment/         # Modification
│   ├── assignments.component.*  # Liste principale
│   └── assignment.model.ts      # Le modèle TypeScript
├── login/                       # Page de connexion
├── register/                    # Page d'inscription  
├── shared/                      # Tous nos services et utilitaires
│   ├── assignments.service.ts   # CRUD des assignments
│   ├── auth.service.ts          # Gestion de l'auth
│   ├── matiere.service.ts       # Les matières fixes
│   ├── snackbar.service.ts      # Notifications (success, error, etc.)
│   ├── logging.service.ts       # Pour les logs
│   ├── auth.guard.ts            # Protection des routes
│   ├── admin.guard.ts           # Routes admin uniquement
│   ├── auth.interceptor.ts      # Intercepteur HTTP
│   └── *.directive.ts           # Directives pour le style
└── app.*                        # Composant principal et config
```

## API Backend

### Assignments
- `GET /api/assignments` → Tous les assignments
- `GET /api/assignments?page=1&limit=10` → Avec pagination
- `POST /api/assignments` → Créer un assignment
- `GET /api/assignments/:id` → Un assignment spécifique
- `PUT /api/assignments/:id` → Modifier
- `DELETE /api/assignments/:id` → Supprimer
- `POST /api/populate` → Remplir avec des données de test

### Auth
- `POST /api/auth/login` → Se connecter
- `POST /api/auth/register` → S'inscrire (user normal uniquement)

## Le modèle Assignment

Voici le modèle utilisé dans l'application :

```typescript
export class Assignment {
    _id?: string;                    // ID MongoDB
    id!: number;                     // ID numérique
    name!: string;                   // Nom de l'assignment
    postedOn?: Date | string;        // Date de publication
    dueDate?: Date;                  // Date limite
    submitted!: boolean;             // Rendu ou pas

    // Propriétés liées à la soumission
    auteur!: { 
        nom: string, 
        photo?: string 
    };
    
    // Propriétés de la matière
    matiere!: { 
        nom: string, 
        image?: string, 
        prof?: { 
            nom: string, 
            photo?: string 
        } 
    };
    
    // Notation (si rendu)
    note!: number;                   // Note sur 20
    remarques?: string;              // Commentaires du prof
}
```

## Features de l'interface

### Visuellement
- Tableau Material avec tri et pagination
- Badges colorés selon les statuts
- Photos circulaires pour les étudiants et profs
- Images des matières
- Stepper en 2 étapes pour créer un assignment
- Sidebar de navigation avec option "Populate DB" pour les admins
- Notifications snackbar (4 types : success, error, warning, info)

### Sécurité
- Routes protégées selon le rôle
- Boutons cachés si pas les droits
- Messages d'erreur via les snackbars
- Intercepteur pour l'auth HTTP

## Quelques trucs à savoir (même si déjà écrit plus haut ou bien dans le README du backend)

- Les images des profs/matières sont des URLs fixes dans le service (Unsplash)
- Les avatars d'étudiants sont générés automatiquement lors de la soumission
- La pagination fonctionne côté serveur
- Le backend est déployé sur Render (voir son README pour plus de détails)
- Pour créer un admin : utiliser Postman/curl sur l'endpoint register avec `role: "admin"`
- Les assignments ne peuvent être notés que s'ils ont été rendus (submitted = true)
- La base MongoDB est gérée par le backend avec une structure automatique via Mongoose
- Les données de test sont générées via Mockaroo

---



