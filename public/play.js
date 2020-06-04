//getting a joke from an API
export default async function getAJoke() {
  const data = await fetch('https://api.jokes.one/jod');
  const json = await data.json();
  let joke = json.contents.jokes[0].joke.text;
  joke = joke.replace(/\n/, 'yup').slice(1);
  return joke;
}
