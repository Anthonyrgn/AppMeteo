const keyAPI = 'ba79bc44d46145cf1a56d491a1fba65e';
let resultAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const temppourH = document.querySelectorAll('.heure-prevision-valeur');


if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {

      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      AppelAPI(long, lat);


  }, () => {
    alert("Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer.");
  })
}

function AppelAPI(long, lat){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultAPI = data;

      temps.innerText = resultAPI.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°C`;
      localisation.innerText = resultAPI.timezone;


      // Les heures, par tranche de trois, avec leur température.

      let heureActuelle = new Date().getHours();

      for (let i = 0; i < heure.length; i++){
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24){
          heure[i].innerText = `${heureIncr - 24} h`;
        }else if (heureIncr === 24){
          heure[i].innerText = " 00h";
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }

      // temp pour 3h

      for (let j = 0; j < temppourH.length; j++){
        temppourH[j].innerText = `${Math.trunc(resultAPI.hourly[j * 3].temp)}°`;
      }

    })
}
