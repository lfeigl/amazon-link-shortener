const pageStateMatcher = new chrome.declarativeContent.PageStateMatcher({
  pageUrl: {
    hostEquals: 'www.amazon.com',
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
