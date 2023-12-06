import './style.css';
import handleShortButton from './components/buttonShort/ButtonShort';

const btnQuery = document.getElementById('btnShort');
const formShortLink = document.getElementById('formShortLink');
const counter = document.querySelector('.linkShortedCounter');
const linkShortedText = document.getElementById('linkShortedText');
let btnIsLoading = false;

//Services
import { shortUrl, shortUrlCounter } from './services/shorturl.services';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

const urlCounter = async () => {
  try {
    const response = await shortUrlCounter();
    if (counter !== null && counter !== undefined) {
      counter.innerHTML = response.data.count;
    }
  } catch (error) {
    console.log(error);
  }
}

urlCounter();

const linkShortedTextFunc = (link?: string) => {
  if(!link) {
    if (linkShortedText !== null && linkShortedText !== undefined) {
      linkShortedText.innerText = "Your Link Shorted: No link Yet"
    }
  } else {
    if (linkShortedText !== null && linkShortedText !== undefined) {
      linkShortedText.innerText = `Your Link Shorted: ${link}`
    }
  }
}

linkShortedTextFunc();

if (btnQuery) {
  handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading)
}

formShortLink?.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnIsLoading = true; 
  const formElement = e.currentTarget as HTMLFormElement;
  const inputElement = formElement.elements[0] as HTMLInputElement;
  const inputValue = inputElement.value;

  if (btnQuery) {
    handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading); 
    try {
      const response =  await shortUrl(inputValue);
      linkShortedTextFunc(response.data);
      urlCounter();
    } catch (error) {
      console.log(error);
    }
  }
  setTimeout(() => {
    btnIsLoading = false; 
    if (btnQuery) {
      handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
    }
  }, 3000);
  
});