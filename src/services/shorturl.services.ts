import axios from "axios";

export const shortUrl = async (originalUrl: string, continueUrl:boolean) => {
  return await axios.post("https://linkshortener-tsv-backend.vercel.app/api/shorturl", {
    originalUrl,
    continueUrl
  },{
    withCredentials: true 
  })
}

export const shortUrlCounter = async () => {
  return await axios.get("https://linkshortener-tsv-backend.vercel.app/api/urlshortcount",{
    withCredentials: true 
  })
}

export const verifyUrl = async (shortedUrl: string) => {
  return await axios.post("https://linkshortener-tsv-backend.vercel.app/api/verify", {
    shortedUrl
  },{
    withCredentials: true 
  })
}