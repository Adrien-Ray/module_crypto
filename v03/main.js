import { caracteres_ascii } from "../caracters_ascii.js";

let objCompteur = {
    _compteur: 0, // init
    set compteur(nouvelleValeur) {
        this._compteur = nouvelleValeur;
        this.trigger();
    },
    get compteur() {
        return this._compteur;
    },
    trigger() {
        console.log('La variable a changé de valeur : ', this._compteur);
    }
};

// ex déclenchement
// objCompteur.compteur++;

export function crypto_v03(stringClear, stringCrypt, pass) {
    const stringInArray = (stringClear) ? stringToArray(stringClear) : stringToArray(stringCrypt);
    const passArray = stringToArray(pass);
    let result = "";
    const passSomme = sommeOfPass(passArray);
    let decalageIncremental = 0;
    for (let i = 0; i < stringInArray.length; i++) {
        decalageIncremental++;
        const element = stringInArray[i];
        const passSommeElement = passSomme[(i + passSomme.length) % passSomme.length];
        let sens = "";
        if (stringClear) { sens = "chiffre"; } else if (stringCrypt) { sens = "dechiffre"; }
        result = result + encodeDecodeCaractere(element, (passSommeElement + decalageIncremental + caracteres_ascii.length) % caracteres_ascii.length, sens);
    }
    clearGlobal();
    return result;
}

function stringToArray(string) {
    return string.split('');
}

function encodeDecodeCaractere(stringElement, passSomme, sens) {
    // in : caractere a encoder, somme pass, sens ("chiffre" || "dechiffre")
    let result = caracteres_ascii.findIndex(function(element) {
        return element.char === stringElement;
    });
    let switchSens = (sens === "chiffre") ? result + passSomme : result - passSomme;
    result = ((switchSens) + caracteres_ascii.length) % caracteres_ascii.length;
    objCompteur.compteur++;
    return caracteres_ascii[result].char;
}

function sommeOfPass(passArray) {
    // in : pass array of caracters, out : array of number
    let passSome = [];
    for (const elementPassArray of passArray) {
        let passSomeOne = caracteres_ascii.findIndex(function(element) {
            return element.char === elementPassArray;
        });
        passSome.push(passSomeOne + caracteres_ascii.length % caracteres_ascii.length);
    };
    return passSome;
}

function clearGlobal() {
    objCompteur.compteur = 0;
}