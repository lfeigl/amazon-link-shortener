const buttonShorten = document.getElementById('button-shorten');
const buttonCopy = document.getElementById('button-copy');
const inputUrl = document.getElementById('input-url');
const spanInfo = document.getElementById('span-info');
let shortenedUrl = null;

buttonShorten.onclick = () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    const tab = tabs[0];
    shortenedUrl = inputUrl.value = tab.url;
    buttonCopy.disabled = false;
  });
};

buttonCopy.onclick = () => {
  if (shortenedUrl) {
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        // Success
        spanInfo.style.color = 'blue';
        spanInfo.textContent = 'Copied URL to clipboard.';
      }, () => {
        // Fail
        failedCopying();
      });
  } else {
    failedCopying();
  }
};

function failedCopying() {
  spanInfo.style.color = 'red';
  spanInfo.textContent = 'Could not copy URL to clipboard.';
}
