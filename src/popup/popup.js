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

    try {
      shortenedUrl = inputUrl.value = shortenUrl(tab.url);
      buttonCopy.disabled = false;
    } catch (err) {
      infoError(err.message);
    }
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
        infoError('Could not copy URL to clipboard.');
      });
  } else {
    infoError('Could not copy URL to clipboard.');
  }
};

function shortenUrl(url) {
  const regExp = /(\/dp\/|\/product\/)([a-zA-Z0-9]{10})/;

  if (regExp.test(url)) {
    const match = url.match(regExp);

    if (Array.isArray(match)) {
      // Amazon Standard Identification Number (ASIN)
      const asin = match[2];

      return 'https://www.amazon.com/dp/' + asin;
    }
  }

  throw new Error('Could not shorten URL.');
}

function infoError(err) {
  spanInfo.style.color = 'red';
  spanInfo.textContent = err;
}
