# module_crypto

# **ATTENTION ! CECI EST UN PROJET À CARACTÈRE ÉDUCATIF. LES DIFFÉRENTS CHIFFREMENTS PERMIS PAR CE CONTENU NE DOIVENT EN AUCUN CAS ÊTRE CONSIDÉRÉ COMME FIABLE DANS LA VRAIE VIE !**

# **CAUTION! THIS IS AN EDUCATIONAL PROJECT. THE VARIOUS FIGURES PROVIDED IN THIS CONTENT SHOULD IN NO WAY BE CONSIDERED RELIABLE IN REAL LIFE!**

```JS
// overview :
crypto("chaîne à chiffrer", "chaîne à déchiffrer", "password", "version");

// la v00 est un chiffre de César (extrêmement simple)
// la v01 est un chiffre de César dont le décalage change d'un caractère à l'autre, selon une période égale à la longueur du mot de passe

// exemple encode :
crypto("abcÿabc","","azertyqwertyazertyqwertyazertyqwerty","v00");
// return : "ÒÓÔŠÒÓÔ"

// exemple decode :
crypto("","ÒÓÔŠÒÓÔ","azertyqwertyazertyqwertyazertyqwerty","v00");
// return : "abcÿabc"
 ```       
    