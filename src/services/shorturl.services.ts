import axios from "axios";

export const shortUrl = async (originalUrl: string, continueUrl:boolean) => {
  return await axios.post("http://localhost:3000/api/shorturl", {
    originalUrl,
    continueUrl
  })
}

export const shortUrlCounter = async () => {
  return await axios.get("http://localhost:3000/api/urlshortcount")
}