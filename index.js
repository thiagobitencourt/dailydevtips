const dataSource = {};

window.addEventListener('load', function() {
  const nextTipButton = document.getElementById('next-tip');
  nextTipButton.addEventListener('click', loadNextTip);

  loadTips().then(function() {
    loadNextTip();
  });
});

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
  const { tip: tipText } = tip;
  const tipElement = document.getElementById('current-tip');
  tipElement.innerText = tipText;
}
