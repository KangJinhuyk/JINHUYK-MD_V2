const { plugins, smd, Config } = require("../lib");
let s_ser = true;

// Commande de redémarrage
smd(
 {
   cmdname: "restart",
   info: "Redémarre le bot",
   type: "tools",
   fromMe: s_ser,
   filename: __filename,
 },
 async (cld) => {
   const { exec } = require("child_process");
   cld.reply("Redémarrage en cours...");
   exec("pm2 restart all", (error, stdout, stderr) => {
     if (error) {
       return cld.reply(`Erreur lors du redémarrage : ${error.message}`);
     }
     if (stderr) {
       return cld.reply(`Erreur : ${stderr}`);
     }
     cld.reply("Bot redémarré avec succès !");
   });
 }
);

// Commande d'arrêt
smd(
  {
    cmdname: "shutdown",
    info: "Éteint le bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (cld) => {
    const { exec } = require("child_process");
    cld.reply("Arrêt en cours...");
    exec("pm2 stop all", (error, stdout, stderr) => {
      if (error) {
        return cld.reply(`Erreur lors de l'arrêt : ${error.message}`);
      }
      if (stderr) {
        return cld.reply(`Erreur : ${stderr}`);
      }
      cld.reply("Bot arrêté avec succès !");
    });
  }
);

// Commande pour afficher les plugins installés
smd(
 {
   cmdname: "plugins",
   alias: ["plugin"],
   type: "owner",
   info: "Affiche la liste de tous les modules installés",
   fromMe: s_ser,
   filename: __filename,
   use: "<nom>",
 },
 async (cld, pluginName) => {
   try {
     let installedPlugins = await plugins(cld, "plugins", pluginName);
     return await cld.send(
       !installedPlugins
         ? "*Aucun plugin n'est installé dans " + Config.botname + "*"
         : !pluginName
         ? "*Voici tous les modules installés :-*\n\n" + installedPlugins
         : installedPlugins
     );
   } catch (err) {
     cld.error(`Erreur : ${err} \n\ncmdName plugins\n`);
     cld.reply("*Erreur lors de la récupération des plugins.*");
   }
 }
);

// Commande de suppression de plugin
smd(
 {
   pattern: "uninstall",
   alias: ["remove"],
   type: "owner",
   info: "Supprime un module externe.",
   fromMe: s_ser,
   filename: __filename,
   use: "<nom du plugin>",
 },
 async (cld, pluginName) => {
   if (!pluginName) {
     return await cld.reply("*Veuillez fournir le nom du plugin à supprimer*");
   }
   if (pluginName === "alls") {
     return await cld.reply(await plugins("remove", "all", __dirname));
   }
   try {
     await cld.send(
       await plugins(cld, "remove", pluginName, __dirname),
       {},
       "",
       cld
     );
   } catch (error) {
     cld.reply("*Erreur lors de la suppression du plugin.*");
     cld.error(`Erreur : ${error} \n\ncmdName uninstall\n`);
   }
 }
);

// Commande d'installation de plugin
smd(
 {
   cmdname: "install",
   type: "owner",
   info: "Installe un module externe.",
   fromMe: s_ser,
   filename: __filename,
   use: "<URL du plugin>",
 },
 async (cld, pluginUrl) => {
   let url = pluginUrl
     ? pluginUrl
     : cld.quoted
     ? cld.quoted.text
     : "";
   if (!url || !url.toLowerCase().includes("https")) {
     return await cld.send("*Veuillez fournir une URL valide pour le plugin (avec https).*");
   }
   try {
     await cld.reply(await plugins(cld, "install", url, __dirname));
   } catch (error) {
     cld.reply("*Erreur lors de l'installation du plugin.*");
     cld.error(`Erreur : ${error} \n\ncmdName install\n`);
   }
 }
);
