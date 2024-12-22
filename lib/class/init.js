"use strict"; 
var fetch = require("node-fetch");
var FormData = require("form-data");
var crypto = require("crypto");

var acr = /** @class */ (function () { 
    function acr(config) {      
        this.endpoint = "/v1/identify";  // Point d'accès pour l'API
        this.signature_version = "1";    // Version de la signature
        var host = config.host, access_key = config.access_key, access_secret = config.access_secret, data_type = config.data_type, audio_format = config.audio_format, sample_rate = config.sample_rate, audio_channels = config.audio_channels;
        
        // Initialisation des paramètres de configuration
        this.host = host || "identify-us-west-2.acrcloud.com";  // Hôte par défaut si non spécifié
        this.access_key = access_key;  // Clé d'accès à l'API
        this.access_secret = access_secret;  // Clé secrète pour l'API
        this.data_type = data_type || "audio";  // Type de donnée, ici "audio" par défaut
        // Paramètres optionnels
        this.audio_format = audio_format || "";  // Format audio, vide par défaut
        this.sample_rate = sample_rate || "";  // Fréquence d'échantillonnage, vide par défaut
        this.audio_channels = audio_channels || 2;  // Nombre de canaux audio, 2 par défaut
    } 

    // Construit une chaîne de signature pour effectuer les requêtes API
    acr.prototype.buildStringToSign = function (method, uri, accessKey, dataType, signatureVersion, timestamp) {
        return [method, uri, accessKey, dataType, signatureVersion, timestamp].join("\n");
    };

    // Signe une chaîne de signature
    acr.prototype.sign = function (string, access_secret) {
        return crypto
            .createHmac("sha1", access_secret)  // Utilisation de l'algorithme HMAC SHA1
            .update(Buffer.from(string, "utf-8"))  // Mise à jour avec la chaîne encodée en UTF-8
            .digest()  // Génération du hachage
            .toString("base64");  // Conversion en Base64
    };

    // Génère des données de formulaire à partir d'un objet
    acr.prototype.generateFormData = function (object) {
        var form = new FormData();
        Object.keys(object).forEach(function (key) {
            form.append(key, object[key]);  // Ajout des clés et valeurs au formulaire
        });
        return form; 
    };

    /**
     * Identifie une piste audio à partir d'un fichier audio ou d'un buffer
     * @param {Buffer} audio_sample Un chemin vers un fichier audio ou un buffer contenant un échantillon audio à identifier
     * @returns {Promise<ACRCloudResponse>} réponse JSON de ACRCloud https://www.acrcloud.com/docs/acrcloud/metadata/music/
     */
    acr.prototype.identify = function (audio_sample) {
        var current_date = new Date();
        var timestamp = current_date.getTime() / 1000;  // Obtenir le timestamp actuel en secondes
        var stringToSign = this.buildStringToSign("POST", this.endpoint, this.access_key, this.data_type, this.signature_version, timestamp);
        var signature = this.sign(stringToSign, this.access_secret);  // Signature de la requête
        var formData = {
            sample: audio_sample,  // L'échantillon audio à analyser
            access_key: this.access_key,  // Clé d'accès à l'API
            data_type: this.data_type,  // Type de donnée
            signature_version: this.signature_version,  // Version de la signature
            signature: signature,  // Signature de la requête
            sample_bytes: audio_sample.length,  // Taille de l'échantillon audio
            timestamp: timestamp  // Timestamp actuel
        };

        // Envoi de la requête POST à ACRCloud
        return fetch("https://" + this.host + "/" + this.endpoint, {
            method: "POST",  // Méthode POST
            body: this.generateFormData(formData)  // Corps de la requête contenant les données
        }).then(function (response) { return response.json(); });  // Retourne la réponse JSON
    };

    return acr;
}());

module.exports = acr;
      
