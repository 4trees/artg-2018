import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import { parse, parse2 } from './utils';

//Import modules
import Histogram from './components/Histogram';
import MainViz from './components/mainViz';

//if in export(haha) has no 'return this', need to do like this:
// const activityHistogram = Histogram()
// activityHistogram.thresholds(d3.range(0, 24, .25))
// activityHistogram.domain([0,24]);

//if has 'return this', simply do this
const activityHistogram = Histogram()
    .thresholds(d3.range(0, 24, .25))
    .domain([0, 24])
    .value(d => d.time_of_day0)
    .tickXFormat(d => {
        const time = +d;
        const hour = Math.floor(time);
        let min = Math.round((time - hour) * 60);
        min = String(min).length === 1 ? "0" + min : min;
        return `${hour}:${min}`
    })
    .maxY(6000)

const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2013, 11,31)])
	.thresholds(d3.timeMonth.range(new Date(2013,0,1),new Date(2013,11,13),1))
	.value(d => d.t0)
	.tickXFormat(d => {
		return new Date(d).toUTCString();
	})
	.tickX(1)

const mainViz = MainViz()

d3.csv('./data/hubway_trips_reduced.csv', parse, (err, trips) => {

    d3.select('#time-of-the-day-main')
        .datum(trips)
        .each(activityHistogram);

    d3.select('#timeline-main')
    	.datum(trips)
    	.each(timeline)

    d3.select('.main')
    	.datum(trips)
    	.each(mainViz)

});