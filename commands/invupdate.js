const token = require("../token.json");
const { MessageEmbed } = require('discord.js');
var Trello = require("trello");
var trello = new Trello(token.apiKey, token.oauthToken);


module.exports.run = async (bot, message, args) => {

    let messageArray = message.content.split(" ");
    if (messageArray.length === 1) {
        message.channel.send('Please use the following syntax:\n .invupdate store ".invudpate vb" ');
        return;
    }
    let storeName = messageArray[1].toLowerCase();
    let invMessages = bot.channels.cache.find(c => c.name === "inv-" + storeName).messages;
    let fetched;
    do {
      fetched = await invMessages.fetch({limit: 10})
      if (fetched.size >= 2 ) invMessages.channel.bulkDelete(fetched);
    }
    while(fetched.size >= 2);

    //let cmd = messageArray[0];
    //let args = messageArray.slice(1);
    //let cardName = messageArray[2] + 'x ' + messageArray.slice(3).join(' ');
    let storeID;  
    if ( storeName === "vb") {
        storeID = '61697d030ae3c75a9a4c1cf0'
    } else if (storeName === "pt") {
        storeID = '61697d01d1c4463bc0fa066c';    
    }
    //storeID = '61699c2e07dd8237bfe55667';
    trello.getCardsOnList(storeID, function (error, trellocards){
        trellocards.forEach(card => {
            const Embed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle(card.name)
	        .setURL(card.url)
	        //.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
	        //.setDescription('Some description here')
	        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	        invMessages.channel.send({embeds: [Embed]}).then(embedMessage => {
                card.labels.forEach(label => {
                    if (label.name === 'eBay') {
                        const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'ebay');
                        embedMessage.react(reactionEmoji);
                    } else if (label.name === 'Ordered') {
                        embedMessage.react('📦');
                    } else if (label.name === 'Inventory') {
                        embedMessage.react('ℹ️');
                    }
                });
            });
        });
    });
    
}



module.exports.help = {
    name:"invupdate"
}
