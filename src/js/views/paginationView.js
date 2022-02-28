import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      // console.log('btn:', btn);
      if (!btn) return;

      const goto = +btn.dataset.goto;
      // console.log('goto:', goto);

      handler(goto);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    // console.log('numPages:', numPages);

    // Page 1, and there are other pages
    if (this._curPage === 1 && numPages > 1) {
      // return 'page 1, others
      return this._renderNextBtn();
    }

    // Last page 
    if (this._curPage === numPages && numPages > 1) {
      // return 'last page'
      return this._renderPrevBtn();
    }

    // Other page
    if (this._curPage < numPages && this._curPage > 1) {
      // return 'other page'
      return `
          ${this._renderPrevBtn()}
          ${this._renderNextBtn()}
      `;
    }

    // Page 1, and there NO other pages
    // return 'only 1 page';
    return '';
  }

  _renderPrevBtn() {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${this._curPage - 1}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._curPage - 1}</span>
    </button>
  `;
  }

  _renderNextBtn() {
    return `
        <button class="btn--inline pagination__btn--next" data-goto="${this._curPage + 1}">
          <span>Page ${this._curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }
}



export default new PaginationView();