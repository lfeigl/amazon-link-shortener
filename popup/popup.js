const buttonShorten = document.getElementById('button-shorten');
const buttonCopy = document.getElementById('button-copy');
const inputUrl = document.getElementById('input-url');
const spanInfo = document.getElementById('span-info');
let opts = null;
let shortenedUrl = null;

chrome.storage.sync.get('options', ({ options: savedOpts }) => {
  if (chrome.runtime.lastError) {
    infoError(chrome.runtime.lastError);
  } else {
    opts = savedOpts;
  }
});

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
      infoError(err);
    }
  });
};

buttonCopy.onclick = () => {
  const copyErrMsg = 'Could not copy link to clipboard.';

  if (shortenedUrl) {
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        // Success
        spanInfo.style.color = 'blue';
        spanInfo.textContent = 'Copied link to clipboard.';
      }, () => {
        // Fail
        infoError(new Error(copyErrMsg));
      });
  } else {
    infoError(new Error(copyErrMsg));
  }
};

function shortenUrl(url) {
  try {
    // HTTP or HTTPS
    const protocol = applyRegExp(url, /^(http[s]?):/, 1);
    // Top-level domain (TLD)
    const tld = applyRegExp(url, /\/\/www\.amazon\.([a-z.]+)/, 1);
    // Amazon Standard Identification Number (ASIN)
    const asin = applyRegExp(url, /(\/dp\/|\/product\/)([a-zA-Z0-9]{10})/, 2);

    if (opts.shorterUrl) {
      return `amazon.${tld}/dp/${asin}`;
    } else {
      return `${protocol}://www.amazon.${tld}/dp/${asin}`;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Could not shorten link.');
  }
}

function applyRegExp(url, regExp, group) {
  if (regExp.test(url)) {
    const match = url.match(regExp);

    if (Array.isArray(match) && match[group]) return match[group];
  }

  throw new Error('Could not apply regular expression.');
}

function infoError(err) {
  spanInfo.style.color = 'red';
  spanInfo.textContent = err.message;
}
