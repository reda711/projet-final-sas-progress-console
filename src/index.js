const apprenants = require("./data");
const prompt = require("prompt-sync")();
const {
  validerResultat,
} = require("./progression");
function ligne() {
    console.log("=".repeat(72));
}



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
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            break;
        case "7":
            break;
        case "8":
            break;
        case "9":
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


