const linkShortedTextFunc = ( linkShortedText: HTMLElement, link?: string) => {
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
export default linkShortedTextFunc;