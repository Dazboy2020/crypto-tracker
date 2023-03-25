const API_URL = 'https://api.coingecko.com/api/v3/';
const coinTarget = document.querySelector('.coin__container');
let x = 0;

//! FETCH COIN INFO
async function fetchCoinInfo(endpoint) {
	const response = await fetch(`${API_URL}/coins/${endpoint}`);

	const data = await response.json();

	const INFormat = new Intl.NumberFormat('en-US');
}

//! FETCH HEADER INFO
async function fetchHeaderInfo(coin) {
	const response = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
	);

	const data = await response.json();
	updateHeaderInfo(data);
}

//! FETCH OPENING COINS
async function fetch100Coins(endpoint) {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false,'
	);

	const results = await response.json();

	const INFormat = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		roundingIncrement: 1,
	});

	document.querySelector('.coin__container').innerHTML = ``;

	results.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.classList.add(`${item.id}`);
		div.innerHTML = `
				<img class="logo ${item.id}" src="${item.image}" alt="${item.name}" />
				<div class="coin__name ${item.id}">${item.id.toUpperCase()}</div>

				<div class="price">$${INFormat.format(
					item.current_price.toFixed(8).slice(0, -4)
				)}</div>    

						<div class="${
							+item.price_change_percentage_24h.toFixed(6) > 0
								? (classList = 'positive')
								: +item.price_change_percentage_24h.toFixed(6) < 0
								? (classList = 'negative')
								: +item.price_change_percentage_24h.toFixed(4) == 0
								? (classList = 'price__24h_text')
								: (classList = 'price__24h_text')
						} price_change_percentage_24h">
						${INFormat.format(
							+item.price_change_percentage_24h.toFixed(8).slice(0, -7)
						)}%</div>					
						</div
        `;
		document.querySelector('.coin__container').appendChild(div);

		if (div.classList.contains(`${endpoint}`)) div.classList.add('active');
	});
	if (x === 0) openingActiveCoin();
	x++;
}

//! BITCOIN AS OPENING ACTIVE COIN
function openingActiveCoin() {
	const findActiveCoin = Array.from(document.querySelectorAll('.card'));
	fetchHeaderInfo('bitcoin');

	findActiveCoin.forEach((el) => {
		if (el.classList.contains('bitcoin')) {
			if (x === 0) el.classList.add('active');
		}
	});
}

fetch100Coins();

//! UPDATE HEADER
function updateHeaderInfo(results) {
	console.log(results);
	document.querySelector('.main__heading').innerHTML = ``;
	const div = document.createElement('div');
	const INFormat = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		roundingIncrement: 1,
	});

	div.innerHTML = `
		<div class="main__coin__info">
			<div class="main__coin__logo">
				<img src="${results[0].image}" alt="${results.name}">
			</div>
				<div class="main__coin__name">${results[0].name}</div>
					<div class="main__coin__ticker">(${results[0].symbol.toUpperCase()})</div>


					<div class="price__block">
					<div class="main__price">$${INFormat.format(
						results[0].current_price.toFixed(2)
					)}</div>						
		</div>
	`;
	document.querySelector('.main__heading').appendChild(div);
	const symbol = results[0].symbol;
	loadChart(symbol);
	infobarDetails(results);
}

//! INFOBAR DETAILS
function infobarDetails(coin) {
	const INFormat = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		roundingIncrement: 1,
	});

	const info = document.querySelector('.infobar__dynamic');
	info.innerHTML = ``;

	const div = document.createElement('div');
	div.classList.add('infobar__dynamic');
	div.innerHTML = `
	 <div class="infobar__details">
	 	<div class="column">
		 <div class="${
				coin[0].market_cap.toFixed(2) > 0
					? (classList = 'positive_info')
					: 'negative_info'
			} market_cap__details">$${INFormat.format(coin[0].market_cap)
		.toString()
		.padEnd(2, '0')}</div>
	 	</div>
	 	<div class="column">
		 <div class="${
				+coin[0].price_change_24h.toFixed(2) > 0
					? (classList = 'positive_info')
					: 'negative_info'
			} price_change_24h">$${INFormat.format(
		coin[0].price_change_24h.toFixed(2)
	)}</div>
		</div>
	 	<div class="column col3">
		 <div class="max__supply__details ms">${INFormat.format(
				+coin[0].total_supply.toFixed(0)
			)} ${coin[0].symbol.toUpperCase()}</div>
		</div>
	 	<div class="column col4">
		 <div class="circulating__supply__details cs">${INFormat.format(
				+coin[0].circulating_supply.toFixed(0)
			)} ${coin[0].symbol.toUpperCase()}</div>
		</div>
		
	</div>
	`;
	document.querySelector('.infobar__dynamic').appendChild(div);
}

//! LOAD TRADING VIEW
function loadChart(ticker) {
	document.querySelector('.tradingview-widget-container').innerHTML = ``;
	new TradingView.widget({
		autosize: true,
		symbol: `${ticker}USD`,
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

//! EVENT LISTENER
let burgerMenuOpen = false;

coinTarget.addEventListener('click', FnClick);
function FnClick(e) {
	if (burgerMenuOpen) shrinkCoinList();

	const cardELTarget = e.target.closest('.card');
	const coinTarget = cardELTarget.className.replace('card', '').trim();

	Array.from(document.querySelectorAll('.card')).forEach((el) => {
		el.classList.remove('active');
	});

	fetchHeaderInfo(coinTarget);
	fetch100Coins(coinTarget);
}

const coinContainer = document.querySelector('.coin__container');
const leftSide = document.querySelector('.left__side');
const rightSide = document.querySelector('.right__side');
const burgerBarIcon = document.querySelector('.fa-bars');
burgerBarIcon.addEventListener('click', menuFN);
const card = document.querySelectorAll('.card');

function menuFN(e) {
	if (!burgerMenuOpen) {
		expandCoinList();
	}
	if (burgerMenuOpen) {
		shrinkCoinList();
	}
	burgerMenuOpen = !burgerMenuOpen;
	console.log(burgerMenuOpen);
}

function expandCoinList() {
	leftSide.classList.add('closeChart');
	leftSide.classList.remove('openChart');

	coinContainer.classList.add('openCoinList');

	rightSide.classList.add('rightSide');

	burgerBarIcon.style.display = 'none';
	coinContainer.classList.add('.coin__name');

	const coinNameBurger = document.querySelectorAll('.coin__name');
	const price = document.querySelectorAll('.price');
	coinNameBurger.forEach((item) => {
		item.style.display = 'flex';
		item.style.fontSize = '1rem';
		item.style.padding = '1rem';
	});

	price.forEach((item) => {
		item.style.display = 'flex';
	});
}

function shrinkCoinList() {
	leftSide.classList.add('openChart');
	leftSide.classList.remove('closeChart');
	rightSide.classList.remove('rightSide');
	burgerBarIcon.style.display = 'flex';

	const coinNameBurger = document.querySelectorAll('.coin__name');

	coinNameBurger.forEach((item) => {
		item.style.display = 'none';
	});

	const price = document.querySelectorAll('.price');

	price.forEach((item) => {
		item.style.display = 'none';
	});
}
