/* Copyright (C) 2024 SASAKI COMPAGNIE 
Licensed under the GPL-3.0 License;
Vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
Raganork MD - Sourav KL11
*/
const { Module } = require('../main');
const { chatBot } = require('./misc/misc');
const Config = require('../config');
const Heroku = require('heroku-client');
const got = require('got');
const { getString } = require('./misc/lang');
const Lang = getString('heroku');
const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " " + Lang.HEURE + ", " : " " + Lang.HEURES + ", ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " " + Lang.MINUTE + ", " : " " + Lang.MINUTES + ", ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " " + Lang.SECONDE : " " + Lang.SECONDES) : "";
    return hDisplay + mDisplay + sDisplay;
}

let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

Module({
    pattern: 'restart$',
    fromMe: true,
    dontAddCommandList: true
}, (async (message, match) => {
    await message.sendReply(Lang.MSG_REDEMARRAGE);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.sendMessage(error.message);
    });
}));

Module({
    pattern: 'shutdown$',
    fromMe: true,
    dontAddCommandList: true
}, (async (message, match) => {
    await heroku.get(baseURI + '/formation').then(async (formation) => {
        forID = formation[0].id;
        await message.sendReply(Lang.MSG_ARRET);
        await heroku.patch(baseURI + '/formation/' + forID, {
            body: {
                quantity: 0
            }
        });
    }).catch(async (err) => {
        await message.sendMessage(error.message);
    });
}));

Module({
    pattern: 'dyno$',
    fromMe: true,
    dontAddCommandList: true
}, (async (message, match) => {
    heroku.get('/account').then(async (account) => {
        let url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota";
        let headers = {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
            "Authorization": "Bearer " + Config.HEROKU.API_KEY,
            "Accept": "application/vnd.heroku+json; version=3.account-quotas"
        };
        await got(url, { headers: headers }).then(async (res) => {
            const resp = JSON.parse(res.body);
            total_quota = Math.floor(resp.account_quota);
            quota_used = Math.floor(resp.quota_used);
            percentage = Math.round((quota_used / total_quota) * 100);
            remaining = total_quota - quota_used;
            await message.sendReply(
                Lang.TOTAL_DYNO + ": ```{}```\n\n".format(secondsToHms(total_quota)) +
                Lang.UTILISE_DYNO + ": ```{}```\n".format(secondsToHms(quota_used)) +
                Lang.POURCENTAGE + ": ```{}```\n\n".format(percentage) +
                Lang.RESTANT_DYNO + ": ```{}```\n".format(secondsToHms(remaining))
            );
        }).catch(async (err) => {
            await message.sendMessage(err.message);
        });
    });
}));

Module({
    pattern: 'setvar ?(.*)',
    fromMe: true,
    desc: Lang.DESC_SETVAR
}, (async (message, match) => {
    if (match[1] === '' || !match[1].includes(":")) return await message.sendReply(Lang.CLE_VAL_MANQUANTE);

    if ((varKey = match[1].split(':')[0]) && (varValue = match[1].replace(match[1].split(':')[0] + ":", ""))) {
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async () => {
            await message.sendReply(Lang.SUCCESS_SET.format(varKey, varValue));
        });
    } else {
        await message.sendReply(Lang.INVALIDE);
    }
}));

Module({
    pattern: 'delvar ?(.*)',
    fromMe: true,
    desc: Lang.DESC_DELVAR
}, (async (message, match) => {
    if (match[1] === '') return await message.sendReply(Lang.NON_TROUVE);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        key = match[1].trim();
        for (let vr in vars) {
            if (key == vr) {
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        [key]: null
                    }
                });
                return await message.sendReply(Lang.SUPPRIMER_SUCCESS.format(key));
            }
        }
        await message.sendReply(Lang.NON_TROUVE);
    }).catch(async (error) => {
        await message.sendReply(error.message);
    });
}));

Module({
    pattern: 'getvar ?(.*)',
    fromMe: true,
    desc: Lang.DESC_GETVAR
}, (async (message, match) => {
    if (match[1] === '') return await message.sendReply(Lang.NON_TROUVE);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        for (let vr in vars) {
            if (match[1].trim() == vr) return await message.sendReply(vars[vr]);
        }
        await message.sendReply(Lang.NON_TROUVE);
    }).catch(async (error) => {
        await message.sendMessage(error.message);
    });
}));

Module({
    pattern: 'allvar',
    fromMe: true,
    desc: Lang.DESC_ALLVAR
}, async (message) => {
    let msg = Lang.TOUTES_VARS + "\n\n\n```";
    await heroku.get(baseURI + "/config-vars")
        .then(async (keys) => {
            for (let key in keys) {
                msg += `${key} : ${keys[key]}\n\n`;
            }
            return await message.sendReply(msg += '```');
        })
        .catch(async (error) => {
            await message.sendMessage(error.message);
        });
});

Module({
    pattern: 'chatbot ?(.*)',
    fromMe: true,
    desc: "Active ou désactive le chatbot",
    usage: '.chatbot on / off'
}, (async (message, match) => {
    var toggle = match[1] === 'off' ? 'off' : 'on';
    await heroku.patch(baseURI + '/config-vars', {
        body: {
            ['CHATBOT']: toggle
        }
    });
    if (toggle === 'on') await message.sendMessage("*Chatbot activé ✅*");
    if (toggle === 'off') await message.sendMessage("*Chatbot désactivé ✔*");
}));

Module({
    on: 'text',
    fromMe: false
}, (async (message) => {
    if (Config.CHATBOT === 'on') {
        await chatBot(message, Config.BOT_NAME);
    }
}));
