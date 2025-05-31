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
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      nom: 'Base de Données',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      prof: {
        nom: 'Marie Dubois',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      nom: 'Programmation Angular',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      prof: {
        nom: 'Jean Martin',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      nom: 'Algorithmes',
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      prof: {
        nom: 'Sophie Laurent',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      nom: 'Sécurité Informatique',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      prof: {
        nom: 'Pierre Durand',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      nom: 'Intelligence Artificielle',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      prof: {
        nom: 'Catherine Bernard',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
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