const URL_VEHICLES = `https://swapi.dev/api/vehicles/`;
const BOX = document.getElementById('box');

const getData = async () => {
	try {
		const res = await fetch(URL_VEHICLES);
		const data = await res.json();
		console.log(data);

		for (const v of data.results) {
			/*
			 * Récuperer les pilots
			 */
			let pilots = [...v.pilots];

			let dataPilots = pilots.map(async (pilot) => {
				const data = await fetch(pilot);
				return data.json();
			});

			const getPilots = (await Promise.all(dataPilots)).map((p) => `<li>${p.name}</li>`);
			console.log(getPilots);

			/*
			 * Récuperer les films
			 */
			let films = [...v.films];
			let dataFilms = films.map(async (film) => {
				const data = await fetch(film);
				return data.json();
			});

			const getFilms = (await Promise.all(dataFilms)).map((f) => `<li>${f.title}</li>`);

			BOX.innerHTML += `
      <div class="card_wrapper">
        <h2>${v.name}</h2>
        <div class="card">
          <div>
            <ul>
              <li>model: ${v.model}</li>
              <li>manufacturer: ${v.manufacturer}</li>
              <li>cost in credits: ${v.cost_in_credits}</li>
              <li>length: ${v.length}</li>
              <li>max atmosphering speed: ${v.max_atmosphering_speed}</li>
              <li>crew: ${v.crew}</li>
              <li>passengers: ${v.passengers}</li>
              <li>cargo capacity: ${v.cargo_capacity}</li>
              <li>consumables: ${v.consumables}</li>
              <li>vehicle_clas: ${v.vehicle_clas}</li>
            </ul>
          </div>
          <div>
            <h3>Films</h3>
            <ul>
              ${getFilms}
            </ul>
          </div>
          <div>
          <h3>Pilots</h3>
            <ul>
            ${getPilots.length != 0 ? getPilots : 'Pas de Pilotes'}
            </ul>
          </div>
        </div>
      </div>
    `;
		}
	} catch (error) {
		console.error(error);
	}
};

getData();
