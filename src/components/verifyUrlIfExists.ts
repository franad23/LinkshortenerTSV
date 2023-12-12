import { verifyUrl } from "../services/shorturl.services";

const verifyUrlIfExists = async (bodyContainer: HTMLElement) => {
  const urlParams = window.location.pathname;
  const segments = urlParams.split('/');
  const lastSegment = segments[segments.length - 1];

  if (lastSegment.length > 0 && bodyContainer) {
    try {
      const response = await verifyUrl(window.location.href)
      
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
    } catch (error) {
      console.log(error);
      bodyContainer.innerHTML = `
        <div class="redirectContainer">
          <div class="textRedirect">
            <h3>URL Doesn't exists, designed by <a href="https://github.com/franad23" target="_blank">Franco</a></h3>
            <div class="spinnerContainer" >
              <l-spiral
                size="50"
                speed="0.9" 
                color="white" 
              ></l-spiral>
            </div>
          </div>
        </div>`
        setTimeout(() => {
          window.location.href = "http://localhost:5173/";
        }, 3000);
    }
  }

}

export default verifyUrlIfExists;