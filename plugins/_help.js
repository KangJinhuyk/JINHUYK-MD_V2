const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  prefix,
  smd,
  commands,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

smd(
  {
    pattern: "menus",
    type: "MENU list",
    info: "user",
    dontAddCommandList: true,
    react: "📜",
  },
  async (message) => {
    try {
      let menuMessage = ` 
➮ʀᴜɴᴛɪᴍᴇ - ${runtime(process.uptime())} 
➮ᴅᴀᴛᴇ - ${message.date} 
➮ɴᴏᴡ ᴛɪᴍᴇ - ${message.time} 
➮Fᴏᴜɴᴅᴇʀ- *Kang jinhuyk*
➮Oᴡɴᴇʀ - ${Config.ownername} 
➮Nᴜᴍ - ${owner.split(",")[0]} 
➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())} 
      \n *JINHUYK-MD_V2 SIMPLE WHATSAPP BOT*\n\n ${readmore} 
╭──❰༆𝐀𝐥𝐥 𝐌𝐞𝐧𝐮༆❱ 
│🤖 Lɪꜱᴛ 
│🤖 Cᴀᴛᴇɢᴏʀʏ 
│🤖 Hᴇʟᴘ 
│🤖 Aʟɪᴠᴇ 
│🤖 Uᴘᴛɪᴍᴇ 
│🤖 Wᴇᴀᴛʜᴇʀ 
│🤖 Lɪɴᴋ 
│🤖 Cᴘᴜ 
│🤖 Rᴇᴘᴏꜱɪᴛᴏʀʏ 
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: menuMessage });
    } catch (error) {
      await message.error(error + "\nCommand:menus", error);
    }
  }
);

// Commande: Set Custom Command
astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "Pour définir une commande personnalisée",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, query, { Void }) => {
    try {
      if (!query) {
        return await message.send(
          "*_Veuillez fournir un nom de commande en répondant par un Sticker bro_*"
        );
      }

      let queryParts = query.split(",");
      let newCommand, originalCommand;
      let isSticker = false;

      if (message.quoted) {
        let quotedType = message.quoted.mtype;
        if (quotedType === "stickerMessage" && query) {
          isSticker = true;
          newCommand = query.split(" ")[0];
          originalCommand = "sticker-" + message.quoted.msg.fileSha256;
        }
      }

      if (!isSticker && queryParts.length > 1) {
        originalCommand = queryParts[0].trim().toLowerCase();
        newCommand = queryParts[1].trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "*_Euh cher, donnez la commande avec un nouveau nom_*\n*Exemple: _.setcmd Nouveau_Nom, Cmd_Nom_*"
        );
      }

      if (newCommand.length < 1) {
        return await message.reply(
          "*_Euh, veuillez fournir un nouveau nom de commande d'abord_*"
        );
      }

      if (global.setCmdAlias[newCommand]) {
        return await message.send(
          `*_"${isSticker ? "Sticker donné" : newCommand}" déjà défini pour "${
            global.setCmdAlias[newCommand]
          }" Cmd, veuillez essayer un autre ${isSticker ? "Sticker" : "Nom"}_*`
        );
      }

      const foundCommand =
        astro_patch.commands.find((cmd) => cmd.pattern === originalCommand) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(originalCommand)
        );

      if (foundCommand) {
        global.setCmdAlias[newCommand] = foundCommand.pattern;
        return await message.send(
          `*_Cmd "${global.setCmdAlias[newCommand]}" défini avec succès pour "${
            isSticker ? "Sticker" : newCommand
          }"._*\n*_Tous ces noms sont réinitialisés si le bot redémarre_*`
        );
      } else {
        return await message.send(
          `*_Commande fournie (${originalCommand}) introuvable dans les commandes du bot. Veuillez fournir un nom de commande valide_*`
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:setcmd", error);
    }
  }
);

// Commande: Supprimer une commande personnalisée
astro_patch.cmd(
  {
    pattern: "delcmd",
    desc: "Pour supprimer une commande personnalisée",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, query, { Void }) => {
    try {
      let commandName = query ? query.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;

      if (message.quoted) {
        if (message.quoted.mtype === "stickerMessage") {
          isSticker = true;
          commandName = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!query) {
          return await message.send(
            "*_Veuillez répondre à un Sticker qui a été défini pour une commande bro_*"
          );
        }
      } else if (!query) {
        return await message.send(
          "*_Euh cher, fournissez le nom qui a été défini pour une commande_*\n*Exemple: _.delcmd Cmd_Nom_*"
        );
      }

      if (global.setCmdAlias[commandName]) {
        await message.send(
          `*_"${
            isSticker ? "Sticker donné" : commandName
          }" supprimé avec succès pour "${
            global.setCmdAlias[commandName]
          }" commande_*`
        );
        delete global.setCmdAlias[commandName];
        return;
      } else {
        return await message.send(
          `*_"${
            isSticker ? "Sticker donné" : commandName
          }" n'est pas défini pour une commande._*\n *_Veuillez fournir un ${isSticker ? "Sticker" : "nom de commande"} valide à supprimer_*`
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:delcmd", error);
    }
  }
);

// Commande: Ping
astro_patch.smd(
  {
    pattern: "ping",
    desc: "Pour vérifier le ping",
    category: "misc",
    filename: __filename,
    react: "📈",
  },
  async (message) => {
    var startTime = new Date().getTime();
    const { key } = await message.reply("*JINHUYK-MD_V2 Ping!!!*");
    var endTime = new Date().getTime();
    return await message.send(
      `*Pong*\n *${endTime - startTime} ms*`,
      {
        edit: key,
      },
      "",
      message
    );
  }
);

// Commande: Uptime
astro_patch.cmd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Affiche le temps d'exécution/uptime du bot.",
    category: "misc",
    filename: __filename,
    react: "📉",
  },
  async (message) => {
    try {
      message.reply(
        `*_Uptime de JINHUYK-MD_V2 : ${runtime(process.uptime())}_*`
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : uptime", error, false);
    }
  }
);

// Commande: Liste Menu
astro_patch.cmd(
  {
    pattern: "list",
    desc: "menu de liste",
    category: "user",
    react: "🥀",
  },
  async (message) => {
    try {
      const { commands } = require("../lib");
      let listMessage = `\n  
╭━━〘 * ${Config.botname} * 〙    
┃ 🎗 Préfixe: ${Config.HANDLERS}
┃ 🎗 Propriétaire: ${Config.ownername}
┃ 🎗 Commandes: ${commands.length}
┃ 🎗 Uptime: ${runtime(process.uptime())}
┃ 🎗 Mémoire: ${formatp(os.totalmem() - os.freemem())}
╰━━━━━━━━━━━━━━⊷\n`;

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern === undefined) {
          continue;
        }
        listMessage += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
        listMessage += `  ${fancytext(commands[i].desc, 1)}\n`;
      }

      return await message.sendUi(message.chat, {
        caption: listMessage + Config.caption,
      });
    } catch (error) {
      await message.error(error + "\nCommand:list", error);
    }
  }
);

// Commande: Propriétaire
astro_patch.smd(
  {
    pattern: "owner",
    desc: "Pour afficher les informations du propriétaire",
    category: "owner",
    filename: __filename,
    react: "🪪",
  },
  async (message) => {
    try {
      const vcard =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        Config.ownername +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        global.owner?.split(",")[0] +
        ":+" +
        global.owner?.split(",")[0] +
        "\nEND:VCARD";

      let contactMessage = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl:
              "https://wa.me/+" +
              global.owner?.split(",")[0] +
              "?text=Hii+" +
              Config.ownername,
          },
        },
      };

      return await message.sendMessage(message.jid, contactMessage, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\nCommand:owner", error);
    }
  }
);

// Commande: Traduction
astro_patch.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "user",
    filename: __filename,
    use: "< texte >",
    desc: "Traduire le texte donné dans la langue souhaitée.",
    react: "🎙️",
  },
  async (message, query) => {
    try {
      let targetLanguage = query ? query.split(" ")[0].toLowerCase() : "en";
      if (!message.reply_text) {
        var textToTranslate =
          query.replace(targetLanguage, "")?.trim() || false;
      } else {
        var textToTranslate = message.reply_text;
      }

      if (!textToTranslate) {
        return await message.reply(
          `*Veuillez fournir le texte à traduire. Exemple: ${prefix}trt en Qui es-tu*`
        );
      }

      var translation = await translatte(textToTranslate, {
        from: "auto",
        to: targetLanguage,
      });

      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: trt", error);
    }
  }
);

// Commande: Fichier
const readDirectory = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject("Erreur de lecture du répertoire");
      } else {
        resolve(files);
      }
    });
  });
};
astro_patch.cmd(
  {
    pattern: "file",
    desc: "Pour obtenir le nom exact et l'emplacement de la commande dans le dépôt, afin que l'utilisateur puisse l'éditer.",
    category: "user",
    fromMe: true,
    filename: __filename,
  },
  async (message, query) => {
    try {
      if (!query) {
        return message.reply("*Veuillez fournir une commande ou un répertoire*");
      }

    if (query.startsWith(".")) {
  let result = "*------------- GESTIONNAIRE DE FICHIERS -2------------*\n";
  try {
    const files = await readDirectory(query);
    files.forEach((file) => {
      result += file + "\n";
    });
    await message.reply(result.toString());
  } catch (error) {
    message.reply(error);
  }
  return;
}

const { commands } = require("../lib");
let output = [];
let command = query.split(" ")[0].toLowerCase().trim();
let commandInfo =
  commands.find((cmd) => cmd.pattern === command) ||
  commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

if (!commandInfo) {
  return await message.reply("*❌Commande introuvable.*");
}

output.push("*🍁Commande:* " + commandInfo.pattern);
if (commandInfo.category) {
  output.push("*🧩Type:* " + commandInfo.category);
}
if (commandInfo.alias && commandInfo.alias[0]) {
  output.push("*🧩Alias:* " + commandInfo.alias.join(", "));
}
if (commandInfo.desc) {
  output.push("*✨Description:* " + commandInfo.desc);
}
if (commandInfo.use) {
  output.push(
    "*〽️Usage:*\n ```" +
      prefix +
      commandInfo.pattern +
      " " +
      commandInfo.use +
      "```"
  );
}
if (commandInfo.usage) {
  output.push("*〽️Usage:*\n ```" + commandInfo.usage + "```");
}
if (commandInfo.filename) {
  output.push("*✨Nom du fichier:* " + commandInfo.filename);
}
try {
  if (
    query.includes("function") &&
    commandInfo.function &&
    message.isAsta &&
    commandInfo.pattern !== "file"
  ) {
    output.push("*🧩Fonction:* " + commandInfo.function.toString());
  }
} catch {}
await message.reply(output.join("\n"));
} catch (error) {
  await message.error(error + "\nCommande:file", error);
}
}
);

astro_patch.cmd(
  {
    pattern: "eval",
    alias: ["$"],
    category: "tools",
    filename: __filename,
    fromMe: true,
    desc: "Exécute du code JavaScript sur le serveur Node.js.",
    use: "< code à exécuter >",
    dontAddCommandList: true,
  },
  async (message, query, { isCreator, cmdName, Void }) => {
    try {
      if (!query) {
        return message.reply("*Fournissez une requête à exécuter*");
      }
      let result = eval("const a = async()=>{\n" + query + "\n}\na()");
      if (typeof result === "object") {
        await message.reply(JSON.stringify(result));
      } else {
        await message.reply(result.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  }
);

astro_patch.cmd(
  {
    pattern: "shell",
    category: "tools",
    filename: __filename,
    fromMe: true,
    desc: "Exécute une commande dans le shell du serveur (par exemple, Heroku).",
    use: "<commandes shell | ls, cd >",
    dontAddCommandList: true,
  },
  async (message, query) => {
    try {
      if (!message.isCreator) {
        return message.reply(tlang().owner);
      }
      if (!query) {
        return message.reply("*Veuillez fournir une commande à exécuter*");
      }
      exec(query, (err, stdout) => {
        if (err) {
          return message.reply("----" + tlang().title + "----\n\n" + err);
        }
        if (stdout) {
          return message.reply("----" + tlang().title + "----\n\n" + stdout);
        }
      });
    } catch (error) {
      await message.error(error + "\n\ncommande shell", error);
    }
  }
);
