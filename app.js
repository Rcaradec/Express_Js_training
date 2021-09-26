//? CONFIGURATION

// on récupère le module dayjs pour gérer les dates et heures
const dayjs = require("dayjs");
// on switch dayjs en Francais
require("dayjs/locale/fr");
dayjs.locale("fr"); // use locale globally

// on installe aussi son plugin pour gérer les TZ
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

// on recupere les villeFavorites
const villeFavorites = require("./my_modules/ressources.js");

// d'abord on récupère le module Express
const express = require("express");

// on demande gentiment à express de démarrer
const app = express();

// on recupere notre module Weather
var weather = require("weather-js");
const { log } = require("console");
const { response } = require("express");

// Voici ou seront rangé les vues/templates
app.set("views", "./views");

// Je configure express pour lui préciser quel moteur de template on utilise
app.set("view engine", "ejs");

// On indique à Express que les ressources "statiques" (css, images, polices, etc.) sont rangées dans le dossiers 'public'
app.use(express.static("public"));

// On spécifie le port sur lequel on va écouter les requetes
const port = 3000;

// On écrit une route;
app.get("/", (req, res) => {
  // si page statiquere ==>
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/city/:ville", (req, res) => {
  // Récupérer la ville demandée
  const ville = req.params.ville;

  let infoVille = null;
  for (const city of villeFavorites) {
    // console.log(city);
    if (city.name.toLowerCase() === ville.toLowerCase()) {
      infoVille = city;
    }
    console.log(infoVille);
  }

  // Récupérer le contenu du champs `tz` de la bonne entrée
  const dateFormat = dayjs().tz(infoVille.tz).format("DD MMMM YYYY HH:mm");
  // res.send(`Coucou, la ville est ${infoVille.name} , date : ${dateFormat}`);
  // On demande à express de faire passer EJS sur le fichier ville.ejs
  res.render("ville");
});

// On demande à express d'écouter les requetes sur le port stocké dans la variable `port`
// En second argument on spécifie aussi un callback, une fonction, qui sera executée quand
// se serveur sera pret à écouter les requetes sur le port spécifié.
app.listen(port, () => {
  console.log(
    `Je suis pret, envoyez vos requetes sur http://localhost:${port}`
  );
});
