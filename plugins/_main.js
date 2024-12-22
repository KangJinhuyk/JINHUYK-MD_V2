const util = require("util");
const fs = require("fs-extra");
const { cmd } = require("../lib/plugins");
const {
  formatp,
  TelegraPh,
  aitts,
  smd,
  prefix,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");

function _0x2a0d(_0x32de74, _0xce23fd) {
  const _0x3ffb1a = _0x2953();
  _0x2a0d = function (_0x151552, _0x18c062) {
    _0x151552 = _0x151552 - 233;
    let _0x5c396f = _0x3ffb1a[_0x151552];
    return _0x5c396f;
  };
  return _0x2a0d(_0x32de74, _0xce23fd);
}

function _0x2953() {
  const _0x4f0c10 = ["json", "choices", "2KTKIiW", "application/json", "chat", "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[", "4017447FwUKbt", "2673069xtYnEg", "REMOVE_BG_KEY", "Bearer ", "image-alpha-001", "320668Kzvhym", "data", "then", "message", "1548910BYiCAA", "error in aiResponce : ", "119490ILpvcx", "system", "sender", "binary", "from", "log", "dalle", "https://api.remove.bg/v1.0/removebg", "567277OBjzQH", "length", "get", "POST", "stringify", "content", "512x512", "78qmNvDj", "https://api.openai.com/v1/images/generations", "Error While getting Ai responce ", "url", "catch", "]&msg=[", "split", "8yTiNwA", "You", "gpt", "1769427SEqioY"];
  _0x2953 = function () {
    return _0x4f0c10;
  };
  return _0x2953();
}

(function (_0x4f4b4b, _0x46381a) {
  const _0x23b0f7 = _0x2a0d;
  const _0x17ab9c = _0x4f4b4b();
  while (true) {
    try {
      const _0x24d937 = parseInt(_0x23b0f7(264)) / 1 * (-parseInt(_0x23b0f7(241)) / 2) + parseInt(_0x23b0f7(238)) / 3 + -parseInt(_0x23b0f7(250)) / 4 + -parseInt(_0x23b0f7(256)) / 5 * (parseInt(_0x23b0f7(271)) / 6) + parseInt(_0x23b0f7(246)) / 7 * (parseInt(_0x23b0f7(235)) / 8) + parseInt(_0x23b0f7(245)) / 9 + -parseInt(_0x23b0f7(254)) / 10;
      if (_0x24d937 === _0x46381a) {
        break;
      } else {
        _0x17ab9c.push(_0x17ab9c.shift());
      }
    } catch (_0x1a2819) {
      _0x17ab9c.push(_0x17ab9c.shift());
    }
  }
})(_0x2953, 305050);

async function aiResponce(_0x109acf, _0xf00650, _0x2728a0 = "") {
  const _0x242f00 = _0x2a0d;
  let _0x2d78d9 = "";
  try {
    if (_0xf00650 === _0x242f00(243)) {
      _0x2d78d9 = await (await axios[_0x242f00(266)](_0x242f00(244) + _0x109acf[_0x242f00(258)][_0x242f00(234)]("@")[0] + _0x242f00(233) + _0x2728a0 + "]"))[_0x242f00(251)].cnt;
    } else if (_0xf00650 === _0x242f00(237)) {
      const _0x3e1043 = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: _0x242f00(248) + Config.OPENAI_API_KEY
        },
        body: JSON[_0x242f00(268)]({
          model: "gpt-3.5-turbo",
          messages: [{
            role: _0x242f00(257),
            content: _0x242f00(236)
          }, {
            role: "user",
            content: _0x2728a0
          }]
        })
      });
      const _0x26c61c = await _0x3e1043[_0x242f00(239)]();
      if (!_0x26c61c[_0x242f00(240)] || _0x26c61c[_0x242f00(240)][_0x242f00(265)] === 0) {
        _0x2d78d9 = "*Clé API ChatGPT invalide, veuillez mettre une nouvelle clé*";
      } else {
        _0x2d78d9 = _0x26c61c[_0x242f00(240)][0][_0x242f00(253)][_0x242f00(269)];
      }
    } else if (_0xf00650 === _0x242f00(262)) {
      const _0x1a4db1 = await fetch(_0x242f00(272), {
        method: _0x242f00(267),
        headers: {
          "Content-Type": _0x242f00(242),
          Authorization: _0x242f00(248) + Config.OPENAI_API_KEY
        },
        body: JSON[_0x242f00(268)]({
          model: _0x242f00(249),
          prompt: _0x2728a0,
          size: _0x242f00(270),
          response_format: _0x242f00(274)
        })
      });
      const _0x2cdadf = await _0x1a4db1[_0x242f00(239)]();
      _0x2d78d9 = _0x2cdadf[_0x242f00(251)][0][_0x242f00(274)];
    }
    if (_0xf00650 === "rmbg") {
      const _0x142226 = {
        image_url: _0x2728a0,
        size: "auto"
      };
      axios.post(_0x242f00(263), _0x142226, {
        headers: {
          "X-Api-Key": Config[_0x242f00(247)]
        },
        responseType: "arraybuffer"
      })[_0x242f00(252)](_0x18f9bd => {
        const _0x382416 = _0x242f00;
        _0x2d78d9 = Buffer[_0x382416(260)](_0x18f9bd[_0x382416(251)], _0x382416(259));
      })[_0x242f00(275)](_0x25d8c1 => {
        _0x2d78d9 = false;
      });
    }
    return _0x2d78d9;
  } catch (_0x4eee67) {
    console[_0x242f00(261)](_0x242f00(255), _0x4eee67);
    return _0x242f00(273);
  }
}

// Commandes mises à jour
smd({
  pattern: "chat",
  desc: "chattez avec une IA",
  category: "IA",
  use: "<Salut, monsieur>",
  filename: __filename
}, async (_0x1c0160, _0x482db1) => {
  try {
    return _0x1c0160.reply(await aiResponce(_0x1c0160, "chat", _0x482db1));
  } catch (_0x4adf95) {
    await _0x1c0160.error(_0x4adf95 + "\n\ncommande: chat", _0x4adf95, "*_pas de réponse AI_*\n\n");
  }
});
smd({
  pattern: "gpt",
  desc: "discuter avec une IA",
  category: "ia",
  use: "<Salut, ☞⌜ JINHUYK-MD_V2 ⌝☜>",
  filename: __filename,
  react: "📡"
}, async (_0x5cb388, _0x302ad5) => {
  try {
    try {
      let _0x557719 = _0x302ad5 ? _0x302ad5 : bot.reply_text;
      if (!_0x557719) {
        return man.reply("Donne-moi une question, par exemple 'Qui est SASAKI ?' ou 'Qui est JINHUYK-MD_V2 ?'");
      }
      const _0x50c8d3 = await fetch("https://aemt.me/openai?text=" + _0x557719);
      const _0x14c9d6 = await _0x50c8d3.json();
      if (_0x14c9d6 && _0x14c9d6.status && _0x14c9d6.result) {
        return await _0x5cb388.reply(_0x14c9d6.result);
      }
    } catch {}
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x5cb388.reply("```Tu n'as pas de clé API OPENAI \nVeuillez créer une clé API OPENAI à partir du lien suivant \nhttps://platform.openai.com/account/api-keys\nEt définir la clé dans la variable OPENAI_API_KEY sur Heroku```");
    }
    if (!_0x302ad5) {
      return _0x5cb388.reply("Salut " + _0x5cb388.senderName + "! Comment ça va ces jours-ci ?");
    }
    return _0x5cb388.send(await aiResponce(_0x5cb388, "gpt", _0x302ad5));
  } catch (_0x2ef914) {
    await _0x5cb388.error(_0x2ef914 + "\n\ncommande: gpt", _0x2ef914, "*_pas de réponse de chatgpt, désolé !!_*");
  }
});
smd({
  pattern: "dalle",
  alias: ["dall", "dall-e"],
  desc: "discuter avec une IA",
  category: "ia",
  use: "<Salut, Sir>",
  filename: __filename
}, async (_0x21be87, _0x17d498) => {
  try {
    if (!_0x17d498) {
      return await _0x21be87.reply("*Donne-moi une requête pour obtenir une réponse de Dall-E ?*");
    }
    const _0x27bd9a = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(_0x17d498);
    try {
      return await _0x21be87.bot.sendMessage(_0x21be87.chat, {
        image: {
          url: _0x27bd9a
        },
        caption: "[PROMPT]: ```" + _0x17d498 + " ```  \n " + Config.caption + " "
      });
    } catch (_0x5cee92) {
      console.log("ERREUR DE RÉPONSE DALL-E DE L'API GURUGPT\n", _0x5cee92);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x21be87.reply("```Tu n'as pas de clé API OPENAI \nVeuillez créer une clé API OPENAI ici \nhttps://platform.openai.com/account/api-keys\nEt définir la clé dans la variable OPENAI_API_KEY sur Heroku```");
    }
    return await _0x21be87.bot.sendMessage(_0x21be87.chat, {
      image: {
        url: await aiResponce(_0x21be87, "dalle", _0x17d498)
      },
      caption: "*---Votre résultat DALL-E---*\n" + Config.caption
    });
  } catch (_0x25b4b9) {
    await _0x21be87.error(_0x25b4b9 + "\n\ncommande: dalle", _0x25b4b9, "*_Pas de réponse de Dall-E AI, désolé !!_*");
  }
});
smd({
  pattern: "imagine",
  alias: ["imagin"],
  desc: "discuter avec une IA",
  category: "ia",
  use: "<un garçon marchant dans la rue>",
  filename: __filename
}, async (_0x9bac01, _0x3700d4) => {
  try {
    let _0x2968fd = _0x3700d4 || _0x9bac01.reply_text;
    if (!_0x2968fd) {
      return await _0x9bac01.reply("*Donne-moi une requête pour obtenir une imagination ?*");
    }
    let _0x24d5e9 = false;
    try {
      const _0x156dd7 = await fetch("https://aemt.me/openai?text=" + (_0x2968fd + " \nNOTE: Assurez-vous que cela ressemble à une imagination, soyez concis et utilisez l'anglais!"));
      const _0x49b22e = await _0x156dd7.json();
      _0x24d5e9 = _0x49b22e && _0x49b22e.status && _0x49b22e.result ? _0x49b22e.result : "";
    } catch (_0xf1623a) {
      _0x24d5e9 = false;
    }
    try {
      await Draw(_0x2968fd || _0x9bac01.reply_text).then(_0x1f03a3 => {
        _0x9bac01.bot.sendMessage(_0x9bac01.chat, {
          image: _0x1f03a3,
          caption: "*[IMAGINATION]:* ```" + _0x2968fd + " ```" + (_0x24d5e9 ? "\n\n*[RÉPONSE]:* ```" + _0x24d5e9 + "``` \n" : "") + "  \n " + Config.caption + " "
        });
      });
      return;
    } catch (_0x45726b) {
      console.log("ERREUR DE RÉPONSE D'IMAGINE DE L'API IMAGINE\n", _0x45726b);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x9bac01.reply("```Tu n'as pas de clé API OPENAI \nVeuillez créer une clé API OPENAI ici \nhttps://platform.openai.com/account/api-keys\nEt définir la clé dans la variable OPENAI_API_KEY sur Heroku```");
    }
    return await _0x9bac01.bot.sendMessage(_0x9bac01.chat, {
      image: {
        url: await aiResponce(_0x9bac01, "dalle", _0x2968fd)
      },
      caption: "*---Votre résultat DALL-E---*\n" + Config.caption
    });
  } catch (_0x5d8080) {
    await _0x9bac01.error(_0x5d8080 + "\n\ncommande: imagine", _0x5d8080, "*_Pas de réponse du côté serveur, désolé !!_*");
  }
});
smd({
  pattern: "imagine2",
  alias: ["imagin2"],
  desc: "discuter avec une IA",
  category: "ia",
  use: "<un garçon marchant dans la rue>",
  filename: __filename
}, async (_0x39716c, _0xe79cfd) => {
  try {
    let _0x5e79d4 = _0xe79cfd || _0x39716c.reply_text;
    if (!_0x5e79d4) {
      return await _0x39716c.reply("*Donne-moi une requête pour obtenir une imagination ?*");
    }
    const _0x14515f = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(_0x5e79d4 + " \nNOTE: Assurez-vous que cela ressemble à une imagination");
    let _0x5d0b6a = false;
    try {
      const _0x37057d = await fetch("https://aemt.me/openai?text=" + (_0x5e79d4 + " \nNOTE: Assurez-vous que cela ressemble à une imagination, soyez concis et utilisez l'anglais!"));
      const _0x644785 = await _0x37057d.json();
      _0x5d0b6a = _0x644785 && _0x644785.status && _0x644785.result ? _0x644785.result : "";
    } catch (_0x3ecac9) {
      _0x5d0b6a = false;
    }
    try {
      return await _0x39716c.bot.sendMessage(_0x39716c.chat, {
        image: {
          url: _0x14515f
        },
        caption: "*[IMAGINATION]:* ```" + _0x5e79d4 + " ```" + (_0x5d0b6a ? "\n\n*[RÉPONSE]:* ```" + _0x5d0b6a + "``` \n" : "") + "  \n " + Config.caption + " "
      });
    } catch (_0x484392) {
      console.log("ERREUR DE RÉPONSE D'IMAGINE DE L'API GURUGPT\n", _0x484392);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return _0x39716c.reply("```Tu n'as pas de clé API OPENAI \nVeuillez créer une clé API OPENAI ici \nhttps://platform.openai.com/account/api-keys\nEt définir la clé dans la variable OPENAI_API_KEY sur Heroku```");
    }
    return await _0x39716c.bot.sendMessage(_0x39716c.chat, {
      image: {
        url: await aiResponce(_0x39716c, "dalle", _0x5e79d4)
      },
      caption: "*---Votre résultat DALL-E---*\n" + Config.caption
    });
  } catch (_0x110b5d) {
    await _0x39716c.error(_0x110b5d + "\n\ncommande: imagine", _0x110b5d, "*_Pas de réponse du côté serveur, désolé !!_*");
  }
});
smd({
  pattern: "rmbg",
  alias: ["removebg"],
  category: "ia",
  filename: __filename,
  desc: "Retirer l'arrière-plan de l'image."
}, async _0x28a796 => {
  try {
    if (!Config.REMOVE_BG_KEY) {
      return _0x28a796.reply("```Tu n'as pas de clé REMOVE_BG_KEY \nVeuillez créer une clé RemoveBG ici \nhttps://www.remove.bg/\nEt définir la clé dans la variable REMOVE_BG_KEY```");
    }
    let _0x536d9f = ["imageMessage"];
    let _0x4f2076 = _0x536d9f.includes(_0x28a796.mtype) ? _0x28a796 : _0x28a796.reply_message;
    if (!_0x4f2076 || !_0x536d9f.includes(_0x4f2076?.mtype || "null")) {
      return await _0x28a796.send("*_Hé cher, répond à une image_*");
    }
    let _0x437dc5 = await _0x28a796.bot.downloadAndSaveMediaMessage(_0x4f2076);
    let _0x4dcaa0 = await TelegraPh(_0x437dc5);
    try {
      fs.unlinkSync(_0x437dc5);
    } catch {}
    let _0x9b86dd = await aiResponce(_0x28a796, "rmbg", _0x4dcaa0);
    if (_0x9b86dd) {
      await _0x28a796.send(_0x9b86dd, {
        caption: Config.caption
      }, "image", _0x28a796);
    } else {
      await _0x28a796.send("*_La demande ne peut pas être traitée !!_*");
    }
  } catch (_0x166d80) {
    await _0x28a796.error(_0x166d80 + "\n\ncommande: rmbg", _0x166d80, "*_Pas de réponse de remove.bg, désolé !!_*");
  }
});
smd({
  pattern: "readmore",
  alias: ["rmore", "readmor"],
  desc: "Ajoute *readmore* dans le texte donné.",
  category: "général",
  filename: __filename
}, async (_0x5db0de, _0x38fb87) => {
  try {
    let _0x5ea4b8 = _0x38fb87 ? _0x38fb87 : _0x5db0de.reply_text;
    if (!_0x5ea4b8) {
      _0x5ea4b8 = "*Hé cher, veuillez fournir un texte*\n*Exemple : _.readmor texte1 readmore texte2_*";
    } else {
      _0x5ea4b8 += " ";
    }
    if (_0x5ea4b8.includes("readmore")) {
      await _0x5db0de.reply(_0x5ea4b8.replace(/readmore/, String.fromCharCode(8206).repeat(4001)));
    } else {
      await _0x5db0de.reply(_0x5ea4b8.replace(" ", String.fromCharCode(8206).repeat(4001)));
    }
  } catch (_0x36cb2c) {
    await _0x5db0de.error(_0x36cb2c + "\n\ncommande : readmore", _0x36cb2c, false);
  }
});
let pmtypes = ["videoMessage", "imageMessage"];
cmd({
  pattern: "url",
  alias: ["createurl"],
  category: "général",
  filename: __filename,
  desc: "Convertir l'image en URL.",
  use: "<vidéo | image>",
  react: "🔗"
}, async _0x4e4351 => {
  try {
    let _0x680da4 = pmtypes.includes(_0x4e4351.mtype) ? _0x4e4351 : _0x4e4351.reply_message;
    if (!_0x680da4 || !pmtypes.includes(_0x680da4?.mtype)) {
      return _0x4e4351.reply("*_Hé cher, répond à une image/vidéo !_*");
    }
    let _0x349452 = await _0x4e4351.bot.downloadAndSaveMediaMessage(_0x680da4);
    let _0x536aa6 = await createUrl(_0x349452);

    if (!_0x536aa6) {
      // Si la première tentative échoue, on tente de récupérer le lien via une autre méthode
      _0x536aa6 = await alternativeUrl(_0x349452);
    }

    if (!_0x536aa6) {
      return _0x4e4351.reply("*_Échec de la création de l'URL, désolé !_*");
    }

    try {
      fs.unlinkSync(_0x349452); // Supprimer le fichier temporaire
    } catch {}
    
    await _0x4e4351.send(util.format(_0x536aa6), {}, "asta", _0x680da4);
  } catch (_0x2ee8cc) {
    await _0x4e4351.error(_0x2ee8cc + "\n\ncommande url", _0x2ee8cc);
  }
});

// Fonction alternative pour récupérer l'URL si la méthode principale échoue
async function alternativeUrl(filePath) {
  try {
    // Code pour obtenir l'URL via une autre méthode si la première échoue
    // Par exemple, ici tu peux ajouter un service de téléchargement d'image différent
    let response = await fetch("https://api.imgur.com/3/upload", {
      method: "POST",
      headers: {
        "Authorization": "Client-ID YOUR_IMGUR_CLIENT_ID"
      },
      body: JSON.stringify({ image: filePath }) // Remplacer `filePath` par le fichier téléchargé ou l'image base64
    });
    
    let data = await response.json();
    if (data.success) {
      return data.data.link; // Retourner le lien direct de l'image
    }
    return false;
  } catch (error) {
    console.log("Erreur lors de la récupération de l'URL alternative:", error);
    return false;
  }
}
cmd({
  pattern: "upload",
  alias: ["url2"],
  category: "général",
  filename: __filename,
  desc: "Convertir l'image en URL.",
  use: "<vidéo | image>"
}, async _0xbda24 => {
  try {
    let _0x7d6de1 = pmtypes.includes(_0xbda24.mtype) ? _0xbda24 : _0xbda24.reply_message;
    if (!_0x7d6de1 || !pmtypes.includes(_0x7d6de1?.mtype)) {
      return _0xbda24.reply("*_Hé cher, répond à une image/vidéo !_*");
    }
    let _0xeb95de = await _0xbda24.bot.downloadAndSaveMediaMessage(_0x7d6de1);
    let _0x3e1ea8 = await createUrl(_0xeb95de, "uguMashi");

    // Si la première méthode échoue, utilise une méthode alternative pour générer l'URL
    if (!_0x3e1ea8 || !_0x3e1ea8.url) {
      _0x3e1ea8 = await alternativeUrl(_0xeb95de);
    }

    try {
      fs.unlinkSync(_0xeb95de); // Supprime le fichier après l'avoir utilisé
    } catch {}

    if (!_0x3e1ea8 || !_0x3e1ea8.url) {
      return _0xbda24.reply("*_Échec de la création de l'URL !_*");
    }

    await _0xbda24.send(util.format(_0x3e1ea8.url), {}, "asta", _0x7d6de1);
  } catch (_0x1a2f02) {
    await _0xbda24.error(_0x1a2f02 + "\n\ncommande upload", _0x1a2f02);
  }
});

// Fonction alternative pour récupérer l'URL si la méthode principale échoue
async function alternativeUrl(filePath) {
  try {
    // Code pour obtenir l'URL via un autre service (par exemple Imgur)
    let response = await fetch("https://api.imgur.com/3/upload", {
      method: "POST",
      headers: {
        "Authorization": "Client-ID YOUR_IMGUR_CLIENT_ID"
      },
      body: JSON.stringify({ image: filePath }) // Remplacer `filePath` par l'image base64 ou le fichier téléchargé
    });

    let data = await response.json();
    if (data.success) {
      return { url: data.data.link }; // Retourne le lien direct de l'image
    }
    return false;
  } catch (error) {
    console.log("Erreur lors de la récupération de l'URL alternative:", error);
    return false;
  }
}
smd({
  pattern: "calc",
  desc: "Calculer une équation.",
  category: "général",
  use: "<équation>",
  filename: __filename
}, async (_0x5d95a7, _0x28af98) => {
  try {
    if (!_0x28af98) {
      return await _0x5d95a7.reply("*Veuillez entrer une opération mathématique*\n*Exemple : .calc 22+12*");
    }
    let _0xcebecd = _0x28af98.replace(/\s+/g, "");
    if (!/^(\d+([-+%*/]\d+)+)$/.test(_0xcebecd)) {
      return await _0x5d95a7.reply("Veuillez entrer une opération mathématique valide.");
    }
    const _0x38ba36 = _0x3b53fe => {
      return new Function("return " + _0x3b53fe)();
    };
    const _0x5e0640 = _0x38ba36(_0xcebecd);
    if (_0xcebecd.includes("/") && _0xcebecd.split("/").some(_0x413293 => _0x413293 === "0")) {
      return _0x5d95a7.reply("Impossible de diviser par zéro.");
    }
    if (_0xcebecd.split(/[-+%*/]/).length <= 2) {
      const [_0x120f57, _0x1de7dc, _0x112a0e] = _0xcebecd.match(/\d+|[-+%*/]/g);
      return await _0x5d95a7.reply(_0x120f57 + " " + _0x1de7dc + " " + _0x112a0e + " = " + _0x5e0640);
    } else {
      return await _0x5d95a7.reply("Résultat : " + _0x5e0640);
    }
  } catch (_0x120f52) {
    return await _0x5d95a7.error(_0x120f52 + "\n\ncommande: calc", _0x120f52);
  }
});
100smd({
  pattern: "repo",
  alias: ["git", "sc", "script", "jinhuyk"],
  desc: "Envoie des informations sur le repo",
  category: "général",
  react: "🤖",
  filename: __filename
}, async _0x45da98 => {
  try {
    let {
      data: _0x44f98c
    } = await axios.get("https://api.github.com/repos/KangJinhuyk/JINHUYK-MD_V2");
    let _0x1c73f9 = ("\nJINHUYK-MD_V2 𝘈 𝘚𝘐𝘔𝘗𝘓𝘌 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 𝘉𝘖𝘛 , 𝘔𝘈𝘋𝘌 𝘉𝘠 KANG JINHUYK 𝘈𝘕𝘋 𝘋𝘌𝘗𝘓𝘖𝘠𝘌𝘋 𝘉𝘠 *" + Config.ownername + "*.\n\n  *❲❒❳ Stars:* " + (_0x44f98c?.stargazers_count || "120+") + " stars\n  *❲❒❳ Forks:* " + (_0x44f98c?.forks_count || "1000+") + " forks\n  *❲❒❳ Authors:* Kang jinhuyk\n  *❲❒❳ Created On:* " + (_0x44f98c?.created_at || "undefined") + "\n  *❲❒❳ Repo:* _https://github.com/KangJinhuyk/JINHUYK-MD_V2\n  *❲❒❳ Scan:* _" + scan + "_" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
    return await _0x45da98.sendUi(_0x45da98.jid, {
      caption: _0x1c73f9
    });
  } catch (_0x5816fe) {
    await _0x45da98.error(_0x5816fe + "\n\ncommand: repo", _0x5816fe);
  }
});
smd({
  pattern: "cpu",
  desc: "Vérifier le statut du bot",
  category: "général",
  filename: __filename
}, async _0x51c639 => {
  try {
    const _0x78d515 = process.memoryUsage();
    const _0x14b376 = os.cpus().map(_0x4baa78 => {
      _0x4baa78.total = Object.keys(_0x4baa78.times).reduce((_0x124129, _0x54fdbe) => _0x124129 + _0x4baa78.times[_0x54fdbe], 0);
      return _0x4baa78;
    });
    const _0x52bb92 = _0x14b376.reduce((_0x371aab, _0x42f37d, _0x41ec3e, {
      length: _0x3f2c1a
    }) => {
      _0x371aab.total += _0x42f37d.total;
      _0x371aab.speed += _0x42f37d.speed / _0x3f2c1a;
      _0x371aab.times.user += _0x42f37d.times.user;
      _0x371aab.times.nice += _0x42f37d.times.nice;
      _0x371aab.times.sys += _0x42f37d.times.sys;
      _0x371aab.times.idle += _0x42f37d.times.idle;
      _0x371aab.times.irq += _0x42f37d.times.irq;
      return _0x371aab;
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
    timestampe = speed();
    latensie = speed() - timestampe;
    var _0x54755f = performance.now();
    var _0x366cd8 = performance.now();
    respon = ("*❲❒❳ " + Config.botname + " Infos Serveur ❲❒❳*\n\n  *❲❒❳ Temps d'exécution:* " + runtime(process.uptime()) + "\n  *❲❒❳ Vitesse:* " + latensie.toFixed(3) + "/" + (_0x366cd8 - _0x54755f).toFixed(3) + " ms\n  *❲❒❳ RAM:* " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n  *❲❒❳ Utilisation de la mémoire:*\n      " + Object.keys(_0x78d515).map((_0x4a444a, _0xf623b7, _0x26f7ee) => _0x4a444a.padEnd(Math.max(..._0x26f7ee.map(_0x470f51 => _0x470f51.length)), " ") + ": " + formatp(_0x78d515[_0x4a444a])).join("\n      ") + "\n\n" + (_0x14b376[0] ? "  *❲❒❳ Utilisation totale du CPU:*\n  *" + _0x14b376[0].model.trim() + " (" + _0x52bb92.speed + " MHZ)*\n      " + Object.keys(_0x52bb92.times).map(_0x1a945a => "-" + (_0x1a945a + "").padEnd(6) + ": " + (_0x52bb92.times[_0x1a945a] * 100 / _0x52bb92.total).toFixed(2) + "%").join("\n      ") + "\n\n  *❲❒❳ Utilisation des cœurs du CPU (" + _0x14b376.length + " cœurs CPU)*\n  " + _0x14b376.map((_0x1ada4d, _0x5999d4) => "*Cœur " + (_0x5999d4 + 1) + ": " + _0x1ada4d.model.trim() + " (" + _0x1ada4d.speed + " MHZ)*\n      " + Object.keys(_0x1ada4d.times).map(_0x2cc08d => "-" + (_0x2cc08d + "").padEnd(6) + ": " + (_0x1ada4d.times[_0x2cc08d] * 100 / _0x1ada4d.total).toFixed(2) + "%").join("\n      ")).join("\n\n") : "") + "\n").trim();
    return await _0x51c639.send(respon, {}, "", _0x51c639);
  } catch (_0x102a1d) {
    await _0x51c639.error(_0x102a1d + "\n\ncommand: cpu", _0x102a1d, "*_Pas de réponse côté serveur, Désolé !!_*");
  }
});
smd({
  pattern: "advt",
  alias: ["advertisement"],
  category: "ai",
  desc: "Faites de la publicité pour votre message en l'envoyant à une plage de numéros fournie.",
  use: "2420672746xx,Votre_texte_ici",
  fromMe: true,
  filename: __filename
}, async (_0x165087, _0x13462a) => {
  try {
    let _0x14810d = _0x13462a ? _0x13462a : _0x165087.reply_text;
    if (!_0x14810d) {
      return await _0x165087.reply("*Publicité pour votre message*\n*En l'envoyant à une plage de numéros donnée.*\n" + prefix + "advt 2420672746xx,Votre_texte_ici");
    }

    const _0x94ba67 = _0x14810d.indexOf(",");
    if (_0x94ba67 === -1) {
      return await _0x165087.send("*Format invalide. Veuillez fournir un numéro et un message séparés par une virgule.*");
    }

    let _0xd9b857 = "" + _0x14810d.slice(0, _0x94ba67).trim();
    let _0x321dea = _0x14810d.slice(_0x94ba67 + 1).trim() + "\n\n\n" + Config.caption;

    if (!_0xd9b857.includes("x")) {
      return _0x165087.send("*Vous n'avez pas ajouté 'x' dans le numéro.*\n*Exemple : " + prefix + "advt 2420672746xx,Votre_Message_ici*\n" + Config.caption);
    }

    await _0x165087.send("*Envoi du message à la plage de numéros donnée !*\n*Cela peut prendre un peu de temps, veuillez patienter.*");

    function _0x4affa2(_0x9f9b09, _0x557f5a) {
      return _0x9f9b09.split(_0x557f5a).length - 1;
    }

    var _0x43ad94 = _0xd9b857.split("x")[0];
    var _0x1d8f31 = _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")] || "";
    var _0x43415b = _0x4affa2(_0xd9b857, "x");
    var _0x4f926f;

    if (_0x43415b == 1) {
      _0x4f926f = 10;
    } else if (_0x43415b == 2) {
      _0x4f926f = 100;
    } else if (_0x43415b == 3) {
      _0x4f926f = 1000;
    } else if (_0x43415b > 3) {
      return await _0x165087.send("*Seulement 3 'x' sont autorisés dans le numéro.*");
    }

    let _0x1e111b = 0;
    let _0x5c0975 = "";
    var _0x5b9d27 = "";

    for (let _0x3e0552 = 0; _0x3e0552 < _0x4f926f; _0x3e0552++) {
      var _0x4d017c = await _0x165087.bot.onWhatsApp("" + _0x43ad94 + _0x3e0552 + _0x1d8f31 + "@s.whatsapp.net");
      if (_0x4d017c[0]) {
        _0x5b9d27 = _0x4d017c[0].jid;
        if (_0x5c0975.includes(_0x5b9d27)) {
          continue;
        }
        await sleep(1500);
        await _0x165087.bot.sendMessage(_0x5b9d27, {
          text: _0x321dea
        });
        _0x5c0975 += "," + _0x5b9d27;
        _0x1e111b++;
      }
    }

    return await _0x165087.send("*_Publicité pour votre message terminée._*\n\n*_Message envoyé avec succès à " + _0x1e111b + " chats_*\nDernier utilisateur : " + _0x5b9d27.split("@")[0] + "\nNombre recherché : " + _0x4f926f + " numéros recherchés\n\n\n" + Config.caption);
  } catch (_0xfcb50a) {
    await _0x165087.error(_0xfcb50a + "\n\nCommande : advt", _0xfcb50a, "*_Pas de réponse côté serveur, désolé !_*");
  }
});
const astro_patch_AnonyMsg = {};
let isAnnonyMsgAlive = "";
let cmdName = "rcg";

class AnonymousMsg {
  constructor() {
    this.id = "";
    this.sender = "";
    this.reciever = "";
    this.senderMsg = "";
    this.tellinfo = 0;
    this.howmanyreply = 0;
  }
}

smd({
  pattern: "anonymsg",
  alias: ["recognition", "anonychat"],
  desc: "Envoyez un message de manière anonyme.",
  category: "ai",
  use: "<Bonjour, Sasaki>",
  filename: __filename
}, async (_0x358984, _0x20693a, { smd: _0x12d243 }) => {
  try {
    let _0x32512b = _0x20693a ? _0x20693a : _0x358984.reply_text;
    if (!_0x32512b) {
      return await _0x358984.send(
        "*Veuillez fournir un numéro avec le message à envoyer anonymement.*\n*Exemple : " + (prefix + _0x12d243) + " 242067274660,votre_message*",
        {},
        "",
        _0x358984
      );
    }

    if (_0x358984.isCreator && _0x32512b === "info") {
      return await _0x358984.reply(
        isAnnonyMsgAlive === "" 
          ? "*Aucune conversation anonyme n'a encore été créée.*" 
          : "*Destinataires des messages anonymes :*\n_" + isAnnonyMsgAlive + "_"
      );
    }

    const _0x201d91 = _0x32512b.indexOf(",");
    if (_0x201d91 === -1) {
      return await _0x358984.reply("*Format invalide. Veuillez fournir un numéro et un message séparés par une virgule.*");
    }

    let _0x12e2ef = _0x32512b.slice(0, _0x201d91).trim() + "@s.whatsapp.net";
    let _0x5f656f = _0x32512b.slice(_0x201d91 + 1).trim();
    let _0x48975a = (await parsedJid(_0x12e2ef)) || [];

    if (_0x48975a[0]) {
      const { date: _0xbcd286, time: _0x47ad13 } = await getDateTime();
      const _0x3e1b1c = "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
      astro_patch_AnonyMsg[_0x3e1b1c] = new AnonymousMsg();

      let _0x3079e2 = astro_patch_AnonyMsg[_0x3e1b1c];
      _0x3079e2.id = _0x3e1b1c;
      _0x3079e2.sender = _0x358984.sender;
      _0x3079e2.reciever = _0x48975a[0];
      _0x3079e2.msgStatus = true;
      _0x3079e2.senderMsg = _0x358984;

      _0x5f656f =
        "*JINHUYK-MD_V2 • Message anonyme*\n\n" +
        "*ID du message :* " + _0x3079e2.id + "\n" +
        "*Date :* _" + _0xbcd286 + "_\n" +
        "*Heure :* _" + _0x47ad13 + "_\n\n" +
        "*Message :* " + _0x5f656f + "\n\n\n" +
        Config.caption;

      isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x3079e2.reciever;

      await _0x358984.bot.sendMessage(_0x3079e2.reciever, { text: _0x5f656f });
      return await _0x358984.reply("*_Message anonyme envoyé avec succès._*");
    } else {
      return await _0x358984.reply("*_Le numéro fourni n'est pas valide !_*");
    }
  } catch (_0x51ed58) {
    await _0x358984.error(
      _0x51ed58 + "\n\nCommande : " + _0x12d243, 
      _0x51ed58, 
      "*_Impossible d'envoyer un message anonyme pour le moment, désolé !_*"
    );
  }
});
smd({
  on: "text"
}, async _0x2acf30 => {
  try {
    if (_0x2acf30.quoted && isAnnonyMsgAlive.includes(_0x2acf30.sender) && _0x2acf30.text.length > 2) {
      const _0x2dfb59 = _0x2acf30.reply_text.split("\n");
      if (_0x2dfb59.length < 3) {
        return;
      }
      if (_0x2acf30.reply_text.includes("JINHUYK-MD_V2 • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2dfb59[0].includes("JINHUYK-MD_V2 • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2dfb59[2].includes("Msg_Id")) {
        let _0x1b0d01 = "" + _0x2dfb59[2].replace("*Msg_Id:* ", "").trim();
        let _0x2ecd2a = astro_patch_AnonyMsg[_0x1b0d01];
        if (!_0x2ecd2a) {
          return;
        }
        try {
          if (_0x2ecd2a) {
            let _0x13a11c = _0x2acf30.text.split(",")[0].trim();
            if (_0x13a11c.toLowerCase().startsWith("reply")) {
              _0x2ecd2a.howmanyreply += 1;
              const _0x5a2204 = _0x2acf30.text.indexOf(",");
              let _0x3f6b59 = "*JINHUYK-MD_V2 • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" + _0x2ecd2a.reciever.split("@")[0] + "_*\n*_Msg_Id: " + _0x2ecd2a.id + "_*\n\n*Message:* " + _0x2acf30.text.slice(_0x5a2204 + 1).trim() + "\n\n\n\n" + Config.caption;
              if (_0x2ecd2a.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x2acf30.sender, "");
              }
              await _0x2acf30.bot.sendMessage(_0x2ecd2a.sender, {
                text: _0x3f6b59,
                mentions: [_0x2ecd2a.reciever]
              }, {
                quoted: _0x2ecd2a.senderMsg
              });
              if (_0x2ecd2a.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + _0x2acf30.sender, "");
                delete astro_patch_AnonyMsg[_0x1b0d01];
              }
              return await _0x2acf30.reply("*_Votre message a été livré avec succès à l'utilisateur_* " + (_0x2ecd2a.howmanyreply == 1 ? "\n*Vous pouvez répondre une fois de plus.*" : ""));
            } else if (_0x2ecd2a.tellinfo === 0) {
              _0x2ecd2a.tellinfo = 1;
              let _0x362db6 = "*Ceci est un message anonyme*\n\n_Msg_Id: " + _0x2ecd2a.id + "_\n_Ce message a été envoyé par un chatbot_\n_L'utilisateur ne souhaite pas révéler son identité._\n\n\n*Si vous souhaitez répondre à cet utilisateur,*\n*Envoyez un message en répondant au message ci-dessus.*\n*Exemple de format :* reply, Tapez_votre_message_ici\n\n\n" + Config.caption;
              _0x2acf30.bot.sendMessage(_0x2ecd2a.reciever, {
                text: _0x362db6
              }, {
                quoted: _0x2acf30
              });
            } else if (_0x2ecd2a.tellinfo === 1) {
              _0x2ecd2a.tellinfo = 2;
              _0x2acf30.reply("*Veuillez suivre le format si vous souhaitez répondre au message*\n*Exemple : _reply, Tapez_votre_message_ici_*");
            }
          }
        } catch (_0x58832f) {
          console.log("Erreur : ", _0x58832f);
        }
      }
    }
  } catch {}
});
smd({
  pattern: "aitts",
  desc: "Conversion de texte en voix à l'aide d'Eleven Lab AI",
  category: "ia",
  use: "<Bonjour, éveillé de rang S+ JINHUYK>",
  filename: __filename
}, async (_0x1a01af, _0x1ac85a) => {
  await aitts(_0x1a01af, _0x1ac85a || _0x1a01af.reply_text);
});


