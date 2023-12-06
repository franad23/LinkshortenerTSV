import axios from "axios";

export const shortUrl = async (originalUrl: string) => {
  return await axios.post("http://localhost:3000/api/shorturl", {
    originalUrl
  })
}

export const shortUrlCounter = async () => {
  return await axios.get("http://localhost:3000/api/urlshortcount")
}