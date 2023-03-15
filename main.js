const API_URL = 'https://api.coingecko.com/api/v3/';
const coinTarget = document.querySelector('.coin__container');

async function fetchCoinInfo(endpoint) {
	const response = await fetch(`${API_URL}/coins/${endpoint}`);

	const data = await response.json();

	const INFormat = new Intl.NumberFormat('en-US');

	console.log(data);

	const div = document.createElement('div');
	div.innerHTML = `
	<div class="main__coin__info">
						<div class="main__coin__logo">
							<img src="${data.image.small}" alt="${data.name}">
						</div>
						<div class="main__coin__name">${data.name}</div>
						<div class="main__coin__ticker">(${data.symbol.toUpperCase()})</div>
						<div class="main__price">$${INFormat.format(
							data.market_data.current_price.usd.toFixed(2)
						)}</div>
					</div>
	
`;
	document.querySelector('.main__heading').appendChild(div);
}

fetchCoinInfo('bitcoin');

async function fetch100Coins() {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
	);

	const results = await response.json();
	console.log(results);
	const INFormat = new Intl.NumberFormat('en-US');

	results.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
        <img class="logo" src="${item.image}" alt="${item.name}" />
        <div class="coin__name">${item.name}</div>
        <div class="price">$${INFormat.format(
					item.current_price.toFixed(8).slice(0, -4)
				)}</div>       
        `;
		document.querySelector('.coin__container').appendChild(div);
	});
}

fetch100Coins();

function loadChart() {
	new TradingView.widget({
		autosize: true,
		symbol: 'BITFINEX:BTCUSD',
		interval: 'D',
		timezone: 'Europe/London',
		theme: 'dark',
		style: '1',
		locale: 'en',
		toolbar_bg: '#f1f3f6',
		enable_publishing: false,
		allow_symbol_change: true,
		save_image: false,
		container_id: 'tv__chart',
	});
}

loadChart();

//! Notes!
// <div class="rank">${item.market_cap_rank}</div>

// <div class="${
//     +item.price_change_24h.toFixed(6) > 0
//         ? (classList = 'positive')
//         : +item.price_change_24h.toFixed(6) < 0
//         ? (classList = 'negative')
//         : +item.price_change_24h.toFixed(4) == 0
//         ? (classList = 'price__24h_text')
//         : (classList = 'price__24h_text')
// }">$${INFormat.format(
// +item.price_change_24h.toFixed(8).slice(0, -4)
// )}</div>

// <div class="${
// 					+item.price_change_percentage_24h.toFixed(6) > 0
// 						? (classList = 'positive')
// 						: +item.price_change_percentage_24h < 0
// 						? (classList = 'negative')
// 						: +item.price_change_percentage_24h.toFixed(4) == 0
// 						? (classList = 'price__24h_text')
// 						: (classList = 'price__24h_text')
// 				}">${INFormat.format(
// 			+item.price_change_percentage_24h.toFixed(8).slice(0, -7)
// 		)}%</div>

/* <div class="symbol">${item.symbol.toUpperCase()}</div> */

coinTarget.addEventListener('click', FnClick);
function FnClick(e) {
	const click = e.target;
	if (click.classList.contains('coin__name')) console.log(click.textContent);
	if (click.classList !== 'coin__name') return;
	console.log(click);
}
