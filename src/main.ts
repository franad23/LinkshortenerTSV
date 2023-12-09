import handleShortButton from './components/buttonShort/ButtonShort';
import clipboardCopy from 'clipboard-copy';
import './style.css';

const btnQuery = document.getElementById('btnShort');
const formShortLink = document.getElementById('formShortLink');
const counter = document.querySelector('.linkShortedCounter');
const linkShortedText = document.getElementById('linkShortedText');
let btnIsLoading = false;
let continueUrl = false;

//Services
import { shortUrl, shortUrlCounter } from './services/shorturl.services';

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
      linkShortedText.innerText = "No link yet"
      linkShortedText.classList.remove("linkShortedText");
    }
  } else {
    if (linkShortedText !== null && linkShortedText !== undefined) {
      linkShortedText.innerText = link
      linkShortedText.classList.add("linkShortedText");
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
      const response =  await shortUrl(inputValue, continueUrl);
      linkShortedTextFunc(response.data);
      urlCounter();
      btnIsLoading = false; 
      handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
      formElement.reset();
    } catch (error: unknown) {
      if (error.response.status == 404 || error.response.status == 500) {
        continueUrl = confirm("Parece que la URL no existe, deseas continuar de igual manera?");
        const response =  await shortUrl(inputValue, continueUrl);
        linkShortedTextFunc(response.data);
        btnIsLoading = false; 
        handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
        formElement.reset();
      }
    }
  }
});

linkShortedText?.addEventListener('click', () => {
  console.log();
  clipboardCopy(linkShortedText.innerText);
  alert("Link Copiado!")
})