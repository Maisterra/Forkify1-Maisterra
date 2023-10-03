import icon from '../img/icons.svg';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

function printData(d) {
  var recipe = d.data.recipe;

  recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookTime: recipe.cooking_time,
    ingredients: recipe.ingredients,



  };
  console.log(recipe);

  var markup = `<figure class="recipe__fig">
<img src="${recipe.image}" alt="${recipe.title}" />
<h1 class="recipe__title">
  <span>${recipe.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icon}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icon}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icon}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icon}g#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated">
  <svg>
    <use href="${icon}#icon-user"></use>
  </svg>
</div>
<button class="btn--round">
  <svg class="">
    <use href="${icon}icons.svg#icon-bookmark-fill"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${recipe.ingredients
      .map(ing => {
        return `
  <li class="recipe__ingredient">
  <svg class="recipe__icon">
  <use href="${icon}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${ing.quantity}</div>
  <div class="recipe__description">
  <span class="recipe__unit">${ing.unit}</span>
  ${ing.description}
  </div>
  </li>
  `;
      }).join('')}

  
    
      
    
</ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
  directions at their website.
</p>
<a
  class="btn--small recipe__btn"
  href="${recipe.sourceUrl}"
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="${icon}#icon-arrow-right"></use>
  </svg>
</a>
</div>`;
  recipeContainer.innerHTML = "";
  recipeContainer.insertAdjacentHTML("afterbegin", markup);
  console.log(recipe);
}

console.log("Estoy después del insert");


/*Funcion asincrona*/
function showRecipe() {

  let id = window.location.hash.slice(1);
  if (id === "") {
    return
  }

  renderSpiner(recipeContainer);

  //fetch (`https://forkify-api.herokuapp.com/api/v2/recipes/$(id)`)
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)

    .then((r) => r.json())
    .then((d) => {
      printData(d)
        .catch((error) => {
          console.error('Error',error);

        });
    })
};


function renderSpiner(parentEl) {
  let markup = `<div class="spinner">
    <svg>
      <use href="${icon}#icon-loader"></use>
    </svg>
  </div>`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
}

let eventosRecipe = ["load", "hashchange"]
eventosRecipe.forEach(evento => {
  window.addEventListener(evento, showRecipe)

});

/*
// controller.js
import loadRecipe from model.js;

const controlRecipe = async function () {
  try {
    // Obtén el ID de la receta de la URL
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Carga la receta utilizando la función del modelo
    await model.loadRecipe(id);

    // Resto de la lógica del controlador aquí...
  } catch (error) {
    console.error(error);
  }
};

// Asocia la función del controlador con eventos ('load' y 'hashchange')
let loadRecipe = ['load', 'hashchange']
loadRecipe.forEach((evento) =>
  window.addEventListener(evento, controlRecipe)

  
);*/
