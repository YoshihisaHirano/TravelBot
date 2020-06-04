import getPosition from './position.js';
import { getAJoke, getAGif, showGif } from './play.js';

const input = document.getElementById('user_input');
const button = document.getElementById('button');
const output = document.getElementById('output');

const position = getPosition();
//console.log(position);

//creating a bot with rivescript
const bot = new RiveScript();
bot.loadFile(['brain/bot.rive', 'brain/convo.rive', 'brain/subs.rive']).then(loadingDone).catch(loadingErr);

async function loadingDone() {
  console.log('the bot is ready');
  bot.sortReplies();
  let username = 'local-user';
  //pre-loading a joke
  //bot.reply(username, `h7h9h2 set ${joke}`);
  const joke = await getAJoke();
  bot.setVariable('joke', joke);
}

//setting some variables so that bot is aware of user's current location and other stuff
bot.setVariable('country', position.country)
bot.setVariable('currency', position.currency)
bot.setVariable('city', position.city_or_district)
bot.setVariable('state', position.state)


function loadingErr(err) {
  console.error(err);
}

button.addEventListener('click', chat);


async function chat() {

  //enabling chatting
  const userInput = input.value.trim().toLowerCase();
  let reply = await bot.reply('local-user', userInput);
  reply = reply.replace('yup', ' --- '); //this line is formatting a joke a little bit

//if gif topic emerges, this gif-retrieving and gif-showing function is invoked
  if(/gif/.test(userInput)) {
      await showGif(userInput, 3);
  }

  output.textContent = reply;
  input.value = '';
}
