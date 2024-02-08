import { caracteres_ascii } from "../caracters_ascii.js";

console.log(caracteres_ascii);

let roues = [];

function setRoues(passSome) {
    // in: array of pass values
    // set the roues
    console.log('setRoues : ', passSome);
    roues = passSome;
}

function incrementRoues() {
    // increment des roues
    roues[0] = roues[0] + 1;
    if (roues[0] >= caracteres_ascii.length) {
        for (let i = 0; i < roues.length - 1; i++) {
            // const element = roues[i];
            if (roues[i] >= caracteres_ascii.length) {
                roues[i] = 0;
                roues[i+1] = roues[i+1] + 1;
            }
        }
    };
}

let objCompteur = {
    _compteur: 0, // init
    set compteur(nouvelleValeur) {
        this._compteur = nouvelleValeur;
        this.trigger();
    },
    get compteur() {
        return this._compteur;
    },
    trigger() {}
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
        console.log('passSomme before', passSomme);
        result = result + encodeDecodeCaractere(
            element,
            (passSommeElement + decalageIncremental + roues[(i + roues.length) % roues.length] - 1 + caracteres_ascii.length) % caracteres_ascii.length,
            sens
        );
        console.log('passSomme after', passSomme);
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
    incrementRoues();
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
    setRoues(passSome);
    return passSome;
}

function clearGlobal() {
    objCompteur.compteur = 0;
    roues = [];
}