const URLS_VEHICLES = [
	`https://swapi.dev/api/vehicles/`,
	'https://swapi.dev/api/vehicles/?page=2',
	'https://swapi.dev/api/vehicles/?page=3',
	'https://swapi.dev/api/vehicles/?page=4',
];
const BOX = document.getElementById('box');
const SEARCH = document.getElementById('searchBtn');
const INPUT = document.getElementById('search');

const vehiclesData = [];
let objectData = {};

const getData = async () => {
	try {
		let allData = URLS_VEHICLES.map(async (url) => {
			const response = await fetch(url);
			return response.json();
		});
		const getAllData = (await Promise.all(allData)).map((a) => {
			vehiclesData.push(...a.results);
		});
		ajoutDonne();
		afficher(vehiclesData);
		titleButton();
		console.log(vehiclesData);
	} catch (error) {
		console.error(error);
	}
};

const ajoutDonne = () => {
	for (let i = 0; i < vehiclesData.length; i++) {
		vehiclesData[i].dataFilms = false;
		vehiclesData[i].dataPilots = false;
	}
	// console.log(vehiclesData);
};

const afficher = (data) => {
	BOX.innerHTML = '';
	for (let i = 0; i < data.length; i++) {
		BOX.innerHTML += `
      <div class="card_wrapper">
        <h2 class="title" id="${i}">${data[i].name}</h2>
        <div class="card">
          <div>
            <ul>
              <li>model: ${data[i].model}</li>
              <li>manufacturer: ${data[i].manufacturer}</li>
              <li>cost in credits: ${data[i].cost_in_credits}</li>
              <li>length: ${data[i].length}</li>
              <li>max atmosphering speed: ${data[i].max_atmosphering_speed}</li>
              <li>crew: ${data[i].crew}</li>
              <li>passengers: ${data[i].passengers}</li>
              <li>cargo capacity: ${data[i].cargo_capacity}</li>
              <li>consumables: ${data[i].consumables}</li>
              <li>vehicle_clas: ${data[i].vehicle_clas}</li>
            </ul>
          </div>
          <div>
            <h3>Films</h3>
            <ul class="films">
            </ul>
          </div>
          <div>
          <h3>Pilots</h3>
            <ul class="pilots">
            </ul>
          </div>
        </div>
      </div>
    `;
	}
};

const titleButton = () => {
	const LIST_TITLE = document.querySelectorAll('.title');
	//console.log(TITLE);
	for (const title of LIST_TITLE) {
		title.addEventListener('click', (evt) => {
			const ID = evt.target.id;
			let res = evt.target.nextSibling.nextElementSibling;
			res.classList.toggle('active');
			const UL_FILM = evt.target.nextSibling.nextElementSibling.children[1];
			const UL_PLANETE = evt.target.nextSibling.nextElementSibling.children[2];
			console.log(UL_PLANETE);
			getDataFilm(vehiclesData[ID].films, UL_FILM, ID);
			getDataPilote(vehiclesData[ID].pilots, UL_PLANETE, ID);
		});
	}
};

const getDataFilm = (listUrl, ul_element, id) => {
	Promise.all(listUrl.map((url) => fetch(url)))
		.then((resp) => {
			return Promise.all(resp.map((x) => x.json()));
		})
		.then((data) => {
			console.log(data);

			for (const d of data) {
				if (d != 0 || vehiclesData[id].films == false) {
					vehiclesData[id].films = true;
					ul_element.innerHTML += `<li>${d.title}</li>`;
				} else {
					ul_element.innerHTML = 'Pas de donnée';
				}
			}
		});
};

const getDataPilote = (listUrl, ul_element) => {
	Promise.all(listUrl.map((url) => fetch(url)))
		.then((resp) => {
			return Promise.all(resp.map((x) => x.json()));
		})
		.then((data) => {
			console.log(data);
			for (const d of data) {
				if (d != 0) {
					ul_element.innerHTML += `<li>${d.name}</li>`;
				} else {
					ul_element.innerHTML = `<li>Pas de donnée</li>`;
				}
			}
		});
};

const filter = (search) => {
	const resSearch = vehiclesData.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
	afficher(resSearch);
	titleButton();
};

SEARCH.addEventListener('click', (evt) => {
	if (INPUT.value) {
		filter(INPUT.value);
	} else {
		filter('');
	}
});

getData();
