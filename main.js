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
	console.log(results[0]);
	const INFormat = new Intl.NumberFormat('en-US');

	results.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
        <div class="rank">${item.market_cap_rank}</div>
        <img class="logo" src="${item.image}" alt="" />
        <div class="coin__name">${item.name}</div>
        <div class="symbol">${item.symbol.toUpperCase()}</div>
        <div class="price">$${INFormat.format(
					item.current_price.toFixed(2)
				)}</div>
        

        <div class="${
					+item.price_change_24h.toFixed(0) > 0
						? (classList = 'positive')
						: +item.price_change_24h < 0
						? (classList = 'negative')
						: +item.price_change_24h === 0.0
						? (classList = 'price__24h_text')
						: (classList = 'price__24h_text')
				}">$${INFormat.format(+item.price_change_24h.toFixed(0))}</div>
       
        <div class="price__24h__perc">${item.price_change_percentage_24h}</div>
               
        `;
		document.querySelector('.coin__container').appendChild(div);
	});
}

fetch100Coins();

// bug fixes
