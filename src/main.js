const API_BASE_URL = 'https://api.themoviedb.org/3/';
 // Asegúrate de definir tu API_KEY

async function fetchAPI(endpoint, params = {}) {
  const url = new URL(endpoint, API_BASE_URL);
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    ...params
  });
  url.search = searchParams.toString();

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

async function getTrendingMoviesPreview() {
  try {
    const data = await fetchAPI('discover/tv');
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.original_name);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );

      movieContainer.appendChild(movieImg);
      trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}

async function getCategegoriesPreview() {
  try {
    const data = await fetchAPI('genre/tv/list');
    const categories = data.genres;
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

    categories.forEach(category => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      const categoryTitleText = document.createTextNode(category.name);

      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      previewCategoriesContainer.appendChild(categoryContainer);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

getTrendingMoviesPreview();
getCategegoriesPreview();