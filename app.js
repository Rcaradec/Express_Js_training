//? CONFIGURATION

// on récupère le module dayjs pour gérer les dates et heures
const dayjs = require("dayjs");

// on installe aussi son plugin pour gérer les TZ
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

// d'abord on récupère le module Express
const express = require("express");

// on demande gentiment à express de démarrer
const app = express();

// on recupere notre module Weather
var weather = require("weather-js");

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

// On demande à express d'écouter les requetes sur le port stocké dans la variable `port`
// En second argument on spécifie aussi un callback, une fonction, qui sera executée quand
// se serveur sera pret à écouter les requetes sur le port spécifié.
app.listen(port, () => {
  console.log(
    `Je suis pret, envoyer vos requetes sur http://localhost:${port}`
  );
});
