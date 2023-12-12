import handleShortButton from './components/buttonShort/ButtonShort';
import clipboardCopy from 'clipboard-copy';
import './style.css';

import urlCounter from './components/urlCounter';
import verifyUrlIfExists from './components/verifyUrlIfExists';
import linkShortedTextFunc from './components/linkShortedTextFunc';

const btnQuery = document.getElementById('btnShort');
const formShortLink = document.getElementById('formShortLink');
const counterContainer = document.querySelector('.linkShortedCounter');
const linkShortedText = document.getElementById('linkShortedText');
const bodyContainer = document.getElementById('bodyContainer');
let btnIsLoading = false;
let continueUrl = false;

//Services

import { shortUrl } from './services/shorturl.services';

if (bodyContainer) {
  verifyUrlIfExists(bodyContainer);
} 

if (counterContainer) {
  urlCounter(counterContainer);
}

if (linkShortedText) {
  linkShortedTextFunc(linkShortedText);
}

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
      if(linkShortedText) {
        linkShortedTextFunc(linkShortedText, response.data);
      }
      if (counterContainer) {
        urlCounter(counterContainer);
      }
      btnIsLoading = false; 
      handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
      formElement.reset();
    } catch (error: any) {
      if (error.response.status == 404 || error.response.status == 500) {
        continueUrl = confirm("It seems that the URL doesn't exist. Continue anyways?");
        if (continueUrl) {
          const response =  await shortUrl(inputValue, continueUrl);
          if(linkShortedText) {
            linkShortedTextFunc(linkShortedText, response.data);
          }
          btnIsLoading = false; 
          handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
          formElement.reset();
          if (counterContainer) {
            urlCounter(counterContainer);
          }
        }
        else {
          alert("The URL doesn't exist. Please try again.")
          btnIsLoading = false; 
          handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
          formElement.reset();
          if (counterContainer) {
            urlCounter(counterContainer);
          }
        }
      }
    }
  }
});

linkShortedText?.addEventListener('click', () => {
  if(linkShortedText.innerText === "No link yet") return
  
  clipboardCopy(linkShortedText.innerText);
  alert("Link Copied!")
})