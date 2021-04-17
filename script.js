const YOUR_APP_ID = 'fcb71146';
const YOUR_APP_KEY = '879fde4dd5b1a1bb9fa2360ccf776845'

const fetchRecipesByCuisineOrMeal = async (parameter, numberOfResults) => {
  const response = await fetch(`https://api.edamam.com/search?q=*&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}${parameter}&to=${numberOfResults}`);
  const json = await response.json();
  return json;
}

const fetchRecipesByBoth = async (parameter, numberOfResults) => {
  const response = await fetch(`https://api.edamam.com/search?q=*&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}${parameter}&to=${numberOfResults}`);
  const json = await response.json();
  return json;
}

function appendItemText(text) {
  const newLi = document.createElement('li');
  newLi.innerHTML = text;
  document.querySelector('.content').appendChild(newLi);
}

function appendItemImage(text) {
  const newLi = document.createElement('li');
  newLi.innerHTML = text;
  document.querySelector('.images').appendChild(newLi);
}

function appendRow(image, description) {
  const parent = document.querySelector("#recipes");
  const newRow = document.createElement('div');
  newRow.className = 'row recipe-row';
  const newImageColumn = document.createElement('div');
  newImageColumn.className = 'col-sm-3';
  newImageColumn.innerHTML = `<img src="${image}">`;
  const newDescriptionColumn = document.createElement('div');
  newDescriptionColumn.className = 'col-sm-9';
  newDescriptionColumn.innerHTML = constructInnerHTML(description);
  newRow.appendChild(newImageColumn);
  newRow.appendChild(newDescriptionColumn);
  parent.appendChild(newRow);
}

function constructInnerHTML(parameters) {
  const [title, diets, type, meal, ingredients, source, url] = parameters;
  let html = '';
  html += `<h3>${title}</h3>`;
  html += `<p>Diets: ${diets.join(', ')}<br>`;
  html += `Type of recipe: ${type.join(', ')}<br>`;
  html += `Type of meal: ${meal.join(', ')}</p>`;
  html += `<p>Ingredients: ${ingredients.join(', ')}</p>`;
  html += `<p> Instructions: <a href="${url}"target="_blank">${source}</a>`;
  return html;
}

const getRecipeData = (result) => {
  console.log(result);
  const recipeData = result.map((entry) => [
    entry.recipe.image,
    entry.recipe.label,
    entry.recipe.dietLabels,
    entry.recipe.dishType,
    entry.recipe.mealType,
    entry.recipe.ingredientLines,
    entry.recipe.source,
    entry.recipe.url,
  ]);
  return recipeData;
}

window.onload = function () {
  document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('#recipes').innerHTML = '';
  })
  document.querySelector('#submit').addEventListener('click', () => {
    document.querySelector('#recipes').innerHTML = '';
    const cuisine = document.getElementById('cuisine').value;
    const mealType = document.getElementById('meal-type').value;
    const numberOfResults = document.getElementById('number-of-results').value;
    if (mealType && cuisine) {
      fetchRecipesByCuisineOrMeal(`&cuisineType=${cuisine}&mealType=${mealType}`, numberOfResults)
      .then((result) => {
        const resultConstructor = getRecipeData(result.hits);
        resultConstructor.forEach(element => {
          appendRow(element[0], [element[1], element[2], element[3], element[4], element[5], element[6], element[7]]);
        });
      })
    }
    else if (cuisine) {
      fetchRecipesByCuisineOrMeal(`&cuisineType=${cuisine}`, numberOfResults)
      .then((result) => {
        const resultConstructor = getRecipeData(result.hits);
        resultConstructor.forEach(element => {
          appendRow(element[0], [element[1], element[2], element[3], element[4], element[5], element[6], element[7]]);
        });
      })
    }
    else if (mealType) {
      fetchRecipesByCuisineOrMeal(`&mealType=${mealType}`, numberOfResults)
      .then((result) => {
        const resultConstructor = getRecipeData(result.hits);
        resultConstructor.forEach(element => {
          appendRow(element[0], [element[1], element[2], element[3], element[4], element[5], element[6], element[7]]);
        });
      })
    }
  })
};