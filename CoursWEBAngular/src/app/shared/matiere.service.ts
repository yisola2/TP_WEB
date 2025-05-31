import { Injectable } from '@angular/core';

export interface Matiere {
  nom: string;
  image: string;
  prof: {
    nom: string;
    photo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  // Liste fixe des matières disponibles
  private matieres: Matiere[] = [
    {
      nom: 'Technologies Web',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
      prof: {
        nom: 'Michel Buffa',
        photo: 'images/profs/michel-buffa.jpg'
      }
    },
    {
      nom: 'Base de Données',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      prof: {
        nom: 'Marie Dubois',
        photo: 'images/profs/marie-dubois.jpg'
      }
    },
    {
      nom: 'Programmation Angular',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      prof: {
        nom: 'Jean Martin',
        photo: 'images/profs/jean-martin.jpg'
      }
    },
    {
      nom: 'Algorithmes',
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      prof: {
        nom: 'Sophie Laurent',
        photo: 'images/profs/sophie-laurent.jpg'
      }
    },
    {
      nom: 'Sécurité Informatique',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      prof: {
        nom: 'Pierre Durand',
        photo: 'images/profs/pierre-durand.jpg'
      }
    },
    {
      nom: 'Intelligence Artificielle',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      prof: {
        nom: 'Catherine Bernard',
        photo: 'images/profs/catherine-bernard.jpg'
      }
    }
  ];

  constructor() { }

  // Récupérer toutes les matières
  getMatieres(): Matiere[] {
    return [...this.matieres]; // Retourne une copie pour éviter la mutation
  }

  // Récupérer une matière par son nom
  getMatiereByNom(nom: string): Matiere | undefined {
    return this.matieres.find(matiere => matiere.nom === nom);
  }

  // Récupérer les noms des matières (pour les dropdowns)
  getMatieresNames(): string[] {
    return this.matieres.map(matiere => matiere.nom);
  }

  // Récupérer une matière aléatoire (pour la génération de données)
  getRandomMatiere(): Matiere {
    const randomIndex = Math.floor(Math.random() * this.matieres.length);
    return this.matieres[randomIndex];
  }
} 