module.exports.run = async (bot, message, args) => {
    
        let fetched;
        do {
          fetched = await bot.channels.cache.find(c => c.name === "bot-testing").messages.fetch({limit: 10})
          message.channel.bulkDelete(fetched);
        }
        while(fetched.size >= 2);
      
}

module.exports.help = {
    name:"clear"
}
