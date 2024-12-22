let {
  runtime,
  formatp,
  prefix,
  smd,
  smdBuffer,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
const Config = require("../config");
const cheerio = require("cheerio");

smd({
  cmdname: "messages",
  alias: ["countmessage", "msgcount"],
  desc: "Vérifie combien d'utilisateurs sont continuellement actifs dans le chat !",
  category: "whatsapp",
  filename: __filename
}, async (_0x1cec94, _0x2535b1, {
  store: _0x264360
}) => {
  try {
    let _0x5af784 = {};
    _0x264360.messages[_0x1cec94.jid].array.forEach(_0x2ec32f => {
      const _0xd05e4b = _0x2ec32f.pushName || (_0x1cec94.isGroup ? _0x2ec32f.key.participant : _0x2ec32f.key.remoteJid || "inconnu").split("@")[0];
      _0x5af784[_0xd05e4b] = (_0x5af784[_0xd05e4b] || 0) + 1;
    });
    let _0x599777 = Object.entries(_0x5af784);
    if (!_0x599777 || !_0x599777[0]) {
      return await _0x1cec94.reply("_Aucun message trouvé !_");
    }
    const _0x338160 = Object.entries(_0x5af784).map(([_0x4630e3, _0x3a7f93]) => "\t*" + (_0x4630e3?.split("\n").join(" ") || "inconnu") + "*  ➪  _" + _0x3a7f93 + "_").join("\n");
    var _0x370694 = ("*LISTE DES UTILISATEURS ACTIFS DANS LE CHAT COURANT*\n_Remarque : Parfois, les données seront réinitialisées lors du redémarrage du bot !_\n\n*Utilisateurs Totaux: _" + _0x599777.length + "_*\n\n*UTILISATEUR ➪ NOMBRE DE MESSAGES*\n" + _0x338160 + "\n\n" + Config.caption).trim();
    await _0x1cec94.send(_0x370694, {
      contextInfo: {
        ...(await _0x1cec94.bot.contextInfo("UTILISATEURS ACTIFS", _0x1cec94.senderName))
      }
    }, "asta", _0x1cec94);
  } catch (_0x225db9) {
    console.log({
      e: _0x225db9
    });
  }
});

let commandHistory = [];
smd({
  on: "main"
}, async (_0x297aaa, _0x35b575, {
  icmd: _0x5e5446
}) => {
  try {
    if (_0x5e5446 && _0x297aaa.cmd) {
      commandHistory.push({
        user: _0x297aaa.sender,
        command: _0x297aaa.cmd,
        timestamp: new Date()
      });
    }
  } catch (_0x4bf40a) {
    await _0x297aaa.error(_0x4bf40a + "\n\ncommande : listmessage", _0x4bf40a, "*ERREUR*");
  }
});

smd({
  cmdname: "caption",
  alias: ["setcaption"],
  desc: "Définir la légende pour le message répondu",
  category: "misc",
  filename: __filename
}, async (_0xcc3d0b, _0x718ae9) => {
  try {
    if (!_0xcc3d0b.reply_message || !_0x718ae9) {
      return await _0xcc3d0b.reply(!_0xcc3d0b.reply_message ? "*_Veuillez répondre à un message avec une légende | filename_*" : "*Veuillez fournir un texte pour définir la légende!*");
    }
    if (_0xcc3d0b.reply_message.image || _0xcc3d0b.reply_message.video || _0xcc3d0b.reply_message.mtype.includes("document")) {
      let _0x4e09a5 = "" + _0x718ae9.split("|")[1]?.trim() || "nul";
      let _0x14b6a8 = _0xcc3d0b.reply_message.mtype.includes("document") ? _0x718ae9.split("|")[0].trim() : _0x718ae9;
      _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].caption = _0x14b6a8;
      _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].fileName = _0x4e09a5;
      await _0xcc3d0b.bot.copyNForward(_0xcc3d0b.chat, _0xcc3d0b.reply_message);
    } else {
      return await _0xcc3d0b.reply("Veuillez répondre à un message audio/vidéo/document");
    }
  } catch (_0x5ab188) {
    await _0xcc3d0b.error(_0x5ab188 + "\n\ncommande : caption", _0x5ab188, false);
  }
});

smd({
  cmdname: "document",
  alias: ["senddoc", "doc"],
  desc: "Envoyer un document pour le message image/vidéo répondu",
  category: "misc",
  react: "📑",
  filename: __filename
}, async (_0x7587f6, _0x11eeb1) => {
  try {
    let _0x49db20 = _0x7587f6.image || _0x7587f6.video ? _0x7587f6 : _0x7587f6.reply_message && (_0x7587f6.reply_message.image || _0x7587f6.reply_message.video) ? _0x7587f6.reply_message : false;
    if (!_0x49db20) {
      return await _0x7587f6.reply("_Répondez à un message image/vidéo!_");
    }
    if (!_0x11eeb1) {
      return await _0x7587f6.reply("_Vous devez spécifier le nom du fichier, exemple : document asta | caption_");
    }
    let _0x1bfcf5 = await _0x7587f6.bot.downloadAndSaveMediaMessage(_0x49db20);
    let _0x3f6d77 = _0x11eeb1.includes(":") ? ":" : _0x11eeb1.includes(";") ? ";" : "|";
    let _0x3c4532 = _0x11eeb1.split(_0x3f6d77)[0].trim() + "." + (_0x49db20.image ? "jpg" : "mp4");
    let _0x3367ca = _0x11eeb1.split(_0x3f6d77)[1]?.trim() || "";
    _0x3367ca = ["copy", "default", "old", "reply"].includes(_0x3367ca) ? _0x49db20.text : _0x3367ca;
    if (_0x1bfcf5) {
      _0x7587f6.bot.sendMessage(_0x7587f6.chat, {
        document: {
          url: _0x1bfcf5
        },
        mimetype: _0x49db20.mimetype,
        fileName: _0x3c4532,
        caption: _0x3367ca
      });
    } else {
      _0x7587f6.reply("*Demande refusée!*");
    }
  } catch (_0x408490) {
    await _0x7587f6.error(_0x408490 + "\n\ncommande : document", _0x408490, false);
  }
});

smd({
  cmdname: "tovv",
  alias: ["toviewonce"],
  desc: "Envoyer en mode vue une seule fois pour un message image/vidéo répondu",
  category: "whatsapp",
  filename: __filename
}, async (_0x241c6f, _0x5ce27a) => {
  try {
    let _0x1d26ad = _0x241c6f.image || _0x241c6f.video ? _0x241c6f : _0x241c6f.reply_message && (_0x241c6f.reply_message.image || _0x241c6f.reply_message.video) ? _0x241c6f.reply_message : false;
    if (!_0x1d26ad) {
      return await _0x241c6f.reply("_Répondez à une image/vidéo avec une légende!_");
    }
    let _0x60cca4 = await _0x241c6f.bot.downloadAndSaveMediaMessage(_0x1d26ad);
    let _0x8cde12 = _0x1d26ad.image ? "image" : "video";
    if (_0x60cca4) {
      _0x241c6f.bot.sendMessage(_0x241c6f.chat, {
        [_0x8cde12]: {
          url: _0x60cca4
        },
        caption: _0x5ce27a,
        mimetype: _0x1d26ad.mimetype,
        viewOnce: true
      });
    } else {
      _0x241c6f.reply("*Demande refusée!*");
    }
  } catch (_0x3640d2) {
    await _0x241c6f.error(_0x3640d2 + "\n\ncommande : tovv", _0x3640d2, false);
  }
});

smd({
  cmdname: "feature",
  alias: ["totalfeature", "features"],
  desc: "Vérifie combien de fonctionnalités le bot possède !",
  category: "whatsapp",
  filename: __filename
}, async (_0x29ba5c) => {
  try {
    const _0x1ab735 = Object.keys(smd.config).filter(_0x2f7a2f => smd.config[_0x2f7a2f]?.cmdname).length;
    let _0x3fd342 = "*Total des fonctionnalités du bot : " + _0x1ab735 + "*";
    await _0x29ba5c.reply(_0x3fd342);
  } catch (_0x5b5686) {
    await _0x29ba5c.reply("*_Erreur lors de la vérification des fonctionnalités !_*\n" + _0x5b5686);
  }
});

smd({
  cmdname: "character",
  alias: [],
  desc: "Générer un personnage pour l'utilisateur mentionné/répondu",
  category: "misc",
  filename: __filename
}, async (_0x1b377e) => {
  try {
    let _0x4a2e51 = _0x1b377e.mentionedJidList[0] || _0x1b377e.sender;
    let _0x12ecfa = await axios.get("https://randomuser.me/api");
    let _0x3d8b55 = _0x12ecfa.data.results[0];
    let _0x43267e = `${_0x3d8b55.name.first} ${_0x3d8b55.name.last}`;
    let _0x23eddb = `${_0x3d8b55.email}`;
    let _0x4a49c0 = `${_0x3d8b55.phone}`;
    let _0x10f9da = `${_0x3d8b55.dob.age} ans`;
    let _0x348467 = _0x3d8b55.picture.large;
    let _0x195271 = "https://i.pinimg.com/originals/60/7b/f8/607bf897a1205c35b8c4248daffb6277.jpg";
    let _0x3e5bfa = "Personnage: " + _0x43267e + "\n";
    _0x3e5bfa += "Âge: " + _0x10f9da + "\n";
    _0x3e5bfa += "Email: " + _0x23eddb + "\n";
    _0x3e5bfa += "Téléphone: " + _0x4a49c0 + "\n\n";
    _0x3e5bfa += "Image: " + _0x348467;
    await _0x1b377e.reply(_0x3e5bfa);
  } catch (_0x4ad4db) {
    await _0x1b377e.reply("Erreur lors de la génération des données du personnage!");
  }
});

smd({
  cmdname: "poetry",
  alias: ["shairi", "shayeri"],
  desc: "Envoyer une ligne de poésie aléatoire",
  category: "misc",
  filename: __filename
}, async (_0x585c38) => {
  try {
    const _0x3bceae = await axios.get("https://www.typingbaba.com/feeds/posts/default?alt=rss");
    const _0x4b767d = cheerio.load(_0x3bceae.data);
    const _0x2e33cf = _0x4b767d("entry title").text();
    await _0x585c38.reply(_0x2e33cf);
  } catch (_0x289ec5) {
    await _0x585c38.reply("Impossible de récupérer la poésie!");
  }
});

smd({
  cmdname: "alexa",
  alias: [],
  desc: "Discuter avec l'IA",
  category: "whatsapp",
  filename: __filename
}, async (_0x2d1451) => {
  try {
    await _0x2d1451.reply("Chat avec l'assistant IA activé!");
  } catch (_0x527f84) {
    await _0x2d1451.reply("Erreur avec l'assistant IA!");
  }
});

smd({
  cmdname: "ping2",
  alias: ["botstatus", "statusbot"],
  desc: "Statut du bot (temps de fonctionnement, mémoire, cpu)",
  category: "whatsapp",
  filename: __filename
}, async (_0x27bc8f) => {
  try {
    let _0x4e693d = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
    let _0x5ffcd8 = Math.floor(process.memoryUsage().heapTotal / 1024 / 1024);
    let _0x219697 = Math.round(speed() - runtime);
    let _0x2a0321 = os.totalmem();
    let _0x272587 = os.freemem();
    let _0x5d0e99 = Math.round(((_0x2a0321 - _0x272587) / _0x2a0321) * 100);
    let _0x3ed871 = `Utilisation de la mémoire: ${_0x4e693d}MB / ${_0x5ffcd8}MB`;
    let _0x42d429 = `Mémoire libre: ${_0x272587 / 1024 / 1024}MB`;
    let _0x28cf96 = `Temps de fonctionnement: ${_0x219697}s`;
    let _0x60b52d = `Charge CPU: ${_0x5d0e99}%`;

    let _0x91e5c9 = "*Statut du bot*\n\n";
    _0x91e5c9 += `${_0x28cf96}\n${_0x3ed871}\n${_0x42d429}\n${_0x60b52d}`;
    await _0x27bc8f.reply(_0x91e5c9);
  } catch (_0x169bfa) {
    await _0x27bc8f.reply("Erreur lors de la récupération du statut du bot!");
  }
});
smd({
  cmdname: "myip",
  alias: ["ip"],
  type: "misc",
  info: "Obtenir l'adresse IP du bot"
}, async _0x446c27 => {
  try {
    let {
      data: _0x58d504
    } = await axios.get("https://api.ipify.org/");
    _0x446c27.send(_0x58d504 ? "*L'adresse IP du bot est : _" + _0x58d504 + "_*" : "_Aucune réponse du serveur !_");
  } catch (_0x2976b7) {
    await _0x446c27.error(_0x2976b7 + "\n\nCommande : myip", _0x2976b7, false);
  }
});

let ssweb = (_0x55d18b, _0x2b24ca = "desktop") => {
  return new Promise((_0x3e38ef, _0x5b6da8) => {
    const _0x3eb2a3 = "https://www.screenshotmachine.com";
    const _0x3bbdf7 = {
      url: _0x55d18b,
      device: _0x2b24ca,
      cacheLimit: 0
    };
    axios({
      url: _0x3eb2a3 + "/capture.php",
      method: "POST",
      data: new URLSearchParams(Object.entries(_0x3bbdf7)),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }).then(_0xc3c6b3 => {
      const _0x5ba45c = _0xc3c6b3.headers["set-cookie"];
      if (_0xc3c6b3.data.status == "success") {
        axios.get(_0x3eb2a3 + "/" + _0xc3c6b3.data.link, {
          headers: {
            cookie: _0x5ba45c.join("")
          },
          responseType: "arraybuffer"
        }).then(({
          data: _0x257890
        }) => {
          result = {
            status: 200,
            result: _0x257890
          };
          _0x3e38ef(result);
        });
      } else {
        _0x5b6da8({
          status: 404,
          statuses: "Erreur de lien",
          message: _0xc3c6b3.data
        });
      }
    }).catch(_0x5b6da8);
  });
};

smd({
  cmdname: "ss",
  alias: ["webss", "fullss"],
  type: "misc",
  info: "Obtenir une capture d'écran du site"
}, async (_0x4cdec8, _0x41dfb5) => {
  try {
    let _0x587b99 = _0x41dfb5.split(" ")[0].trim();
    if (!_0x587b99) {
      return await _0x4cdec8.reply("*URL requise ! Utilisez " + prefix + "ss https://github.com/KangJinhuyk/JINHUYK-MD_V2*");
    }
    let _0x358290 = await ssweb(_0x587b99);
    if (_0x358290 && _0x358290.status == "200") {
      return await _0x4cdec8.send(_0x358290.result, {
        caption: Config.caption
      }, "smdimg", _0x4cdec8);
    } else {
      _0x4cdec8.send("_Aucune réponse du serveur !_");
    }
  } catch (_0x126b07) {
    await _0x4cdec8.error(_0x126b07 + "\n\nCommande : ss", _0x126b07, "*Demande refusée!*");
  }
});

let tmpUrl = "https://files.catbox.moe/jynitk.jpg";
const secmailData = {};
smd({
  pattern: "tempmail",
  alias: ["tmpmail", "newmail", "tempemail"],
  info: "Créer une adresse e-mail temporaire, et l'utiliser selon vos besoins !",
  type: "tools"
}, async _0x10eae6 => {
  try {
    if (!secmailData[_0x10eae6.sender]) {
      const _0x5b6408 = await tempmail.create();
      if (!_0x5b6408 || !_0x5b6408[0]) {
        return await _0x10eae6.reply("*Demande refusée!*");
      }
      const _0x17929d = _0x5b6408[0].split("@");
      secmailData[_0x10eae6.sender] = {
        email: _0x5b6408[0],
        login: _0x17929d[0],
        domain: _0x17929d[1]
      };
    }
    var _0x54710d = false;
    try {
      _0x54710d = await smdBuffer(tmpUrl);
    } catch (_0x40985f) {}
    await _0x10eae6.reply(("*INFORMATIONS DE VOTRE TEMPMAIL*\n      \n      \n  *EMAIL:* ➪ " + secmailData[_0x10eae6.sender].email + "\n  *Login:* ➪ " + secmailData[_0x10eae6.sender].login + "\n  *Domaine:* ➪ " + secmailData[_0x10eae6.sender].domain + "\n  \n  \n  *UTILISEZ _" + prefix + "checkmail_ pour voir les derniers emails !*\n  *UTILISEZ _" + prefix + "delmail_ pour supprimer l'email actuel !*\n  \n  " + Config.caption + "\n  ").trim(), {
      contextInfo: {
        ...(await _0x10eae6.bot.contextInfo("TEMPMAIL", _0x10eae6.senderName, _0x54710d))
      }
    }, "smd", _0x10eae6);
  } catch (_0x2c8958) {
    console.log(_0x2c8958);
    await _0x10eae6.reply("*Demande refusée!*");
  }
});

smd({
  pattern: "checkmail",
  alias: ["readmail", "reademail"],
  type: "tools",
  info: "Vérifier les mails dans votre adresse e-mail temporaire !"
}, async _0x39080b => {
  try {
    const _0x13bdf9 = _0x39080b.sender;
    const _0x1ca6eb = secmailData[_0x13bdf9];
    if (!_0x1ca6eb || !_0x1ca6eb.email) {
      return await _0x39080b.reply("*Vous n'avez pas créé d'email temporaire.*\n  *Utilisez _" + prefix + "tempmail_ pour créer un email d'abord!*");
    }
    const _0xb59e7d = await tempmail.mails(_0x1ca6eb.login, _0x1ca6eb.domain);
    if (!_0xb59e7d || !_0xb59e7d[0] || _0xb59e7d.length === 0) {
      return await _0x39080b.reply("*VIDE  ➪ Aucun mail reçu pour le moment!* \n*Utilisez _" + prefix + "delmail_ pour supprimer l'email!*");
    }
    var _0x392c45 = false;
    try {
      _0x392c45 = await smdBuffer(tmpUrl);
    } catch (_0x27f4a4) {}
    for (const _0x2b6dd0 of _0xb59e7d) {
      const _0x587f7f = await tempmail.emailContent(_0x1ca6eb.login, _0x1ca6eb.domain, _0x2b6dd0.id);
      console.log({
        emailContent: _0x587f7f
      });
      if (_0x587f7f) {
        const _0xa4d211 = "\n  *De* ➪ " + _0x2b6dd0.from + "\n  *Date* ➪  " + _0x2b6dd0.date + "\n  *ID EMAIL* ➪  [" + _0x2b6dd0.id + "]\n  *Objet* ➪  " + _0x2b6dd0.subject + "\n  *Contenu* ➪  " + _0x587f7f;
        await _0x39080b.reply(_0xa4d211, {
          contextInfo: {
            ...(await _0x39080b.bot.contextInfo("*EMAIL ➪ " + _0x2b6dd0.id + "*", _0x39080b.senderName, _0x392c45))
          }
        }, "smd", _0x39080b);
        ;
      }
    }
  } catch (_0x4473c8) {
    console.log(_0x4473c8);
    await _0x39080b.reply("*Demande refusée!*");
  }
});

smd({
  pattern: "delmail",
  alias: ["deletemail", "deltemp", "deltmp"],
  type: "tools",
  info: "Supprimer l'adresse e-mail temporaire !"
}, async _0x536927 => {
  try {
    const _0x35c5db = _0x536927.sender;
    if (secmailData[_0x35c5db]) {
      delete secmailData[_0x35c5db];
      await _0x536927.reply("*Adresse email supprimée avec succès.*");
    } else {
      await _0x536927.reply("*Aucune adresse email à supprimer.*");
    }
  } catch (_0x527b01) {
    console.log(_0x527b01);
    await _0x536927.reply("*Demande refusée!*");
  }
});
