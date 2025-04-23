import type { Citoyen } from "./utilisateur.model"

export class Demande {
  id = 0
  typeDemande = ""
  etat = ""
  citoyen?: Citoyen
  dateCreation: Date = new Date()
}

export enum EtatDemande {
  EN_ATTENTE = "EN_ATTENTE",
  APPROUVEE = "APPROUVEE",
  REJETEE = "REJETEE",
}

export enum TypeDemande {
  EXTRAIT_NAISSANCE = "EXTRAIT_NAISSANCE",
  CERTIFICAT_RESIDENCE = "CERTIFICAT_RESIDENCE",
  CARTE_IDENTITE = "CARTE_IDENTITE",
  // Ajoutez d'autres types selon vos besoins
}
