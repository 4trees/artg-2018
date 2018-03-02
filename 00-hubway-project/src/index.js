import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2, parseStation, fetchCsv} from './utils';

//Import modules
import Histogram from './components/Histogram';
import MainViz from './components/mainViz';
import Animation from './components/Animation';
import Model from './components/Model';

//Create modules
const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2013,11,31)])
	.value(d => d.t0)
	.thresholds(d3.timeMonth.range(new Date(2013,0,1), new Date(2013,11,31), 1))
	.tickXFormat(d => {
		return (new Date(d)).toUTCString();
	})
	.tickX(2);

const activityHistogram = Histogram()
	.thresholds(d3.range(0,24,.5))
	.domain([0,24])
	.value(d => d.time_of_day0)
	.tickXFormat(d => {
		const time = +d;
		const hour = Math.floor(time);
		let min = Math.round((time-hour)*60);
		min = String(min).length === 1? "0"+ min : min;
		return `${hour}:${min}`
	})
	.maxY(1000);

const mainViz = MainViz(); //a closure
const animation = Animation(
		document.querySelector('.main') //DOM Node of <div class="main">
	);

const result = fetch('https://conduit.productionready.io/api/articles') //return a Promise
	.then(res => {
		console.log(res)
		//Body.json() returns a promise that resolves with the result of parsing the body text as JSON.
		return res.json()// whenever return anything, it creates a new Promise
	})
	// .then(res => {
	// 	console.log(res)
	// })
const articles = result.then(res => res.articles).then(res => res.map(v => v.title))
console.log(articles)
// fetch('https://conduit.productionready.io/api/articles')
// 	.then(res => res.json())
// 	.then(res => {
// 		console.log(res)
// 	})

//Import data using the Promise interface
Promise.all([
		fetchCsv('./data/hubway_trips_reduced.csv', parse),
		fetchCsv('./data/hubway_stations.csv', parseStation)
	]).then(([trips, stations]) => {

		d3.select('#time-of-the-day-main')
			.datum(trips)
			.each(activityHistogram);

		d3.select('#timeline-main')
			.datum(trips)
			.each(timeline);

		//We will not draw mainViz for now
		// d3.select('.main')
		// 	.datum(trips)
		// 	.each(mainViz);

		animation(trips, stations);

	});