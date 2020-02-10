// Top-level domains (TLDs)
const tlds = [
  // United Arab Emirates
  'ae',
  // Canada
  'ca',
  // China
  'cn',
  // Japan
  'co.jp',
  // United Kingdom
  'co.uk',
  // United States
  'com',
  // Australia
  'com.au',
  // Brazil
  'com.br',
  // Mexico
  'com.mx',
  // Turkey
  'com.tr',
  // Germany
  'de',
  // Spain
  'es',
  // France
  'fr',
  // Italy
  'it',
  // India
  'in',
  // Netherlands
  'nl',
  // Singapore
  'sg',
].join('|');

const pageStateMatcher = new chrome.declarativeContent.PageStateMatcher({
  pageUrl: {
    urlMatches: `^http[s]?://www.amazon.(${tlds})[\\w\\W]*(/dp/|/product/)`,
  },
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log(`Added listener. (${details.reason})`);
  if (details.reason === 'update') console.log(`Previous version: "${details.previousVersion}"`);

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [pageStateMatcher],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});
