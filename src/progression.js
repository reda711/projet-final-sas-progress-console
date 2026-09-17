const apprenants = require("./data");



function normaliserNom(nom) {
    nom = nom.replace(/[^a-zA-Z\s]/g, "").trim().replace(/\s+/g, " ").toLowerCase().split(" ");
    for (let i = 0; i < nom.length; i++) {
    nom[i] = nom[i].charAt(0).toUpperCase() + nom[i].slice(1)
          }
    nom = nom.join(" ")
    return nom
}