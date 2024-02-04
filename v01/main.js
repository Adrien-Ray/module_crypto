import { caracteres_ascii } from "../caracters_ascii.js";

// [X] ici on va transformer la function sommeOfPass pour qu'elle retourne un tableau de sommes de pass

// ensuite dans encodeCaractere et decodeCaractere on va double-boucler pour "sommer" le tableau a chiffrer / déchiffrer dans un incrément qui boucle conjointement / dans le tableau des sommes de pass

export function crypto_v01(stringClear, stringCrypt, pass) {
    if (stringClear) {
        const stringInArray = stringToArray(stringClear);
        const passArray = stringToArray(pass);
        let result = "";
        const passSomme = sommeOfPass(passArray);
        for (let i = 0; i < stringInArray.length; i++) {
            const element = stringInArray[i];
            const passSommeElement = passSomme[(i + passSomme.length) % passSomme.length];
            result = result + encodeCaractere(element, passSommeElement);      
        }
        return result;
    } if (stringCrypt) {
        const stringInArray = stringToArray(stringCrypt);
        const passArray = stringToArray(pass);
        let result = "";
        const passSomme = sommeOfPass(passArray);
        for (let i = 0; i < stringInArray.length; i++) {
            const element = stringInArray[i];
            const passSommeElement = passSomme[(i + passSomme.length) % passSomme.length];
            result = result + decodeCaractere(element, passSommeElement);      
        }
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
    let passSome = [];
    for (const elementPassArray of passArray) {
        let passSomeOne = caracteres_ascii.findIndex(function(element) {
            return element.char === elementPassArray;
        });
        // console.log('in sommeOfPass for', passSomeOne);
        passSome.push(passSomeOne + caracteres_ascii.length % caracteres_ascii.length);
    };
    // console.log('in sommeOfPass result', passSome);
    console.log('sommeOfPass return : ', passSome);
    return passSome;
}