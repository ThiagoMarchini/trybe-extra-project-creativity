const YOUR_APP_ID = 'fcb71146';
const YOUR_APP_KEY = '879fde4dd5b1a1bb9fa2360ccf776845'

const fetchRecipesByCuisine = async (cuisine) => {
  const response = await fetch(`https://api.edamam.com/search?q=*&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&cuisineType=${cuisine}`);
  const json = await response.json();
  return json;
}

function appendItemList(text) {
  const newLi = document.createElement('li');
  newLi.innerHTML = text;
  document.querySelector('ul').appendChild(newLi);
}

const getRecipeData = (result) => {
  const recipeData = result.map((entry) => [
    entry.recipe.image,
    entry.recipe.label,
    entry.recipe.source,
    entry.recipe.url,
    entry.recipe.yield
  ]);
  return recipeData;
}

window.onload = function () {
  fetchRecipesByCuisine('chinese')
    .then((result) => {
      const resultConstructor = getRecipeData(result.hits);
      resultConstructor.forEach(element => {
        appendItemList(`<img src="${element[0]}"> ${element[1]} Yield: ${element[4]} portions. Source: ${element[2]} URL: ${element[3]}`);
      });
    })
}