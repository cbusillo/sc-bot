const token = require("../token.json");
var Trello = require("trello");
var trello = new Trello(token.apiKey, token.oauthToken);


module.exports.run = async (bot, message, args) => {
    let messageArray = message.content.split(" ");
    if (messageArray.length === 1) {
        message.channel.send('Please use the following syntax:\n .inv store qty request ".inv vb 5 pumpkins." ');
        return;
    }
    let storeID;
    //let cmd = messageArray[0];
    //let args = messageArray.slice(1);
    //let cardName = messageArray[2] + 'x ' + messageArray.slice(3).join(' ');
    
    if (messageArray[1].toLowerCase() === "vb") {
        storeID = '61697d030ae3c75a9a4c1cf0'
    } else if (messageArray[1].toLowerCase() === "pt") {
        storeID = '61697d01d1c4463bc0fa066c';    
    }
    //storeID = '61699c2e07dd8237bfe55667';
    console.log("hit");
    trello.getCardsOnList(storeID, function (error, trellocards){
        console.log(trellocards[0]);
    });

    
    /*addCard(cardName, cardName + 'desc', storeID,
    function (error, trelloCard) {
        if (error) {
            console.log('Could not add card:', error);
        }
    });*/
}

module.exports.help = {
    name:"invupdate"
}
