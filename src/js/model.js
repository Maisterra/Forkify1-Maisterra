

export const state = {
    recipe: {},
    function loadRecipe =
  };
  
  export const loadRecipe = async function (id) {
    try {
      // Realiza la solicitud para obtener la receta con el ID
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const data = await res.json();
  
      // Verifica el estado de la respuesta
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  
      // Almacena la receta en el estado del modelo
      state.recipe = {
        id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
      };
  
      console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
  };
   