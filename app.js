//https://twitchtokengenerator.com/

const oneLinerJoke = require('one-liner-joke');
const fn = require('./util/fn.js');
require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_NICK,
		password: process.env.TWITCH_BOT_OAUTH_TOKEN
	},
	channels: [ 'fguerreir0' ]
});

let defaultdate = 20240101;
let todayModArray = [];

client.connect();

const modMessages = {
  'thehasputimm': `Cuidado o @{mod} está no chat! Ainda joga LOL e é rank Bronze 2! NotLikeThis`,
  'tioeman': `O melhor camionista pimba da Twitch @{mod} chegou! Vamos meter a cassete do Quim Barreiros para ele dançar! DinoDance`,
  'adanielapereira': `Cuidado a @{mod} está a praticar para dominar o mundo com o SIMS 4, até tem todas as expansões! EarthDay PowerUpR`
};

function firstModMesg(modInfo, channel) {
  todayModArray.push(modInfo.username);
  let message = modMessages[modInfo.username.toLowerCase()];
  if (message) {
    client.say(channel, message.replace('{mod}', modInfo.username));
  }
}

client.on('connected', async () => {
  setInterval(()=>{
    client.say('#fguerreir0', `Olá malta, obrigado por estarem a assistir aproveitem e façam follow e !comandos para mais informações! HSCheers`)
  }, 60 * 60 * 1000)
})

client.on('message', async (channel, tags, message, self) => {
  const commands = {
    'ola': (channel, tags) => client.say(channel, `Olá @${tags.username}! Bem-vindo, junta-te a nós e bebe um copo! HSCheers`),
    'specs': (channel) => client.say(channel, `Processador: AMD Ryzen 7 3700x | Memória Ram: 64GB | Placa Gráfica: NVIDIA GeForce RTX 3060 | MotherBoard: B450 Aorus Elite V2 | Fonte: Azza PSAZ-650W`),
    'website': (channel) => client.say(channel, `https://fabioguerreiro.pt`),
    'social': (channel) => client.say(channel, `Instagram: https://www.instagram.com/fguerreir0 | LinkedIn: https://www.linkedin.com/in/fabiofsguerreiro | GitHub: https://github.com/FGuerreir0`),
    'comandos': (channel) => client.say(channel, `!ola, !specs, !social, !website, !piada`),
    'piada': async (channel, tags) => {
      let joke = fn.getJoke(oneLinerJoke);
      if (joke) {
        let jokeToSend = joke.includes('(NAME)') ? joke.replace('(NAME)', tags.username) : joke;
        client.say(channel, jokeToSend);
      }
    }
  };
  
  let currentdate = fn.getcurrentdate(); 
  
  if  (defaultdate != currentdate && tags.mod && !todayModArray.find(element => element === tags.username)) {
      firstModMesg(tags, channel)
  }


  if(tags['first-msg']) {
    client.say(channel, `Chat paguem uma cerveja ao @${tags.username}! Primeira mensagem na stream! Bem-vindo HSCheers HSCheers`);
  }

	if(self || !message.startsWith('!')) return;
	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

  if (commands[command]) {
    commands[command](channel, tags);
  }
});