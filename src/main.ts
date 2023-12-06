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
  btnIsLoading = true; // Establece btnIsLoading a true cuando se envía el formulario
  if (btnQuery) {
    handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading); // Actualiza el botón con btnIsLoading = true
  }
  setTimeout(() => {
    btnIsLoading = false; // Establece btnIsLoading a false después de 3 segundos
    if (btnQuery) {
      handleShortButton(btnQuery as HTMLButtonElement, "Short!", btnIsLoading); // Actualiza el botón con btnIsLoading = false
    }
  }, 3000);
});