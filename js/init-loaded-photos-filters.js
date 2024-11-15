import renderPicturesFromTemplate from './render-pictures-from-template ';
import { debounce } from './utils';
import { filters, defaultActiveFilterButton } from './constants';

const stateOfSortedPhotos = {
  'filter-default': { sortedPhotos: [], isSorted: false },
  'filter-random': { sortedPhotos: [], isSorted: false },
  'filter-discussed': { sortedPhotos: [], isSorted: false },
};

const handleDefaultFilter = (data, filterKey) => {
  const filterState = stateOfSortedPhotos[filterKey];

  if (!filterState.isSorted) {
    filterState.sortedPhotos = data;
    filterState.isSorted = true;
  }

  renderPicturesFromTemplate(filterState.sortedPhotos);
};

const handleRandomFilter = (uniqueItems, filterKey) => {
  const filteredData = [];
  const filterState = stateOfSortedPhotos[filterKey];

  while (filteredData.length < 10 && uniqueItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * uniqueItems.length);
    filteredData.push(uniqueItems[randomIndex]);
    uniqueItems.splice(randomIndex, 1);
  }

  filterState.sortedPhotos = filteredData;
  renderPicturesFromTemplate(filterState.sortedPhotos);
};

const handleDiscussedFilter = (data, filterKey) => {
  const filterState = stateOfSortedPhotos[filterKey];

  if (!filterState.isSorted) {
    filterState.sortedPhotos = data.slice().sort((a, b) => b.comments.length - a.comments.length);
    filterState.isSorted = true;
  }

  renderPicturesFromTemplate(filterState.sortedPhotos);
};


const filterPictures = (data, filterId) => {
  const uniqueItems = [...new Set(data)];

  switch (filterId) {
    case 'filter-default':
      handleDefaultFilter(data, 'filter-default');
      break;

    case 'filter-random':
      handleRandomFilter(uniqueItems, 'filter-random');
      break;

    case 'filter-discussed':
      handleDiscussedFilter(data, 'filter-discussed');
      break;

    default:
      renderPicturesFromTemplate(data);
  }
};

const debouncedFilterPictures = debounce(filterPictures);

export const initFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  const buttons = document.querySelectorAll('.img-filters__button');
  let activeFilter = defaultActiveFilterButton;
  buttons.forEach((button) => {
    button.addEventListener('click', function () { // Здесь function, а не стрелка, потому что код работает с this
      activeFilter.classList.remove('img-filters__button--active');
      activeFilter = this;
      this.classList.add('img-filters__button--active');
      const filterId = this.id;
      debouncedFilterPictures(data, filterId);
    });
  });
};
