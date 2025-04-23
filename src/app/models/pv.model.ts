import type { Citoyen, Policier } from "./utilisateur.model"

export class Pv {
  id = 0
  libelle = ""
  source = ""
  dateCreation: Date = new Date()
  policier?: Policier
  citoyen?: Citoyen
}
