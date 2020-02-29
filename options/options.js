const checkboxShorterUrl = document.getElementById('checkbox-shorter-url');
const buttonSave = document.getElementById('button-save');
const spanInfo = document.getElementById('span-info');
let opts = null;

chrome.storage.sync.get('options', ({ options: savedOpts }) => {
  if (chrome.runtime.lastError) {
    infoError(chrome.runtime.lastError);
  } else {
    opts = savedOpts;
    loadOpts();
  }
});

function loadOpts() {
  checkboxShorterUrl.checked = opts.shorterUrl;
}

function infoError(err) {
  spanInfo.style.color = 'red';
  spanInfo.textContent = err.message;
}

checkboxShorterUrl.onchange = () => {
  opts.shorterUrl = checkboxShorterUrl.checked;
};

buttonSave.onclick = () => {
  chrome.storage.sync.set({ options: opts }, () => {
    if (chrome.runtime.lastError) {
      return infoError(chrome.runtime.lastError);
    }

    spanInfo.style.color = 'blue';
    spanInfo.textContent = 'Saved options.';
    setTimeout(() => {
      spanInfo.textContent = '';
    }, 3000);
  });
};
