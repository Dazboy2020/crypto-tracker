const API_URL = 'https://api.coingecko.com/api/v3/';

const params = {};

async function fetchAPI(endpoint) {
	const response = await fetch(`${API_URL}/coins/${endpoint}`);

	const data = await response.json();

	const INFormat = new Intl.NumberFormat('en-US');

	console.log(data);

	const div = document.createElement('div');
	div.classList.add('chart');
	div.innerHTML = `
    <img src="${data.image.large}" alt="${endpoint}" />
    Rank: ${data.coingecko_rank}
    $${INFormat.format(data.market_data.ath.usd)}

`;
	document.querySelector('.coin__container').appendChild(div);
}

// fetchAPI('litecoin');

async function fetch100Coins() {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
	);

	const results = await response.json();
	console.log(results);

	results.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
        <div class="rank">${item.market_cap_rank}</div>
        <img class="logo" src="${item.image}" alt="" />
        <div class="text">
            ${item.name}
        </div>
        <div class="symbol">${item.symbol}</div>

        `;
		document.querySelector('.coin__container').appendChild(div);
	});
}

fetch100Coins();

/* 
coingecko_rank 
description.en 
image.large
market_data
symbol
*/
