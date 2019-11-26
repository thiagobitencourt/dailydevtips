const dataSource = {};
const LESS = 'LESS...';
const MORE = 'MORE...';

window.addEventListener('load', function() {
  const nextTipButton = document.getElementById('next-tip');
  const infoToggleButton = document.querySelector('.actions .button.dropdown-toggle');
  nextTipButton.addEventListener('click', loadNextTip);
  infoToggleButton.addEventListener('click', toggleInforPanel);

  loadTips().then(function() {
    loadNextTip();
    addToggleDescriptionEvent();
  });
});

function addToggleDescriptionEvent() {
  const toggleDescriptionButton = document.getElementById('toggle-button');
  toggleDescriptionButton.addEventListener('click', toggleDescription);
}

function loadTips() {
  return fetch('./data/tips.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
      dataSource.tips = responseJson.tips || [];
      return dataSource.tips;
    });
}

function loadNextTip() {
  const index = getNextTipIndex();
  const tip = dataSource.tips[index];

  tip.index = index;
  setCurrentTip(tip);
}

function getNextTipIndex() {
  const currentTip = dataSource.currentTip || {};
  let tipIndex = typeof currentTip.index === 'undefined' ? 0 : currentTip.index + 1;
  return tipIndex >= dataSource.tips.length ? 0 : tipIndex;
}

function setCurrentTip(tip) {
  dataSource.currentTip = tip;
  injectTip(tip);
}

function injectTip(tip) {
  const tipElement = document.getElementById('current-tip');
  const descriptionIndex = document.getElementById('tip-index');
  const descriptionText = document.getElementById('tip-description-text');

  tipElement.innerText = tip.tip;
  descriptionIndex.innerText = `${tip.index + 1}/${dataSource.tips.length}`;
  descriptionText.innerText = tip.description;
  
  tipElement.classList = "";
}

function toggleDescription() {
  const toggleDescriptionButton = document.getElementById('toggle-button');
  const tipDescriptionDiv = document.getElementById('tip-description');
  const isOpen = toggleDescriptionButton.innerText === LESS;

  if (isOpen) {
    toggleDescriptionButton.innerText = MORE;
    tipDescriptionDiv.classList.remove('is-open');
  } else {
    tipDescriptionDiv.classList.add('is-open');
    toggleDescriptionButton.innerText = LESS;
  }
}

function toggleInforPanel() {
  const infoToggleButton = document.querySelector('.actions .button.dropdown-toggle');
  const isOpen = infoToggleButton.classList.contains('open');
  if (isOpen) {
    infoToggleButton.classList.remove('open');
  } else {
    infoToggleButton.classList.add('open');
  }
}
