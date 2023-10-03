

// RecipeView.js
import icon from '../img/icons.svg';

export default class RecipeView {
  #parentElement = document.querySelector('.recipe');

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const spinner = `
      <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return `
      <!-- Tu código HTML para la vista de la receta aquí -->
    `;
  }
}
