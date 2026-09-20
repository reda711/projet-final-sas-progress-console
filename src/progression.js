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
function ajouterApprenant() {
    let id = Number(prompt("Please enter your id : "));
    while (!Number.isInteger(id) || id <= 0) {
        console.log("Please enter a valid ID");
        id = Number(prompt("Please enter your id : "));
    }
    let alreadyexist = apprenants.some(apprenant => apprenant.id === id)
    while (alreadyexist) {
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
        ville: ville.charAt(0).toUpperCase() + ville.slice(1),
        resultats: []
    };

    apprenants.push(apprenant);

    console.log(
        `the new learner has been created`
    );
}
function findbyid(apprenants) {
    let id = Number(prompt("Enter the ID of the learner you want to find : "))
    if (!isNaN) {
        console.log("please enter a valide ID");
        return
    }
    let found = apprenants.find(apprenant => apprenant.id === id)
    let progress = calculerProgression(apprenants[id - 1])
    let level = ""
    if (progress >= 80) {
        level = "solide"
    }
    else if (progress >= 50 && progress < 80) {
        level = "en progression"
    }
    else if (progress < 50 && progress >= 0) {
        level = "a renforcer"
    }
    console.log(`Learner found  
ID : ${found.id} | ${found.nomComplet} | ${found.ville} | ${calculerProgression(apprenants[id - 1])} % Progression | ${level}`);
}
function calculerProgression(apprenant) {

    if (apprenant.resultats.length === 0) {
        return 0;
    }

    let totalExercices = 0;
    let exercicesTermines = 0;

    for (let i = 0; i < apprenant.resultats.length; i++) {
        let resultat = apprenant.resultats[i];
        totalExercices += resultat.totalExercices;
        exercicesTermines += resultat.exercicesTermines;
    }
    let progress = (exercicesTermines / totalExercices) * 100;
    return progress;
}
function calculerMoyenne(apprenant) {
    let total = []
    for (let i = 0; i < apprenants.length; i++) {
        total.push(calculerProgression(apprenants[i]))
    }
    return total
}
function calculerMoyenneclass(apprenant) {
    let grpavg = []
    let grpavg2 = 0
    for (let i = 0; i < apprenants.length; i++) {
        grpavg.push(calculerProgression(apprenants[i]))
        grpavg2 += grpavg[i]
    }
    grpavg = grpavg.join("")
    grpavg2 = grpavg2 / apprenants.length
    return grpavg2
}
function validerResultat(resultat) {
    while (!Number.isInteger(resultat.jour) || resultat.jour < 1 || resultat.jour > 7) {
        console.log("this day is not available");
        return false;
    }
    if (!Number.isInteger(resultat.exercicesTermines) || resultat.exercicesTermines < 0) {
        console.log(`Number is not valid`);
        return false;
        ;
    }
    if (!Number.isInteger(resultat.totalExercices) || resultat.totalExercices <= 0 || resultat.totalExercices > 20) {
        console.log(`Number is not valid`);;
        return false
    }
    if (resultat.exercicesTermines > resultat.totalExercices) {
        console.log(`ERROR "exercices completed more than available exercices"`);

        return false
    }
    return true;
}





module.exports = {
    ajouterApprenant,
    validerResultat,
    findbyid,
    calculerProgression,
    calculerMoyenne,
    calculerMoyenneclass
};