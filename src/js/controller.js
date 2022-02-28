import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for everything
import 'regenerator-runtime/runtime'; // for async await
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {

    const id = window.location.hash.slice(1);


    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result 
    // resultsView.render(model.getSearchResultsPage());
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe 
    recipeView.render(model.state.recipe);

    // TEST
    // controlServings();

  } catch (error) {

    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {

    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results 
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons 
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (gotoPage) {
  // console.log('Page controller')

  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2) Render initial pagination buttons 
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view 
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

(() => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();