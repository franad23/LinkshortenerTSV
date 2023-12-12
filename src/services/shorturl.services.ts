import axios from "axios";

export const shortUrl = async (originalUrl: string, continueUrl:boolean) => {
  return await axios.post("https://linkshortener-tsv-backend-5v3blx7gb-franad23.vercel.app/api/shorturl", {
    originalUrl,
    continueUrl
  })
}

export const shortUrlCounter = async () => {
  return await axios.get("https://linkshortener-tsv-backend-5v3blx7gb-franad23.vercel.app/api/urlshortcount")
}

export const verifyUrl = async (shortedUrl: string) => {
  return await axios.post("https://linkshortener-tsv-backend-5v3blx7gb-franad23.vercel.app/api/verify", {
    shortedUrl
  })
}