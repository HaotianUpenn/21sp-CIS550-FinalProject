var config = require('./db-config.js');
var mysql = require('mysql');

const items = [
    {
        id: 1,
        title: 'Brazil',
        init: 'BRA',
        category: 'South America',
        win_time: '5 Times Champion' ,
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/bra',
        teampic: 'https://img.fifa.com/image/upload/t_l2/hx0rytamx0ztlmkpd8mz.jpg',
        desc: `Brazil is the most successful national team in the history of the World Cup, having won five titles, earning second-place, third-place and fourth-place finishes twice each. Brazil is one of the countries besides Argentina, Spain and Germany to win a FIFA World Cup away from its continent (Sweden 1958, Chile 1962, Mexico 1970, USA 1994 and South Korea/Japan 2002). Brazil is the only national team to have played in all FIFA World Cup editions without any absence or need for playoffs. Brazil also has the best overall performance in World Cup history in both proportional and absolute terms with a record of 73 victories in 109 matches played, 124 goal difference, 237 points and only 18 losses. `,
    },
    {
        id: 2,
        title: 'Germany',
        init: 'GER',
        category: 'Europe',
        win_time: '4 Times Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/ger',
        teampic: 'https://img.fifa.com/image/upload//sr6u1hesbxsi5kul3x6x.jpg',
        desc: `The Germany national football team is one of the most successful national teams at the FIFA World Cup, winning four titles, earning second-place and third-place finishes four times each and one fourth-place finish. `,
    },
    {
        id: 3,
        title: 'Italy',
        init: 'ITA',
        category: 'Europe',
        win_time: '4 Times Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/ita',
        teampic: 'https://img.fifa.com/image/upload/t_l2/xrbflrxxh0z7u69myr5r.jpg',
        desc: `Italy is one of the most successful national teams in the history of the World Cup, having won four titles (1934, 1938, 1982, 2006), just one fewer than Brazil. The team was present in 18 out of the 21 tournaments, reaching six finals, a third place and a fourth place.`,
    },
    {
        id: 4,
        title: 'Argentina',
        init: 'ARG',
        category: 'South America',
        win_time: '2 Times Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/arg',
        teampic: 'https://img.fifa.com/image/upload/t_l2/xgf7mjbyiqzbmtumnphu.jpg',
        desc: `Argentina is one of the most successful national football teams in the world, having won two World Cups in 1978 and 1986. Argentina has been runners up three times in 1930, 1990 and 2014. The team was present in all but four of the World Cups, being behind only Brazil, Italy and Germany in number of appearances., `,
    },
    {
        id: 5,
        title: 'Uruguay',
        init: 'URU',
        category: 'South America',
        win_time: '2 Times Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/uru',
        teampic: 'https://img.fifa.com/image/upload//jj2zdyv9fkwrzyq273gu.jpg',
        desc: `Uruguay have won four FIFA-organized World Football Championships. They won the first World Championship organized by FIFA under the Olympic Committee umbrella with true representation from all continents; before then, football in the Olympics comprised only European teams.  `,
    },
    {
        id: 6,
        title: 'France',
        init: 'FRA',
        category: 'Europe',
        win_time: '1 Time Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/fra',
        teampic: 'https://img.fifa.com/image/upload//c5ehvrr2kx47k2q6tstv.jpg',
        desc: `The French team won its first World Cup title in 1998. The tournament was played on home soil and France defeated Brazil 3–0 in the final match.`,
    },
    {
        id: 7,
        title: 'England',
        init: 'ENG',
        category: 'Europe',
        win_time: '1 Time Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/eng',
        teampic: 'https://img.fifa.com/image/upload//puxs0mfqnis8xuzvlgub.jpg',
        desc: `England did not enter the competition until 1950, but have entered all eighteen subsequent tournaments, Their best ever performance is winning the Cup in the 1966 tournament held in England.`,
    },
    {
        id: 8,
        title: 'Spain',
        init: 'ESP',
        category: 'Europe',
        win_time: '1 Time Champion',
        img: 'https://api.fifa.com/api/v1/picture/associations-sq-3/esp',
        teampic: 'https://img.fifa.com/image/upload//ampl76umlskknwha4y6n.jpg',
        desc: `Spain is one of only eight countries ever to have won the FIFA World Cup, doing so in South Africa in 2010, the first time the team had reached the final. The team is one of the most present at the World Cup finals.`,
    },
];

const allCountry = [...new Set(items.map((item) => item.title))];

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllCountries(req, res) {

    res.json(allCountry);

};


function getCountryIntro(req, res) {
    var name = req.params.name;

    const selectItems = items.filter((item) => item.title === name);
    const intros = [...new Set(selectItems.map((item) => item.desc))];

     res.json(intros);

};


function getCountryPic(req, res) {
    var name = req.params.name;

    const selectItems = items.filter((item) => item.title === name);
    const imgs = [...new Set(selectItems.map((item) => item.img))];

    res.json(imgs);
};


function getTeamPic(req, res) {
    var name = req.params.name;

    const selectItems = items.filter((item) => item.title === name);
    const imgs = [...new Set(selectItems.map((item) => item.teampic))];

    res.json(imgs);
};


function getCountryPlayers(req, res) {
    var name = req.params.name;

    const selectItems = items.filter((item) => item.title === name);
    const inits = [...new Set(selectItems.map((item) => item.init))];
    const init = inits[0]

    var query = `
    SELECT *
    FROM Movies M 
    WHERE G.genre = '${inputGenre}'
    ORDER BY Year DESC
    LIMIT 10;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};


function getCountryMatches(req, res) {
    var name = req.params.name;

    const selectItems = items.filter((item) => item.title === name);
    const inits = [...new Set(selectItems.map((item) => item.init))];
    const init = inits[0]

    var query = `
    SELECT Year, Stage, HomeTeamName, HomeTeamGoals, AwayTeamName, AwayTeamGoals
    FROM Matches
    WHERE HomeTeamInitials = '${init}' OR AwayTeamInitials = '${init}'
    ORDER BY Year DESC
    LIMIT 10;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};


function getAllTeams(req, res) {
    var query = `
    Select distinct d.teams as team from (
    select distinct AwayTeamName as teams from Matches
    union
    select distinct HomeTeamName as teams from Matches) d;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};


function getTeamResult(req, res) {
    var inputTeam = req.params.team;

    var query = `
    select "${inputTeam}" as Team, Year, count(Year) as Matches from Matches 
    where HomeTeamName ="${inputTeam}" or AwayTeamName ="${inputTeam}"
    Group by Year;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};

function getRecs(req, res) {
    var inputLogin = req.params.teamName;

    // use regex, compare no order strings
    var query = `
    select "${inputLogin}" as Team, Year, count(Year) as Matches from Matches 
    where HomeTeamName ="${inputLogin}" or AwayTeamName ="${inputLogin}"
    Group by Year;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            // console.log(rows);
            res.json(rows);
        }
    });
};

function getWorldCupYear(req, res) {
    var query = `
    select distinct Year from Matches;
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
}

function getChampion(req, res) {
    var inputYear = req.params.year;

    var query = `
      select distinct
        case 
          when HomeTeamGoals > AwayTeamGoals then HomeTeamName
          else AwayTeamName
        end as champion
      from Matches where stage = "Final" and Year = ${inputYear};
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
};


function getPlayers(req, res) {
    var inputName = req.params.name;

    // use regex, compare no order strings
    var query = `
        Select distinct Year

        from WorldCupPlayers

        join Codes on Codes.FIFA = WorldCupPlayers.TeamInitials

        join Matches on Matches.MatchID = WorldCupPlayers.MatchID and Matches.RoundID = WorldCupPlayers.RoundID 

        where WorldCupPlayers.PlayerName like "%${inputName}" and Stage = "Final" and ((HomeTeamGoals > AwayTeamGoals and HomeTeamInitials = TeamInitials) or (HomeTeamGoals < AwayTeamGoals and AwayTeamInitials = TeamInitials));
  `;
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            // console.log(rows);
            res.json(rows);
        }
    });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
    getAllCountries:getAllCountries,
    getCountryIntro:getCountryIntro,
    getCountryPic:getCountryPic,
    getTeamPic:getTeamPic,
    getCountryPlayers:getCountryPlayers,
    getCountryMatches:getCountryMatches,
    getAllTeams: getAllTeams,
    getTeamResult: getTeamResult,
    getRecs: getRecs,
    getWorldCupYear: getWorldCupYear,
    getChampion: getChampion,
    getPlayers: getPlayers,
}