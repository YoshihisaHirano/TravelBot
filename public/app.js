const input = document.getElementById('user_input');
const button = document.getElementById('button');
const output = document.getElementById('output');

const userPosition = {};

//getting a joke from an API
async function getAJoke() {
  const data = await fetch('https://api.jokes.one/jod');
  const json = await data.json();
  let joke = json.contents.jokes[0].joke.text;
  joke = joke.replace(/\n/, 'yup').slice(1);
  return joke;
}



//creating a bot with rivescript
const bot = new RiveScript();
bot.loadFile(['brain/bot.rive', 'brain/convo.rive', 'brain/subs.rive']).then(loadingDone).catch(loadingErr);

async function loadingDone() {
  console.log('the bot is ready');
  bot.sortReplies();
  let username = 'local-user';
  const joke = await getAJoke();
  bot.reply(username, `h7h9h2 set ${joke}`)
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
