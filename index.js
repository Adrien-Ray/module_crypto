// import { caracteres_ascii } from "./caracters_ascii.js";
import { crypto_v00 } from "./v00/main.js";
import { crypto_v01 } from "./v01/main.js";
import { crypto_v02 } from "./v02/main.js";
import { crypto_v03 } from "./v03/main.js";

function crypto (stringClear, stringCrypt, pass, version) {
    if ( typeof stringClear === "string" && typeof stringCrypt === "string" && (stringClear === "" || stringCrypt === "") && (stringClear !== "" || stringCrypt !== "") && pass && typeof pass === "string" && version && typeof version === "string") {
        if (version === "v03") {
            return crypto_v03(stringClear, stringCrypt, pass);
        } else if (version === "v02") {
            return crypto_v02(stringClear, stringCrypt, pass);
        } else if (version === "v01") {
            return crypto_v01(stringClear, stringCrypt, pass);
        } else if (version === "v00") {
            return crypto_v00(stringClear, stringCrypt, pass);
        }
        else {
            return "error version "+version+" not found";
        }
    } else {
        return 'args input error';
    }
};

export { crypto };