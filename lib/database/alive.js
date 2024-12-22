let options = {
    temp: {
        type: Object,
        default: {}
    },
    rent: {
        type: Object,
        default: {}
    }
};

const mongoose = require("mongoose");

const Alive = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: "JINHUYK-MD_V2"  // Remplacement du nom par JINHUYK-MD_V2
    },
    alive_text: {
        type: String,
        default: "*Je suis en ligne, Maître*"  // Traduction de "Im online Master"
    },
    alive_get: {
        type: String,
        default: "Vous n'avez pas encore défini de message alive\nTapez [.alive info] pour obtenir des informations sur le message alive"
    },
    alive_url: {
        type: String,
        default: ""
    },
    alive_image: {
        type: Boolean,
        default: false
    },
    alive_video: {
        type: Boolean,
        default: false
    },
    antiviewonce: {
        type: String,
        default: "false"
    },
    antidelete: {
        type: String,
        default: "false"
    },
    autobio: {
        type: String,
        default: "false"
    },
    levelup: {
        type: String,
        default: "true"
    },
    anticall: {
        type: String,
        default: "false"
    },
    autoreaction: {
        type: String,
        default: "true"
    },
    permit: {
        type: Boolean,
        default: false
    },
    permit_values: {
        type: String,
        default: "tous"
    },
    chatbot: {
        type: String,
        default: "false"
    },
    bgm: {
        type: Boolean,
        default: false
    },
    bgmarray: {
        type: Object,
        default: {}
    },
    plugins: {
        type: Object,
        default: {}
    },
    notes: {
        type: Object,
        default: {}
    },
    mention: {
        type: Object,
        default: {}
    },
    filter: {
        type: Object,
        default: {
            asta_: "oui maître ?"
        }
    },
    afk: {
        type: Object,
        default: {}
    },
    // autres options ici
});

const alive = mongoose.model("alive", Alive);

module.exports = {
    alive: alive
};
