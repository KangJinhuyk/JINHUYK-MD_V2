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

 smd(
  {
    pattern: "channel",
    desc: "Canal des Développeurs",
    react: "🍂",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `࿇SUPPORT JINHUYK-MD_V2 ࿇└ \n\n _Voici le lien de notre canal, veuillez nous suivre et nous soutenir pour maintenir ce projet en vie_\n *lien:* https://whatsapp.com/channel/0029Vajrhmz96H4IsEjh4a41\n\n ${Config.botname} *©kang jinhuyk*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);

smd(
  {
    pattern: "support",
    desc: "Support Développeur",
    react: "🍂",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `࿇ SUPPORT JINHUYK-MD_V2 ࿇ POUR TOUTES VOS QUESTIONS, REJOIGNEZ LE SUPPORT WHATSAPP POUR TROUVER DES SOLUTIONS ! \n\n *SUPPORT WHATSAPP :* https://chat.whatsapp.com/IdB2EfQiNlKBekQrigN9m9\n\n ${Config.botname} *©️Kang jinhuyk*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);
smd({
   cmdname: "listmessage",
   alias: ["countmessage", "msgcount"],
   desc: "Vérifier combien d'utilisateurs sont activement présents dans la discussion !",
   category: "misc",
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
     var _0x370694 = ("*LISTE DES UTILISATEURS ACTIFS DANS LA DISCUSSION COURANTE*\n_Remarque : Parfois, les données sont réinitialisées lors du redémarrage du bot !_\n\n*Utilisateurs Totaux : _" + _0x599777.length + "_*\n\n*NOM D'UTILISATEUR ➪ NOMBRE DE MESSAGES*\n" + _0x338160 + "\n\n" + Config.caption).trim();
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
     await _0x297aaa.error(_0x4bf40a + "\n\nCommande : listmessage", _0x4bf40a, "*ERREUR!*");
   }
 });
 
smd({
   cmdname: "usage",
   desc: "Compte les commandes utilisées par les utilisateurs après le démarrage du bot bro🍂?",
   category: "misc",
   filename: __filename
 }, async _0x297641 => {
   try {
     let _0x38bc51 = [];
     const _0x2dd06e = {};
     commandHistory.forEach(({
       user: _0x530cb4,
       command: _0x1c35dd
     }) => {
       if (!_0x2dd06e[_0x530cb4]) {
         _0x2dd06e[_0x530cb4] = {
           commands: {},
           count: 0
         };
         _0x38bc51.push(_0x530cb4);
       }
       if (!_0x2dd06e[_0x530cb4].commands[_0x1c35dd]) {
         _0x2dd06e[_0x530cb4].commands[_0x1c35dd] = 1;
       } else {
         _0x2dd06e[_0x530cb4].commands[_0x1c35dd]++;
       }
       _0x2dd06e[_0x530cb4].count++;
     });
     const _0x5513e2 = _0x38bc51.map((_0x4cd261, _0xf43b6c) => {
       const _0x24712d = _0x2dd06e[_0x4cd261].commands;
       const _0x48255c = Object.entries(_0x24712d).map(([_0x4d2ffd, _0x534145]) => _0x4d2ffd + " " + (_0x534145 <= 1 ? "" : "(" + _0x534145 + ")")).join(", ");
       return "*" + (_0xf43b6c + 1) + " -- @" + _0x4cd261.split("@")[0] + "'s ➪ " + _0x2dd06e[_0x4cd261].count + "*  \n *LISTE ➪*  _" + _0x48255c.trim() + "_";
     }).join("\n\n");
     var _0x17ca33 = ("*LISTE DES COMMANDES UTILISÉES AUJOURD'HUI!*\n_Note: Les données seront réinitialisées lors du redémarrage du bot!_\n\n*Total des utilisateurs: _" + _0x38bc51.length + "_*\n*Total des commandes utilisées: _" + commandHistory.length + "_*\n\n" + _0x5513e2 + "\n\n" + Config.caption).trim();
     await _0x297641.send(_0x17ca33, {
       contextInfo: {
         ...(await _0x297641.bot.contextInfo("HISTORIQUE"))
       },
       mentions: [..._0x38bc51]
     }, "asta", _0x297641);
   } catch (_0x48863b) {
     await _0x297641.error(_0x48863b + "\n\ncommand : cmdused", _0x48863b, "*ERREUR!*");
   }
 });

 smd({
   cmdname: "test",
   alias: ["check", "checkbot"],
   desc: "Vérifie si le bot est actif?",
   category: "misc",
   filename: __filename
 }, async _0x17bb63 => {
   try {
     let _0x12a593 = "*JINHUYK-MD_V2 EST ACTIF ACTUELLEMENT BRO🍂!*"; // Remplacement de JINHUYK-MD par JINHUYK-MD_V2 et emoji
     await _0x17bb63.reply(_0x12a593, {
       contextInfo: {
         externalAdReply: {
           title: "ACTIF",
           sourceUrl: gurl,
           showAdAttribution: true,
           thumbnail: await smdBuffer(await _0x17bb63.getpp())
         }
       }
     }, "asta");
   } catch (_0x2ace2e) {}
 });
 
 smd({
   cmdname: "caption",
   desc: "Définir une légende pour le message répondu",
   category: "misc",
   filename: __filename
 }, async (_0xcc3d0b, _0x718ae9) => {
   try {
     if (!_0xcc3d0b.reply_message || !_0x718ae9) {
       return await _0xcc3d0b.reply(!_0xcc3d0b.reply_message ? "*_Veuillez répondre à un message avec la légende | nom de fichier_*" : "*Veuillez fournir un texte pour définir la légende man😑!*");
     }
     if (_0xcc3d0b.reply_message.image || _0xcc3d0b.reply_message.video || _0xcc3d0b.reply_message.mtype.includes("document")) {
       let _0x4e09a5 = "" + _0x718ae9.split("|")[1]?.trim() || "null";
       let _0x14b6a8 = _0xcc3d0b.reply_message.mtype.includes("document") ? _0x718ae9.split("|")[0].trim() : _0x718ae9;
       _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].caption = _0x14b6a8;
       _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].fileName = _0x4e09a5;
       await _0xcc3d0b.bot.copyNForward(_0xcc3d0b.chat, _0xcc3d0b.reply_message);
     } else {
       return await _0xcc3d0b.reply("Veuillez répondre à un message Audio/Vidéo/document");
     }
   } catch (_0x5ab188) {
     await _0xcc3d0b.error(_0x5ab188 + "\n\ncommande : caption", _0x5ab188, false);
   }
 });

 smd({
   cmdname: "todoc",
   desc: "Envoyer un document pour le message image/vidéo répondu",
   category: "misc",
   filename: __filename
 }, async (_0x7587f6, _0x11eeb1) => {
   try {
     let _0x49db20 = _0x7587f6.image || _0x7587f6.video ? _0x7587f6 : _0x7587f6.reply_message && (_0x7587f6.reply_message.image || _0x7587f6.reply_message.video) ? _0x7587f6.reply_message : false;
     if (!_0x49db20) {
       return await _0x7587f6.reply("_Répondez à un message image/vidéo!_");
     }
     if (!_0x11eeb1) {
       return await _0x7587f6.reply("_Besoin d'un nom de fichier, Exemple : document asta | légende_");
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
   desc: "Envoyer une vue unique pour le message image/vidéo répondu",
   category: "misc",
   filename: __filename
 }, async (_0x241c6f, _0x5ce27a) => {
   try {
     let _0x1d26ad = _0x241c6f.image || _0x241c6f.video ? _0x241c6f : _0x241c6f.reply_message && (_0x241c6f.reply_message.image || _0x241c6f.reply_message.video) ? _0x241c6f.reply_message : false;
     if (!_0x1d26ad) {
       return await _0x241c6f.reply("_Répondez à une image/vidéo avec légende !_");
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
         fileLength: "99999999",
         viewOnce: true
       }, {
         quoted: _0x1d26ad
       });
     } else {
       _0x241c6f.reply("*Demande refusée!*");
     }
   } catch (_0x2422e7) {
     await _0x241c6f.error(_0x2422e7 + "\n\ncommande : tovv", _0x2422e7, false);
   }
 });

 smd({
   cmdname: "feature",
   category: "misc",
   filename: __filename,
   info: "Obtenez le compte total des fonctionnalités!"
 }, async _0x4e7c63 => {
   try {
     const _0x4de967 = require("../lib/plugins");
     let _0x4cf8ed = Object.values(_0x4de967.commands).length;
     try {
       let {
         key: _0x2d7cf6
       } = await _0x4e7c63.send("Comptage... 0", {}, "asta", _0x4e7c63);
       for (let _0x16a10f = 0; _0x16a10f <= _0x4cf8ed; _0x16a10f++) {
         if (_0x16a10f % 15 === 0) {
           await _0x4e7c63.send("Comptage... " + _0x16a10f, {
             edit: _0x2d7cf6
           }, "asta", _0x4e7c63);
         } else if (_0x4cf8ed - _0x16a10f < 10) {
           await _0x4e7c63.send("Comptage... " + _0x16a10f, {
             edit: _0x2d7cf6
           }, "asta", _0x4e7c63);
         }
       }
       await _0x4e7c63.send("*Comptage des fonctionnalités terminé!*", {
         edit: _0x2d7cf6
       }, "asta", _0x4e7c63);
     } catch (_0x28ce7e) {}
     let _0x50f17a = " *乂 JINHUYK-MD_V2 - ＢＯＴ ＦＥＡＴＵＲＥ*\n\n\n  ◦ _Fonctionnalités Totales ➪ " + _0x4cf8ed + "_\n  \n*◦ LISTE DES FONCTIONNALITÉS*\n\n      _Commandes ➪ " + Object.values(_0x4de967.commands).filter(_0x54d4bf => _0x54d4bf.pattern).length + "_\n      _Écouteur de Message ➪ " + Object.values(_0x4de967.commands).filter(_0x2376a3 => _0x2376a3.on).length + "_\n      _Écouteur d'Appel ➪ " + Object.values(_0x4de967.commands).filter(_0x54a19b => _0x54a19b.call).length + "_\n      _Écouteur de Groupe ➪ " + Object.values(_0x4de967.commands).filter(_0x35381c => _0x35381c.group).length + "_\n  \n\n" + Config.caption;
     await _0x4e7c63.bot.relayMessage(_0x4e7c63.chat, {
       requestPaymentMessage: {
         currencyCodeIso4217: "NG",
         amount1000: _0x4cf8ed * 5000,
         requestFrom: "0@s.whatsapp.net",
         noteMessage: {
           extendedTextMessage: {
             text: _0x50f17a,
             contextInfo: {
               mentionedJid: [_0x4e7c63.sender],
               externalAdReply: {
                 showAdAttribution: true
               }
             }
           }
         }
       }
     }, {});
   } catch (_0x979e23) {
     await _0x4e7c63.error(_0x979e23 + "\n\ncommande : feature", _0x979e23, false);
   }
 });
 smd({
   cmdname: "character",
   category: "fun",
   use: "[@utilisateur]",
   filename: __filename,
   info: "Vérifie le caractère de l'utilisateur répondu !"
 }, async _0x2a677e => {
   const _0x32c078 = _0x2a677e.reply_message ? _0x2a677e.reply_message.sender : _0x2a677e.mentionedJid && _0x2a677e.mentionedJid[0] ? _0x2a677e.mentionedJid[0] : "";
   if (!_0x32c078 || !_0x32c078.includes("@")) {
     return await _0x2a677e.reply("*Mentionnez/répondez à un utilisateur pour vérifier son caractère!*");
   }
   const _0x5845d4 = ["Sigma", "Généreux", "Grincheux", "Trop confiant", "Obéissant", "Bon", "Simple", "Gentil", "Patient", "Perverti", "Cool", "Utile", "Brillant", "Sexy", "Chaud", "Magnifique", "Mignon", "Fabuleux", "Drôle"];
   const _0x2f5d93 = _0x5845d4[Math.floor(Math.random() * _0x5845d4.length)];
   let _0x3b31ed = "Le caractère de @" + _0x32c078.split("@")[0] + " est *" + _0x2f5d93 + "* 🔥⚡";
   _0x2a677e.send(_0x3b31ed, {
     mentions: [_0x32c078]
   }, "asta", _0x2a677e);
 });

 smd({
   cmdname: "poetry",
   type: "fun",
   info: "Obtenez des lignes de poésie aléatoires"
 }, async _0x4d032f => {
   try {
     let _0x45fa91 = await fetch("https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo");
     let {
       result: _0x1aa994
     } = await _0x45fa91.json();
     _0x4d032f.reply(_0x45fa91 && _0x1aa994 ? _0x1aa994 : "_Demande refusée par le serveur !_");
   } catch (_0x303ba6) {
     await _0x4d032f.error(_0x303ba6 + "\n\ncommande : poetry", _0x303ba6, false);
   }
 });

 smd({
   cmdname: "alexa",
   category: "ai",
   use: "[texte]",
   filename: __filename,
   info: "Discutez avec l'IA Simsimi Alexa !"
 }, async (_0xe6d6e, _0x23f786) => {
   try {
     if (!_0x23f786) {
       return await _0xe6d6e.reply("Salut *" + _0xe6d6e.senderName + "*, tu veux discuter ?");
     }
     const _0x55bb61 = {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       body: "text=" + encodeURIComponent(_0x23f786) + "&lc=fr&key="
     };
     const _0x5099c8 = await fetch("https://api.simsimi.vn/v2/simtalk", _0x55bb61);
     const _0x2c3e12 = await _0x5099c8.json();
     if (_0x2c3e12.status === "200" && _0x2c3e12.message) {
       _0xe6d6e.reply(_0x2c3e12.message);
     } else {
       _0xe6d6e.reply("*Pas de réponse!*");
     }
   } catch (_0xfee6e3) {
     await _0xe6d6e.error(_0xfee6e3 + "\n\ncommande : poetry", _0xfee6e3, false);
   }
 });

 smd({
   cmdname: "ping2",
   alias: ["botstatus", "statusbot", "p2"],
   type: "misc",
   info: "Obtenez des lignes de poésie aléatoires"
 }, async _0xdfc3ca => {
   try {
     const _0x37ca41 = process.memoryUsage();
     const _0x4a72de = os.cpus().map(_0x39cb6a => {
       _0x39cb6a.total = Object.keys(_0x39cb6a.times).reduce((_0x432663, _0x5a155c) => _0x432663 + _0x39cb6a.times[_0x5a155c], 0);
       return _0x39cb6a;
     });
     const _0x410388 = _0x4a72de.reduce((_0x8a6a46, _0x3dde47, _0x4edc26, {
       length: _0x378aa4
     }) => {
       _0x8a6a46.total += _0x3dde47.total;
       _0x8a6a46.speed += _0x3dde47.speed / _0x378aa4;
       _0x8a6a46.times.user += _0x3dde47.times.user;
       _0x8a6a46.times.nice += _0x3dde47.times.nice;
       _0x8a6a46.times.sys += _0x3dde47.times.sys;
       _0x8a6a46.times.idle += _0x3dde47.times.idle;
       _0x8a6a46.times.irq += _0x3dde47.times.irq;
       return _0x8a6a46;
     }, {
       speed: 0,
       total: 0,
       times: {
         user: 0,
         nice: 0,
         sys: 0,
         idle: 0,
         irq: 0
       }
     });
     let _0xce26d = speed();
     let _0x3db049 = speed() - _0xce26d;
     neww = performance.now();
     oldd = performance.now();
     respon = ("\nVitesse de réponse " + _0x3db049.toFixed(4) + " _Seconde_ \n " + (oldd - neww) + " _millisecondes_\n\nTemps d'exécution : " + runtime(process.uptime()) + "\n\n💻 Info Serveur\nRAM: " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n_Mémoire NodeJS_\n" + Object.keys(_0x37ca41).map((_0x19d575, _0x3942d9, _0x3fa08c) => _0x19d575.padEnd(Math.max(..._0x3fa08c.map(_0x6548cb => _0x6548cb.length)), " ") + ": " + formatp(_0x37ca41[_0x19d575])).join("\n") + "\n\n" + (_0x4a72de[0] ? "_Utilisation CPU totale_\n" + _0x4a72de[0].model.trim() + " (" + _0x410388.speed + " MHZ)\n" + Object.keys(_0x410388.times).map(_0xffc60c => "- *" + (_0xffc60c + "*").padEnd(6) + ": " + (_0x410388.times[_0xffc60c] * 100 / _0x410388.total).toFixed(2) + "%").join("\n") + " " : "") + "\n\n ").trim();
     _0xdfc3ca.reply(respon);
   } catch (_0x13d03e) {
     await _0xdfc3ca.error(_0x13d03e + "\n\ncommande : ping2", _0x13d03e, false);
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
     _0x446c27.send(_0x58d504 ? "*L'adresse IP du bot est : _" + _0x58d504 + "_*" : "_Pas de réponse du serveur !_");
   } catch (_0x2976b7) {
     await _0x446c27.error(_0x2976b7 + "\n\ncommande : myip", _0x2976b7, false);
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
   type: "misc",
   info: "Obtenir une capture d'écran"
 }, async (_0x4cdec8, _0x41dfb5) => {
   try {
     let _0x587b99 = _0x41dfb5.split(" ")[0].trim();
     if (!_0x587b99) {
       return await _0x4cdec8.reply("*Besoin d'une URL ! Utilisez " + prefix + "ss https://github.com/KangJinhuyk/JINHUYK-MD_V2*");
     }
     let _0x358290 = await ssweb(_0x587b99);
     if (_0x358290 && _0x358290.status == "200") {
       return await _0x4cdec8.send(_0x358290.result, {
         caption: Config.caption
       }, "amdimg", _0x4cdec8);
     } else {
       _0x4cdec8.send("_Pas de réponse du serveur !_");
     }
   } catch (_0x126b07) {
     await _0x4cdec8.error(_0x126b07 + "\n\ncommande : myip", _0x126b07, "*Demande refusée!*");
   }
 });

 