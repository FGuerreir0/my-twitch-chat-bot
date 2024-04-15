//https://twitchtokengenerator.com/

const oneLinerJoke = require('one-liner-joke');
const { translate } = require('bing-translate-api');
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

function firstModMesg(modInfo, channel) {
  todayModArray.push(modInfo.username);
  switch(modInfo.username.toLowerCase()) {
    case 'thehasputimm':
      client.say(channel, `Cuidado o @${modInfo.username} está no chat! Ainda joga LOL e é rank Silver 2! NotLikeThis `);
      break;
    case 'tioeman':
      client.say(channel, `O melhor camonionista pimba da Twitch @${modInfo.username} chegou! Vamos meter a cassete do Quim Barreiros para ele dançar! DinoDance`);
      break;
    case 'adanielapereira':
      client.say(channel, `Cuidado a @${modInfo.username} está a praticar para dominar o mundo com o SIMS 4, até tem todas as expansões! EarthDay PowerUpR`)
    default:
      break;
  }
}


client.on('message', async (channel, tags, message, self) => {
  let currentdate = fn.getcurrentdate(); 

  if  (defaultdate != currentdate && tags.mod && !todayModArray.find(element => element === tags.username)) {
      firstModMesg(tags, channel)
  }


  if(tags['first-msg']) {
    client.say(channel, `Chat paguem uma cerveja ao @${tags.username}! Primeira mensagem na stream! Bem-vindo HSCheers HSCheers`);
  }

  // Ignore echoed messages.
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

  switch(command.toLowerCase()) {
    case 'hello':
    case 'hey':
    case 'ola':
      client.say(channel, `Olá @${tags.username}! Bem-vindo, junta-te a nós e bebe um copo! HSCheers`);
      break;
    case 'specs':
      client.say(channel, `Processador: AMD Ryzen 7 3700x | Memória Ram: 64GB | Placa Gráfica: NVIDIA GeForce RTX 3060 | MotherBoard: B450 Aorus Elite V2 | Fonte: Azza PSAZ-650W`);
      break;
    case 'website':
      client.say(channel, `https://fabioguerreiro.pt`);
      break;
    case 'social':
      client.say(channel, `Instagram: https://www.instagram.com/fguerreir0 | LinkedIn: https://www.linkedin.com/in/fabiofsguerreiro | GitHub: https://github.com/FGuerreir0`);
      break;
    case 'comandos':
      client.say(channel, `!ola, !specs, !social, !website, !piada`);
      break;
    case 'piada':
      let joke = fn.getJoke(oneLinerJoke, translate);
      if(joke) {
        //translate(joke, null, 'pt').then(res => {
          //let translatedJoke = res.translation;
          let translatedJoke = joke;
          if(translatedJoke.includes('(NAME)')){
            translatedJoke = translatedJoke.replace('(NAME)', tags.username);
          }
          client.say(channel, translatedJoke);
        //}).catch(err => {
          //console.error(err);
          //reject(err);
        //});
        
      }
      //case 'pokemon':
      // !pokemon charizard
      //client.say(channel, `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`);

    default:
      break;
  }
});