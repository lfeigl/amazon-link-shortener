const checkboxShorterUrl = document.getElementById('checkbox-shorter-url');
const buttonSave = document.getElementById('button-save');
const spanInfo = document.getElementById('span-info');
const defaultOpts = {
  shorterUrl: true,
};
let opts;

chrome.storage.sync.get('options', ({ options: savedOpts }) => {
  if (chrome.runtime.lastError) {
    return infoError(chrome.runtime.lastError);
  }

  if (savedOpts) {
    opts = savedOpts;
  } else {
    opts = Object.assign({}, defaultOpts);
  }

  loadOpts();
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
  chrome.storage.sync.set({
    options: opts,
  }, () => {
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
