import { caracteres_ascii } from "../caracters_ascii.js";

export function crypto_v00(stringClear, stringCrypt, pass) {
    // console.info("scope in function v00");
    if (stringClear) {
        // console.info('to function chiffre');
        const stringInArray = stringToArray(stringClear);
        const passArray = stringToArray(pass);
        // console.log(stringInArray, passArray);
        let result = "";
        const passSomme = sommeOfPass(passArray);
        for (const element of stringInArray) {
            result = result + encodeCaractere(element, passSomme);
        };
        return result;
    } if (stringCrypt) {
        // console.info('to function déchiffre');
        const stringInArray = stringToArray(stringCrypt);
        const passArray = stringToArray(pass);
        // console.log(stringInArray, passArray);
        let result = "";
        const passSomme = sommeOfPass(passArray);
        for (const element of stringInArray) {
            result = result + decodeCaractere(element, passSomme);
        };
        return result;
    }
    return 'error wrong way round';
}

function stringToArray(string) {
    return string.split('');
}

function encodeCaractere(stringElement, passSomme) {
    // in : caractere a encoder, somme pass
        let result = caracteres_ascii.findIndex(function(element) {
            return element.char === stringElement;
        });
        result = result + passSomme;
    // console.log("result in encodeCaractere : ", result, caracteres_ascii[result].char);
    return caracteres_ascii[result % caracteres_ascii.length].char;
}

function decodeCaractere(stringElement, passSomme) {
    // in : caractere a decoder, somme pass
        let result = caracteres_ascii.findIndex(function(element) {
            return element.char === stringElement;
        });
    // console.log("result in encodeCaractere : ", result, caracteres_ascii[result].char);
    return caracteres_ascii[(result - passSomme + caracteres_ascii.length) % caracteres_ascii.length].char;
}

function sommeOfPass(passArray) {
    // in : pass array, out : number
    // console.log('in sommeOfPass', passArray);
    let passSome = 0;
    for (const elementPassArray of passArray) {
        let passSomeOne = caracteres_ascii.findIndex(function(element) {
            return element.char === elementPassArray;
        });
        // console.log('in sommeOfPass for', passSomeOne);
        passSome = passSome + passSomeOne;
    };
    // console.log('in sommeOfPass result', passSome);
    return passSome % caracteres_ascii.length;
    // return 1;
}