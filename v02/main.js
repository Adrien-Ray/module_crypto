import { caracteres_ascii } from "../caracters_ascii.js";

export function crypto_v02(stringClear, stringCrypt, pass) {
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