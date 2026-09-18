const apprenants = require("./data");
const prompt = require("prompt-sync")();

function normaliserNom(nom) {
    nom = nom.replace(/[^a-zA-Z\s]/g, "").trim().replace(/\s+/g, " ").toLowerCase().split(" ");
    for (let i = 0; i < nom.length; i++) {
    nom[i] = nom[i].charAt(0).toUpperCase() + nom[i].slice(1)
          }
    nom = nom.join(" ")
    return nom
        }

function validerResultat(resultat) {

    if (!Number.isInteger(resultat.jour) || resultat.jour < 1 || resultat.jour > 7) {
        console.log("Please enter a valid day ");
        return false
    }

    if (!Number.isInteger(resultat.exercicesTermines) || resultat.exercicesTermines < 0 || resultat.exercicesTermines > resultat.totalExercices) {
        console.log("Invalide , Please enter the number of exercices completed ");
        return false
    }
    if (typeof resultat.challengeTermine !== "boolean"){
        console.log("your answer is not a boolean");
        return false
    }

    return true
}
module.exports = { validerResultat };

function ajouterApprenant() {
    let id = Number(prompt("Please enter your id : "));
    while (!Number.isInteger(id) || id <= 0 ) {
        console.log("Please enter a valid ID");
        id = Number(prompt("Please enter your id : "));
    }
    let alreadyexist = apprenants.some(apprenant => apprenant.id === id)  
    while(alreadyexist){
        console.log(`this id already exist`);
        id = Number(prompt("Please enter your id : "));
        alreadyexist = apprenants.some(apprenant => apprenant.id === id);
    }

    let nomComplet = prompt("Please enter your full name : ");

    while (!nomComplet || nomComplet.trim() === "") {
        console.log("Please enter a valid name");
        nomComplet = prompt("Please enter your full name : ");
    }

    let ville = prompt("Please enter your city: ");

    while (!ville || ville.trim() === "") {
        console.log("Please enter a valid city");
        ville = prompt("Please enter your city: ");
    }

    let apprenant = {
        id: id,
        nomComplet: normaliserNom(nomComplet),
        ville : ville.charAt(0).toUpperCase() + ville.slice(1),
        resultats: []
    };

    apprenants.push(apprenant);

    return `the new learner has been created`;
}



// function enregistrerResultat() {
    
//     let id = Number(prompt("Enter the learner ID : "))
//     let apprenant = apprenants.find(apprenant => apprenant.id === id);
//     while (!apprenant) {
//         id = Number(prompt("Enter a valid ID : "))
//         apprenant = apprenants.find(apprenant => apprenant.id === id);
//     }
//     let resultat = {
//     jour: jour,
//     totalExercices: 20,
//     exercicesTermines: 0,
//     challengeTermine: false
//     }

// let jour = Number(prompt("Enter the day: "));
// while (!validerResultat(resultat)) {
//     jour = Number(prompt("Please enter a valid day: "));
//     resultat.jour = jour;
// }
// let exercicesTermines = Number(prompt("Enter how many exercices have the learner completed : "))
// while (!validerResultat(resultat)) {
//     exercicesTermines = Number(prompt("Please enter a valid number: "));
//     resultat.exercicesTermines = exercicesTermines;
// }
// let challengeTermine = Boolean(prompt("Have you completed the challenge : "))
// while (!validerResultat(resultat)) {
//     challengeTermine = Number(prompt("Please enter a valid boolean: "));
//     resultat.challengeTermine = challengeTermine;
// }    
// }
// // ajouterApprenant()
// enregistrerResultat()
// // console.log(apprenants)
    

function findbyid(apprenants , ids) {
    let id = Number(prompt("enter the id of the learner you want to find : "))
    return apprenants.find(apprenant => apprenant.id === id)
}

