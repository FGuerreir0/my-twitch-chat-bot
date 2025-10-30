//https://twitchtokengenerator.com/

const oneLinerJoke = require('one-liner-joke');
const fn = require('./util/fn.js');
const say = require('say');
const tmi = require('tmi.js');
const express = require('express');
require('dotenv').config();

let defaultdate = 20240101;
let todayModArray = [];
const modMessages = {
  'thehasputimm': `Cuidado o @{mod} está no chat! Ainda joga LOL e é rank Bronze 2! NotLikeThis`,
  'tioeman': `O melhor camionista pimba da Twitch @{mod} chegou! Vamos meter a cassete do Quim Barreiros para ele dançar! DinoDance`,
  'adanielapereira': `Cuidado a @{mod} está a praticar para dominar o mundo com o SIMS 4, até tem todas as expansões! EarthDay PowerUpR`
};
const horario = ["Segunda, Quarta e Sexta: 21H", "Fim-de-semana: 15H"]
var sendEngagingMessage = true
let lotteryNumber = Math.floor(Math.random() * 1000) + 1;

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
	channels: [ process.env.TWITCH_BOT_STREAMER ]
});

client.connect();

function firstModMesg(modInfo, channel) {
  todayModArray.push(modInfo.username);
  let message = modMessages[modInfo.username.toLowerCase()];
  if (message) {
    client.say(channel, message.replace('{mod}', modInfo.username));
  }
}

client.on('connected', async () => {

    setInterval(() => {
      client.say(channel, `Apoiem o canal: https://buymeacoffee.com/fabioguerreiro! HSCheers`);
  }, 25*60*1000);

  
  setInterval(()=>{
    if(sendEngagingMessage){
      client.say('#fguerreir0', `Olá malta, obrigado por estarem a assistir aproveitem e façam follow e !comandos para mais informações! HSCheers`)
      sendEngagingMessage = false
    }
  }, 30 * 60 * 1000)
})

client.on('message', async (channel, tags, message, self) => {
  sendEngagingMessage = true

  const commands = {
    'ola': (channel, tags) => client.say(channel, `Olá @${tags.username}! Bem-vindo, junta-te a nós e bebe um copo! HSCheers`),
    'specs': (channel) => client.say(channel, `Processador: AMD Ryzen 7 3700x | Memória Ram: 64GB | Placa Gráfica: NVIDIA GeForce RTX 3060 | MotherBoard: B450 Aorus Elite V2 | Fonte: Azza PSAZ-650W`),
    'website': (channel) => client.say(channel, `https://fabioguerreirodev.netlify.app/`),
    'social': (channel) => client.say(channel, `Instagram: https://www.instagram.com/fguerreir0 | LinkedIn: https://www.linkedin.com/in/fabiofsguerreiro | GitHub: https://github.com/FGuerreir0`),
    'comandos': (channel) => client.say(channel, `!ola, !horario, !specs, !social, !website`),
    'horario': (channel) => client.say(channel, `📅 Horario: ${horario.join('  |  ')}`),
    'say': async (channel, tags, message) => {
      if(tags.mod || tags.badges.broadcaster == '1') {
        const messageToSend = message.split(' ').slice(1).join(' ');
        say.speak(messageToSend, 'Microsoft Zira Desktop', 1);
      }
    },
    'so': async (channel, tags, message) => {
      if(tags.mod || tags.badges.broadcaster == '1') {
        const channelName = message.split(' ')[1];
        client.say(channel, `Sigam o canal do @${channelName} em https://twitch.tv/${channelName}! Conteúdo do melhor! HSCheers`);
      }
    },
    'piada': async (channel, tags) => {
      let joke = fn.getJoke(oneLinerJoke);
      if (joke) {
        let jokeToSend = joke.includes('(NAME)') ? joke.replace('(NAME)', tags.username) : joke;
        client.say(channel, jokeToSend);
      }
    },
    'toppoints': async (channel, tags) => {
      let leaderboard = await fn.getLeaderboard();
      if (leaderboard) {
        client.say(channel, `🏆 Leaderboard: ${leaderboard}`);
      }
    },
    'lottery' : async (channel, tags, message) => { //!lottery 50
        if(message.split(' ').length > 1){
          console.log(lotteryNumber);
          let userNumber = parseInt(message.split(' ')[1]);
          if(userNumber === lotteryNumber){
            client.say(channel, `🎉 Parabéns @${tags.username}! Acertaste no número vais ser VIP por um dia! 🎉`);
            //Implement points winning 1000 points
            //client.vip(channel, tags.username);
          }else{
            client.say(channel, `❌ Melhor sorte para a próxima @${tags.username}!`);
          }
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
    commands[command](channel, tags, message);
  }
});

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Twitch bot running!'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

setInterval(() => {
  const fetch = require('node-fetch');
  const url = `${process.env.RENDER_EXTERNAL_URL}`;
  
  fetch(url)
    .then(res => console.log(`Keep-alive ping successful: ${res.status}`))
    .catch(err => console.error('Keep-alive ping failed:', err));
}, 5 * 60 * 1000); // every 5 minutes