const config = require("./config.json");
const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
//const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES",  "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES",  "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"], partials: ["REACTION", "MESSAGE", "USER"] });
bot.commands = new Discord.Collection();




const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    bot.commands.set(props.help.name, props)
}

//define events we are interested in.
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

//fix for caching messages 
/*
bot.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = bot.users.cache.get(data.user_id); //.users.get(data.user_id);
	//const channel = bot.channels.get(data.channel_id) || await user.createDM();
	const channel = bot.channels.cache.get(data.channel_id) || await user.createDM();

	//if (channel.messages.has(data.message_id)) return;
	if (channel.cache.get(data.message_id)) return;

	//const message = await channel.fetchMessage(data.message_id);
	const message = await channel.messages.fetch();
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	bot.emit(events[event.t], reaction, user);
});
*/

//When a member join add a role called Member to them and welcome them in a channel welcome
bot.on('guildMemberAdd', member => {
    //Log the newly joined member to console
    console.log('User' + member.user.tag + ' has joined the server!');

    //Find a channel named welcome and send a Welcome message
    bot.channels.cache.find(c => c.name === "general").send('Welcome '+ member.user.username)

    //Find a role called Member
    //let role = member.guild.roles.cache.find(r => r.name === 'Member');

    //After 10 seconds add the member role to new user
    //setTimeout(function(){
    //    member.roles.add(role);
    //}, 10000);
});

//Playing Message
bot.on("ready", async () => {
    //Log Bot's username and the amount of servers its in to console
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

    //Set the Presence of the bot user
    bot.user.setActivity("My Code", {type: "PLAYING"});
});

//Command Manager
bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //get prefix from config and prepare message so it can be read as a command
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if(!cmd.startsWith(config.prefix)) return;

    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    message.delete();
});

bot.on('messageReactionAdd', (reaction, user) => {
/*    console.log(reaction)
    if (reaction.me) return;
    if (reaction === '✅') {
        console.log("checkbox checkmark")
    //    reaction.message.delete();
    }
*/
	
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

	// Now the message has been cached and is fully available
	//console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
	
	if (reaction.me) return;
	    if (reaction === '✅') {
		console.log("checkbox checkmark")
	    }
});

//Token needed in token.json
bot.login(token.token);
