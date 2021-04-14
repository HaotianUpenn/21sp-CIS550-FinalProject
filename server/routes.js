var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre AS genre
    FROM Genres;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var inputGenre = req.params.genre;

  var query = `
    SELECT M.title, M.rating, M.vote_count
    FROM Movies M JOIN Genres G ON M.id = G.movie_id
    WHERE G.genre = '${inputGenre}'
    ORDER BY rating DESC, vote_count DESC
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var inputLogin = req.params.movieName;

  // use regex, compare no order strings
  var query = `
    WITH movie_genres AS (
        SELECT *
        FROM Movies M JOIN Genres G ON M.id = G.movie_id)
    SELECT title, id, rating, vote_count
    FROM (SELECT M.title, M.rating, M.id, M.vote_count, M.genre
    FROM movie_genres M, (SELECT DISTINCT genre FROM movie_genres WHERE title = '${inputLogin}') S
    WHERE M.genre = S.genre) Agg
    WHERE title <> '${inputLogin}'
    GROUP BY title, id
    HAVING COUNT(*) >= (SELECT COUNT( DISTINCT genre ) FROM movie_genres WHERE title = '${inputLogin}')
    ORDER BY rating DESC, vote_count DESC
    LIMIT 5
    ;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // console.log(rows);
      res.json(rows);
    }
  });  
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var inputDecade = req.params.decade;

	var query = `
    WITH movie_genres AS (
        SELECT *
        FROM Movies M JOIN Genres G ON M.id = G.movie_id)
    SELECT genre, AVG(rating) AS average_rating FROM movie_genres WHERE release_year >= ${inputDecade}
            AND release_year <= (${inputDecade} + 9) 
    GROUP BY genre
    ORDER BY average_rating DESC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

getRandomMovies
/* ---- Q4 (10-15 movies) ---- */
function getRandomMovies(req, res) {
	var query = `
    SELECT M.title, M.rating, M.imdb_id
    FROM Movies M JOIN Genres G ON M.id = G.movie_id
    ORDER BY rand()
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getRandomMovies: getRandomMovies
}