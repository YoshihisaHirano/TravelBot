const input = document.getElementById('user_input');
const button = document.getElementById('button');
const output = document.getElementById('output');
import getPosition from './position.js';
import getAJoke from './play.js';

const position = getPosition();
console.log(position);

//creating a bot with rivescript
const bot = new RiveScript();
bot.loadFile(['brain/bot.rive', 'brain/convo.rive', 'brain/subs.rive']).then(loadingDone).catch(loadingErr);

async function loadingDone() {
  console.log('the bot is ready');
  bot.sortReplies();
  let username = 'local-user';
  const joke = await getAJoke();
  //setting some variables so that bot is aware of user's current location and other stuff

  bot.reply(username, `h7h9h2 set ${joke}`);
  bot.reply(username, `a8k2f5 set ${position.country}`);
  bot.reply(username, `i0k4p2 set ${position.currency}`);
  bot.reply(username, `h6y4w3 set ${position.city_or_district}`);
  bot.reply(username, `j9p1x0 set ${position.state}`);
}

function loadingErr(err) {
  console.error(err);
}

button.addEventListener('click', chat);

async function chat() {
  const userInput = input.value;
  let reply = await bot.reply('local-user', userInput);
  reply = reply.replace('yup', ' --- '); //this line is formatting a joke a little bit
  output.textContent = reply;
  input.value = '';
}
