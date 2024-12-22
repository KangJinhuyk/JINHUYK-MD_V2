let options = {
  disables: {
    type: Array,
    default: []
  }
};

const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  events: {
    type: String,
    default: "true" // Activé pour gérer les événements
  },
  nsfw: {
    type: String,
    default: "true" // Permet de gérer le contenu NSFW
  },
  pdm: {
    type: String,
    default: "false" // Désactivé par défaut (Peut être activé si nécessaire)
  },
  antipromote: {
    type: String,
    default: "true" // Activé pour éviter la promotion non autorisée
  },
  antidemote: {
    type: String,
    default: "true" // Activé pour éviter la rétrogradation non autorisée
  },
  goodbye: {
    type: String,
    default: global.gdbye // Message de départ
  },
  welcome: {
    type: String,
    default: global.wlcm // Message de bienvenue
  },
  welcometext: {
    type: String,
    default: "*@user @pp bienvenu(e) dans @gname*" // Texte de bienvenue
  },
  goodbyetext: {
    type: String,
    default: "*@user @pp a quitté @gname*" // Texte de départ
  },
  botenable: {
    type: String,
    default: "true" // Activation du bot dans le groupe
  },
  antilink: {
    type: String,
    default: "true" // Activé pour filtrer les liens indésirables
  },
  antiword: {
    type: Object,
    default: {} // Liste des mots à filtrer, activé
  },
  antifake: {
    type: String,
    default: "true" // Activé pour éviter les faux comptes
  },
  antispam: {
    type: String,
    default: "true" // Activé pour prévenir les spams
  },
  antibot: {
    type: String,
    default: "true" // Activé pour prévenir l'ajout de bots
  },
  antitag: {
    type: String,
    default: "true" // Activé pour éviter les tags excessifs
  },
  onlyadmin: {
    type: String,
    default: "false" // Désactivé pour permettre aux non-admins d'exécuter certaines commandes
  },
  economy: {
    type: String,
    default: "false" // Désactivé pour l'économique, peut être activé plus tard
  },
  disablecmds: {
    type: String,
    default: "false" // Désactivé pour ne pas bloquer les commandes
  },
  chatbot: {
    type: String,
    default: "true" // Chatbot activé pour la gestion automatique
  },
  mute: {
    type: String,
    default: "false" // Mode muet désactivé, peut être activé au besoin
  },
  unmute: {
    type: String,
    default: "false" // Mode unmuet désactivé, peut être activé au besoin
  },
  ...options
});

const sck = mongoose.model("Sck", GroupSchema);

module.exports = {
  sck: sck
};
