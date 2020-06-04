//getting a joke from an API
export async function getAJoke() {
  const data = await fetch('https://api.jokes.one/jod');
  const json = await data.json();
  let joke = json.contents.jokes[0].joke.text;
  return joke;
}

export async function getAGif() {
  const response = await fetch('/gif');
  const data = await response.json();
  const src = data.data.images.downsized_medium.url;
  const img = document.createElement('img');
  img.src = src;
  img.style.height = '30%';
  img.style.width = '30%';
  img.type = 'image/gif';
  document.querySelector('.gif').insertAdjacentElement('afterbegin', img);
}

export async function showGif(input, gifNum) {
  const gifContainer = document.querySelector('.gif');
  //adding and removing gifs
  if(/i want to see gifs/.test(input)) {
    for(let i = 0; i < gifNum; i++) await getAGif();
  }

  const gifChild = new Array(gifContainer.childNodes)
  if(/remove gif/.test(input) && gifChild.length > 0) {
    for(let i = 0; i < gifNum; i++) {
      gifContainer.removeChild(gifContainer.lastChild);
  }
}
}
