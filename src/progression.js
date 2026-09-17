const apprenants = require("./data");


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
        return false
    }
    if (!Number.isInteger(resultat.totalExercices) || resultat.totalExercices <= 0) {
        return false
    }
    if (!Number.isInteger(resultat.exercicesTermines) || resultat.exercicesTermines < 0) {
        return false
    }
    if (resultat.exercicesTermines > resultat.totalExercices) {
        return false
    }
    if (typeof resultat.challengeTermine !== "boolean"){
        return false
    }

    return true
}
module.exports = { validerResultat };