export class Utilisateur {
  id = 0
  email = ""
  password = ""
}

export class Citoyen extends Utilisateur {
  nom = ""
  prenom = ""
  nina = "" // Numéro d'identification nationale
}

export class Maire extends Utilisateur {
  nom = ""
  prenom = ""
  mairie = ""
}

export class Procureur extends Utilisateur {
  nom = ""
  prenom = ""
  tribunal = ""
}

export class Policier extends Utilisateur {
  nom = ""
  prenom = ""
  arrondissement = ""
}

export class Admin extends Utilisateur {
  nom = ""
  prenom = ""
}

export enum UserRole {
  CITOYEN = "CITOYEN",
  MAIRE = "MAIRE",
  PROCUREUR = "PROCUREUR",
  POLICIER = "POLICIER",
  ADMIN = "ADMIN",
}
