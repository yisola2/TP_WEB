export class Assignment{
    _id?: string;
    id!: number;
    name!: string;
    postedOn?: Date;
    dueDate?: Date;
    submitted!: boolean;

    // Nouvelles propriétés (adaptées à la structure backend)
    auteur!: { nom: string, photo?: string };
    matiere!: { nom: string, image?: string, prof?: { nom: string, photo?: string } };
    note!: number;
    remarques?: string;
}