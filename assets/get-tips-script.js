/*
  How did I extract all those tips from the original article?
  I've used the following code.

  If you wanna try just go to the article in this URL: https://dev.to/emmawedekind/101-tips-for-being-a-great-programmer-human-36nl
  Press F12 to open the devTools bar, paste the code at the console, press enter and it will presents you with a JSON with all the tips that you will be able to copy.

  I've also removed the number before each tip, so that's what the `mapTips` function does.
*/
function getTips() {
  const articleBody = document.querySelector('div#article-body.body');
  const tips = [];
  articleBody.querySelectorAll('h1').forEach(tipElement => tips.push({ tip: tipElement.innerText }));
  articleBody.querySelectorAll('h1 + p').forEach((descriptionElement, index) => tips[index].description = descriptionElement.innerText);
  return tips;
}

function mapTips(tips) {
  return tips.map(tip => {
    return {
      tip: tip.tip.replace(/([0-9])+. /, ''),
      description: tip.description
    }
  });
}

const allTips = getTips();
const tipsMaped = mapTips(allTips);
console.log(JSON.stringify(tipsMaped, null, 4));
