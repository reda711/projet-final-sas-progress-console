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

    while (!nomComplet || !/^[a-zA-ZÀ-ÿ\s]+$/.test(nomComplet.trim())) {
        console.log("Please enter a valid name");
        nomComplet = prompt("Please enter your full name : ");
    }

    let ville = prompt("Please enter your city: ");

    while (!ville || !/^[a-zA-ZÀ-ÿ\s]+$/.test(ville.trim())){
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
    if (id <= 0 || !Number.isInteger(id)) {
        console.log("ID invalid");
        return
    }
    let found = apprenants.find(apprenant => apprenant.id === id)
    let progress = calculerProgression(found)
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
ID : ${found.id} | ${found.nomComplet} | ${found.ville} | ${progress} % Progression | ${level}`);
}
function ligne() {
    console.log("=".repeat(72));
}
function findbyname(apprenants) {
    let name = String(prompt("enter the name you looking for : "))
    let found = apprenants.filter(apprenant => apprenant.nomComplet.toLowerCase().includes(name.toLowerCase()))
    for (let i = 0; i < found.length; i++) {
        let progress = calculerProgression(found[i])
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
ID : ${found[i].id} | ${found[i].nomComplet} | ${found[i].ville} | ${calculerProgression(found[i])} % Progression | ${level}`);
    }
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
function calculerMoyenne() {
    let total = []
    for (let i = 0; i < apprenants.length; i++) {
        total.push(calculerProgression(apprenants[i]))
    }
    return total
}
function calculerMoyenneclass() {
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
function tableaudebord() {
    let numoflearners = apprenants.length
    let moyenne = calculerMoyenneclass(apprenants);
    let profiles = apprenants.map(apprenant => apprenant.nomComplet)
    let moyennes = calculerMoyenne()
    let solide = 0
    let enprogression = 0
    let arenforcer = 0
    for (let i = 0; i < moyennes.length; i++) {
        if (moyennes[i] >= 80) {
            solide++
        }
        else if (moyennes[i] >= 50 && moyennes[i] <= 79) {
            enprogression++
        }
        else {
            arenforcer++
        }
    }



    console.log(
        `Nombre total d'apprenants : ${numoflearners}
Progression moyenne du groupe : ${moyenne} %
Solide : ${solide}
En progression : ${enprogression}
A renforcer : ${arenforcer}
`);
    ligne();
    console.log(
        `les apprenants par progression décroissante : 
`
    );
}
function listedesapprenants() {
    let liste = []
    let numoflearners = apprenants.length
    let ids = apprenants.map(apprenant => apprenant.id)
    let names = apprenants.map(apprenant => apprenant.nomComplet)
    let cities = apprenants.map(apprenant => apprenant.ville)
    let moyenne = calculerMoyenne()
    let niveau;

    for (let i = 0; i < apprenants.length; i++) {
        if (moyenne[i] >= 80) {
            niveau = "solide"
        }
        else if (moyenne[i] >= 50 && moyenne[i] < 80) {
            niveau = "en progression"
        }
        else {
            niveau = "a renforcer"
        }


        liste[i] = `${i + 1}. | ID:${ids[i]} | ${names[i]} | ${cities[i]} | ${moyenne[i].toFixed(2)} % | ${niveau}
`

    }
    liste = liste.join("")
    console.log(liste)
}
function validerResultat() {
    let id = Number(prompt("which learner you want to log : "))
    if (apprenants.findIndex(apprenant => apprenant.id === id) === -1) {
        console.log("this id doesn't exist ");
        id = Number(prompt("which learner you want to log : "))
    }
    let jour = Number(prompt("Enter the day you want to log : "))
    while (!Number.isInteger(jour) || jour < 1 || jour > 7) {
        console.log("this day is not available");
        jour = Number(prompt("Enter the day you want to log : "))
    }
    let totalExercices = 20
    let exercicesTermines = Number(prompt("Enter how many exercices have you completed : "))
    while (!Number.isInteger(exercicesTermines) || exercicesTermines < 0 || exercicesTermines > totalExercices) {
        console.log(`choose a number between 1 and 20`);
        exercicesTermines = Number(prompt("Enter how many exercices have you completed : "))
            ;
    }
    let challengeTermine = String(prompt("Have you completed the challenge (yes/no): "))
    while (challengeTermine !== "no" && challengeTermine !== "yes") {
        console.log("input invalid");
        challengeTermine = String(prompt("Have you completed the challenge (yes/no): ") )

    }
    if (challengeTermine === "yes") {
        challengeTermine = true
    }
    else if (challengeTermine === "no") {
        challengeTermine = false
    }

    return [id, jour, exercicesTermines, totalExercices, challengeTermine]
}
function enregistrerResultat() {
    let [id, jour, exercicesTermines, totalExercices, challengeTermine] = validerResultat()
    let index = apprenants.findIndex(apprenant => apprenant.id === id)
    let resultat = {
        jour: jour, exercicesTermines: exercicesTermines,
        totalExercices: totalExercices, challengeTermine: challengeTermine
    }

    let resultatindex = apprenants[index].resultats.findIndex(resultat => resultat.jour === jour)
    if (resultatindex === -1) {
        apprenants[index].resultats.push(resultat)
    }
    else {
        apprenants[index].resultats[resultatindex] = resultat
    }
}
function filtrerParNiveau(apprenants) {
    console.log("1. Solide");
    console.log("2. En progression");
    console.log("3. À renforcer");
    let choice = Number(prompt(`your choice : `))

    let solide = []
    let enProgress = []
    let aRenforcer = []


    for (let i = 0; i < apprenants.length; i++) {
        calculerProgression(apprenants[i])
        if (calculerProgression(apprenants[i]) >= 80) {
            solide.push(apprenants[i].nomComplet)
        }
        else if (calculerProgression(apprenants[i]) >= 50 && calculerProgression(apprenants[i]) < 80) {
            enProgress.push(apprenants[i].nomComplet)
        } else if (calculerProgression(apprenants[i]) < 50) {
            aRenforcer.push(apprenants[i].nomComplet)
        }
    }
    if (choice === 1) {
        if (solide.length === 0) {
            console.log("there is no learners");
        }
        else {
            console.log(solide);
        }
    }
    else if (choice === 2) {
        if (enProgress.length === 0) {
            console.log("there is no learners");
        }
        else {
            console.log(enProgress);
        }
    }
    else if (choice === 3) {
        if (aRenforcer.length === 0) {
            console.log("there is no learners");
        }
        else { console.log(aRenforcer); }

    }
    else {
        console.log("invalide choice");

    }

}
function trierParProgression() {
    apprenants.sort((a, b) => calculerProgression(b) - calculerProgression(a))
}
function trierParNom() {
    apprenants.sort((a, b) => {
        return a.nomComplet.localeCompare(b.nomComplet)
    })
}
module.exports = {
    ajouterApprenant,
    validerResultat,
    findbyid,
    calculerProgression,
    calculerMoyenne,
    tableaudebord,
    listedesapprenants,
    findbyname,
    filtrerParNiveau,
    trierParProgression,
    trierParNom,
    enregistrerResultat,
    ligne
};




