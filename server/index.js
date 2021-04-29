const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


app.get('/countries', routes.getAllCountries);


app.get('/countryIntro/:name', routes.getCountryIntro);


app.get('/countryPic/:name', routes.getCountryPic);


app.get('/teamPic/:name', routes.getTeamPic);


app.get('/countryPlayers/:name', routes.getCountryPlayers);


app.get('/countryMatches/:name', routes.getCountryMatches);


app.get('/teams', routes.getAllTeams);


app.get('/teams/:team', routes.getTeamResult); // Hint: Replace () => {} with the appropriate route handler.


app.get('/cups', routes.getWorldCupYear);


app.get('/cups/:year', routes.getChampion);

app.get('/player/:name', routes.getPlayers);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});