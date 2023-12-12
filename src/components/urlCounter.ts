import { shortUrlCounter } from "../services/shorturl.services";

const urlCounter = async (counterContainer:Element) => {
  try {
    const response = await shortUrlCounter();
    if (counterContainer !== null && counterContainer !== undefined) {
      counterContainer.innerHTML = response.data.count;
    }
  } catch (error) {
    console.log(error);
  }
}

export default urlCounter;