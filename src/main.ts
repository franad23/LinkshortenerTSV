import './style.css';
import handleShortButton from './components/buttonShort/ButtonShort';

const btnQuery = document.getElementById('btnShort');
const formShortLink = document.getElementById('formShortLink');
let btnIsLoading = false;

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

if (btnQuery) {
  handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading)
}

formShortLink?.addEventListener('submit', (e) => {
  e.preventDefault();
  btnIsLoading = true; 
  const formElement = e.currentTarget as HTMLFormElement;
  const inputElement = formElement.elements[0] as HTMLInputElement;
  const inputValue = inputElement.value;
  console.log(inputValue);

  if (btnQuery) {
    handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading); 
  }
  setTimeout(() => {
    btnIsLoading = false; 
    if (btnQuery) {
      handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading);
    }
  }, 3000);
  
});