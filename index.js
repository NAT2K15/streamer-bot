const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('./config.json');
const chalk = require('chalk')
client.once('ready', () => {
    console.log(chalk.red `[MADE BY NAT2K15] ` + chalk.white `${client.user.tag} is now online!`)
    setInterval(() => client.user.setActivity(`streamers`, { type: "WATCHING" }), 10000)
})

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if (!newPresence.activities) return;
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            if (newPresence.member.roles.cache.some(r => config.whitelisted_role.includes(r.id))) {
                let chan = newPresence.guild.channels.cache.get(config.announce_channel);
                if (!chan) return console.log(chalk.red `[ERROR] ` + chalk.white `I was not able to find the announcements channel`)
                if (config.ping_everyone) {
                    chan.send(`@everyone`)
                }
                let e1 = new MessageEmbed()
                    .setColor(config.embed.color)
                    .setFooter(config.embed.footer)
                    .setTimestamp()
                    .setTitle(`${newPresence.user.tag} is live!`)
                    .setDescription(`A user in this guild is now live go check them out!`)
                    .addField(`Link`, `[CLICK HERE](${activity.url})`)
                chan.send(e1).catch(e => {
                    if (e) console.log(chalk.red `[ERROR] ` + `I was not able to send a message in the announcements channel`)
                })
            }
        };
    });
});

client.login(config.token);