const apiKey = 'da8bd41';
async function fetchMovieDetails(movieName) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
    let dataFetched = await fetch(url);
    
    if (!dataFetched.ok) { 
      throw new Error("Network response was not ok"); 
    }

    const result = await dataFetched.json();
    
    if (result.Response === "False") {
      document.querySelector(".up").textContent = "❌ Movie not found!";
      document.querySelector(".down").style.display = "none";
      return;
    }

    // If success → update UI
    document.querySelector(".up").innerHTML = `
      <div class="left">
        <div class="image">
          <img class="movie-image" src="assets/movie-image-sample.png" alt="movie-image-not-found">
        </div>
      </div>
      <div class="right">
        <div class="name">Interstellar</div>
        <div class="rating">
          <span class="game-icons--round-star"></span>
          <div class="rating-count">8.7</div>
        </div>
        <div class="details">
          <div class="rated">PG-13</div>
          <div class="year">2014</div>
          <div class="runtime">2hr 47min</div>
        </div>
        <div class="genre">
          <div>Adventure</div>
          <div>Drama</div>
          <div>Sci-Fi</div>
        </div>
      </div>
    `;
    updateHTML(result);
    document.querySelector(".down").style.display = "block";

  } catch (error) {
    console.error("Error fetching movie:", error);
  }
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

document.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){
    searchBtn.click();
  }
})