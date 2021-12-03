// Top-level domains (TLDs)
const tlds = [
  // Australia
  'com.au',
  // Brazil
  'com.br',
  // Canada
  'ca',
  // China
  'cn',
  // Egypt
  'eg',
  // France
  'fr',
  // Germany
  'de',
  // India
  'in',
  // Italy
  'it',
  // Japan
  'co.jp',
  // Mexico
  'com.mx',
  // Netherlands
  'nl',
  // Poland
  'pl',
  // Saudi Arabia
  'sa',
  // Singapore
  'sg',
  // Spain,
  'es',
  // Sweden
  'se',
  // Turkey
  'com.tr',
  // United Arab Emirates
  'ae',
  // United Kingdom
  'co.uk',
  // United States
  'com',
].join('|');

const defaultOpts = {
  shorterUrl: true,
};

const pageStateMatcher = new chrome.declarativeContent.PageStateMatcher({
  pageUrl: {
    urlMatches: `^http[s]?://www.amazon.(${tlds})[\\w\\W]*(/dp/|/product/)`,
  },
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log(`Added listener. Reason: "${details.reason}"`);

  if (details.reason === 'update') {
    console.log(`Previous version: "${details.previousVersion}"`);
  }

  if (details.reason === 'install') {
    chrome.storage.sync.set({ options: defaultOpts }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Set default options:', defaultOpts);
      }
    });
  }

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [pageStateMatcher],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});
