const { CommandInteractionOptionResolver } = require('discord.js');
const token = require("../token.json");
const TrelloNodeAPI = require('trello-node-api');
const trello = new TrelloNodeAPI();
trello.setApiKey(token.apiKey);
trello.setOauthToken(token.oauthToken);

module.exports.run = async (bot, message, args) => {
    let messageArray = message.content.split(" ");
    let store;
    //let cmd = messageArray[0];
    //let args = messageArray.slice(1);
    let cardName = messageArray[2] + 'x ' + messageArray.slice(3).join(' ');
    console.log(cardName);
    if (messageArray[1].toLowerCase() === "vb") {
        store = '61697d030ae3c75a9a4c1cf0'
    } else if (messageArray[1].toLowerCase() === "pt") {
        store = '61697d01d1c4463bc0fa066c';    
    }
    //store = '61699c2e07dd8237bfe55667';

    var data = {
        name: cardName,
        idList: store, //REQUIRED
        /*desc: 'Card description',
        pos: 'top',
        
        due: null,
        dueComplete: false,
        idMembers: ['MEMBER_ID', 'MEMBER_ID', 'MEMBER_ID'],
        idLabels: ['LABEL_ID', 'LABEL_ID', 'LABEL_ID'],
        urlSource: 'https://example.com',
        fileSource: 'file',
        idCardSource: 'CARD_ID',
        keepFromSource: 'attachments,checklists,comments,due,labels,members,stickers'*/
    };
    
    trello.card.create(data).then(function (response) {
        //console.log('response ', response);
    }).catch(function (error) {
        console.log('error', error);
    });
    //message.channel.send('T!addcard 61699c2e07dd8237bfe55667 test');
}

module.exports.help = {
    name:"inv"
}
