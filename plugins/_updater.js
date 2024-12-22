const DB = require("../lib/scraper");
const { Config, smd } = require("../lib");
const simpleGit = require("simple-git");
const git = simpleGit();

try {
  const Heroku = require("heroku-client");

  async function updateHerokuApp() {
    try {
      const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
      await git.fetch();
      const commits = await git.log(["main..origin/main"]);
      if (commits.total === 0) {
        return `${Config.botname} EST À JOUR AVEC LA DERNIÈRE VERSION`;
      } else {
        console.log("Mise à jour détectée, tentative de mise à jour du bot !");
        const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
        const gitUrl = app.git_url.replace(
          "https://",
          `https://api:${process.env.HEROKU_API_KEY}@`
        );
        try {
          await git.addRemote("heroku", gitUrl);
        } catch (e) {
          console.log("Erreur lors de l'ajout du remote Heroku", e);
        }
        await git.push("heroku", "main");
        return "Bot mis à jour. Redémarrage en cours.";
      }
    } catch (e) {
      console.log(e);
      return "Impossible de mettre à jour, demande refusée !";
    }
  }

  smd(
    {
      pattern: "checkupdate",
      desc: "Affiche les commits rafraîchis du dépôt.",
      category: "tools",
      fromMe: true,
      react: "🍂",
      filename: __filename,
      use: process.env.HEROKU_API_KEY ? "[ start ]" : "",
    },
    async (citel, text) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0) {
          return await citel.reply(
            `*JINHUYK-MD EST À JOUR AVEC LES DERNIÈRES MISES À JOUR, PATCHES ET CORRECTIONS*`
          );
        }
        let update = await DB.sync();
        await citel.bot.sendMessage(
          citel.chat,
          { text: update.replace(/SuhailTechIMd/, "Kg Tech") },
          { quoted: citel }
        );
        if (
          text == "start" &&
          process.env.HEROKU_APP_NAME &&
          process.env.HEROKU_API_KEY
        ) {
          citel.reply("Construction en cours...");
          const updateMessage = await updateHerokuApp();
          return await citel.reply(updateMessage);
        }
      } catch (e) {
        citel.error(`${e}\n\nCommande: update`, e, "ERREUR !");
      }
    }
  );

  smd(
    {
      pattern: "update",
      desc: process.env.HEROKU_API_KEY
        ? "*MISE À JOUR RÉUSSIE*"
        : "VOTRE DÉPLOIEMENT A ÉTÉ MISE À JOUR",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (citel) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(`*${Config.VERSION} EST EN COURS DE MISE À JOUR*`);
        let update = await DB.sync();
        let text = ` 
*MISE À JOUR EN COURS*
\t${update}*`;
        await citel.bot.sendMessage(citel.jid, { text });
        await require("simple-git")().reset("hard", ["HEAD"]);
        await require("simple-git")().pull();
        await citel.reply(
          process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
            ? "*`BOT MIS À JOUR`*\n*REDÉMARRER VOTRE BOT POUR QUE LA MISE À JOUR PRENNE EFFET*"
            : "```*Mise à jour réussie. Vous avez maintenant la dernière version installée !*"
        );
      } catch (e) {
        citel.error(`${e}\n\nCommande: updatenow`, e, "ERREUR !");
      }
    }
  );

  if (process.env.HEROKU_API_KEY) {
    console.log("HEROKU : vérification de la mise à jour automatique !");
    updateHerokuApp();
  }
} catch (e) {
  console.log("Erreur lors de l'exécution du script", e);
}
