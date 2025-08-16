const apiKey = 'da8bd41';
async function fetchMovieDetails(movieName){
  url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
  let dataFetched = await fetch(url);
  const result = await dataFetched.json();
  console.log(result);
  updateHTML(result)
}

function updateHTML(movie) {
  document.querySelector('.movie-image').src = movie.Poster;
  document.querySelector('.name').textContent = movie.Title;
  document.querySelector('.rating-count').textContent = movie.imdbRating;
  document.querySelector('.rated').textContent = movie.Rated;
  document.querySelector('.year').textContent = movie.Year;
  document.querySelector('.runtime').textContent = formatTimeFromString(movie.Runtime);
  document.querySelector('.plot-text').textContent = movie.Plot;
  document.querySelector('.plot-text').textContent = movie.Plot;
  document.querySelector('.cast-text').textContent = movie.Actors;

  let genreData = genresToArray(movie.Genre);
  let html = '';
  
  genreData.forEach((type) => {
    html += `<div>${type}</div>`;
  });

  document.querySelector('.genre').innerHTML = html;
}

const inputElement = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn')
let inputValue;
inputElement.addEventListener('input',()=>{
  inputValue = inputElement.value;
})
searchBtn.addEventListener('click',()=>{
  if(inputValue.length>0){
    fetchMovieDetails(inputValue);
  }
})

function formatTimeFromString(timeStr) {
  // Extract number from string (e.g. "169 min" → 169)
  const totalMinutes = parseInt(timeStr.replace("min", "").trim(), 10);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = "";
  if (hours > 0) result += `${hours}hr `;
  if (minutes > 0) result += `${minutes}min`;

  return result.trim();
}
function genresToArray(genresStr) {
  return genresStr.split(",").map(g => g.trim());
}
fetchMovieDetails();