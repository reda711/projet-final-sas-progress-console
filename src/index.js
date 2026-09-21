const apprenants = require("./data");
const prompt = require("prompt-sync")();
const {
  validerResultat,
  normaliserNom,
  ajouterApprenant,
  enregistrerResultat,
  findbyid,
  tableaudebord,
  calculerProgression,
  calculerMoyenne,
  calculerMoyenneclass,
  listedesapprenants,
  findbyname,
  filtrerParNiveau,
  trierParProgression,
  trierParNom,
  ligne,
} = require("./progression");




function menu() {
    ligne();
    console.log("SAS PROGRESS CONSOLE");
    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier le résultat d'une journée");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants par progression décroissante");
    console.log("9. Trier les apprenants par ordre alphabétique");
    console.log("0. Quitter");
    ligne();

    let choix = prompt("entre votre choix : ")
                ligne()
    ;

    switch (choix) {
        case "1":
            tableaudebord();
            trierParProgression()
            listedesapprenants()
            break;
        case "2":
            listedesapprenants()
            break;
        case "3":
            ajouterApprenant();
            break;
        case "4":
            findbyid(apprenants);
            break;
        case "5":
            enregistrerResultat();
            break;
        case "6":
            findbyname(apprenants);
            break;
        case "7":
            filtrerParNiveau(apprenants)
            break;
        case "8":
            trierParProgression()
            listedesapprenants()
            break;
        case "9":
            trierParNom()
            listedesapprenants()
            break;
        case "0":
            console.log("See you later !");
            break;
        default:
            console.log("Choix invalide. Veuillez sélectionner une option du menu.");
    }

    return choix;
}

let choix;

do {
    choix = menu();
} while (choix !== "0");


