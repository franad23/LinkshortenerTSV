import 'ldrs/ring'
import { spiral } from 'ldrs'

spiral.register()



const handleShortButton = (elem:HTMLButtonElement, name: string, isLoading:boolean) => {
  elem.innerHTML = name;
  elem.disabled = isLoading
  isLoading ? elem.classList.add('btnLoading') : elem.classList.remove('btnLoading');
  isLoading ? elem.innerHTML = `<l-spiral
  size="30"
  speed="0.9" 
  color="white" 
></l-spiral>` : elem.innerHTML = name;


}

export default handleShortButton;


