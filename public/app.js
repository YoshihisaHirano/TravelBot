import getPosition from './position.js';
import { getAJoke, getAGif, showGif } from './play.js';
import getWeather from './weather.js';

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
  const joke = await getAJoke();
  bot.setVariable('joke', joke);

}

function loadingErr(err) {
  console.error(err);
}

async function chat() {
  //setting some variables so that bot is aware of user's current location and other stuff
  bot.setVariable('country', position.country)
  bot.setVariable('currency', position.currency)
  bot.setVariable('city', position.city_or_district)
  bot.setVariable('state', position.state)

//getting information about the weather and setting weather variables
  const weather =  await getWeather(position);
  //console.log(weather.weather[0].main)
  bot.setVariable('weather', `${weather.weather[0].main}.`);
  bot.setVariable('temperature', `${weather.main.temp} °C`);
  bot.setVariable('speed', `${weather.wind.speed} m/s`);
  bot.setVariable('humidity', `${weather.main.humidity}%`);

  //enabling chatting
  const userInput = input.value.trim().toLowerCase();
  let reply = await bot.reply('local-user', userInput);

//if gif topic emerges, this gif-retrieving and gif-showing function is invoked
  if(/gif/.test(userInput)) {
      await showGif(userInput, 3);
  }

  output.textContent = reply;
  input.value = '';
}

//adding functionality to submit button
button.addEventListener('click', chat);
