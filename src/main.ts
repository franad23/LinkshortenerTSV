import handleShortButton from './components/buttonShort/ButtonShort';
import clipboardCopy from 'clipboard-copy';
import { spiral } from "ldrs";
import './style.css';

const btnQuery = document.getElementById('btnShort');
const formShortLink = document.getElementById('formShortLink');
const counter = document.querySelector('.linkShortedCounter');
const linkShortedText = document.getElementById('linkShortedText');
const bodyContainer = document.getElementById('bodyContainer');
let btnIsLoading = false;
let continueUrl = false;

//Services

import { shortUrl, shortUrlCounter, verifyUrl } from './services/shorturl.services';

const verifyUrlIfExists = async () => {
  const urlParams = window.location.pathname;
  const segments = urlParams.split('/');
  const ultimoSegmento = segments[segments.length - 1];

  if (ultimoSegmento.length > 0 && bodyContainer) {
    const response = await verifyUrl(window.location.href)
    console.log(response);
    bodyContainer.innerHTML = `
      <div class="redirectContainer">
        <div class="textRedirect">
          <h3>Thanks for use TSV Link Shortener, designed by <a href="https://github.com/franad23" target="_blank">Franco</a></h3>
          <div class="spinnerContainer" >
            <l-spiral
              size="50"
              speed="0.9" 
              color="white" 
            ></l-spiral>
          </div>
        </div>
      </div>`
    if (response.status == 200) {
      setTimeout(() => {
        window.location.href = response.data;
      }, 3000);
    }
  }

}

verifyUrlIfExists();


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
        continueUrl = confirm("It seems that the URL doesn't exist. Continue anyways?");
        if (continueUrl) {
          const response =  await shortUrl(inputValue, continueUrl);
          linkShortedTextFunc(response.data);
          btnIsLoading = false; 
          handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
          formElement.reset();
          urlCounter();
        }
        else {
          alert("The URL doesn't exist. Please try again.")
          btnIsLoading = false; 
          handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
          formElement.reset();
          urlCounter();
        }
      }
    }
  }
});

linkShortedText?.addEventListener('click', () => {
  if(linkShortedText.innerText === "No link yet") return
  
  clipboardCopy(linkShortedText.innerText);
  alert("Link Copiado!")
})