import * as d3 from 'd3';
import './style.css';

//Observe the import syntax
import { parse } from './utils';

console.log('Week 3');

//Set up 
const margin = { t: 20, r: 200, b: 20, l: 200 };
const w = d3.select('#plot').node().clientWidth;
const h = d3.select('#plot').node().clientHeight;
const width = w - margin.l - margin.r;
const height = h - margin.t - margin.b;

const plot = d3.select('#plot').append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('transform', `translate(${margin.l},${margin.t})`);

//Scales
const scaleRadius = d3.scaleSqrt().domain([0, 100]).range([0, 80]);

//Import and parse data
d3.csv('./data/olympic_medal_count.csv', parse, function(err, data) {

    console.log(data);


    //Buttons
    d3.select('.container').append('button').html('1900').on('click', function() {
        const medalsCount1900 = data.map(function(d) {
            return {
                country: d.country,
                count: d.count_1900
            }
        });

        redraw(medalsCount1900);
    });

    d3.select('.container').append('button').html('1960').on('click', function() {
        //YOUR CODE HERE
        const medalsCount1960 = data.map(function(d) {
            return {
                country: d.country,
                count: d.count_1960
            }
        });

        redraw(medalsCount1960);
    });

    d3.select('.container').append('button').html('2012').on('click', function() {
        //YOUR CODE HERE
        const medalsCount2012 = data.map(function(d) {
            return {
                country: d.country,
                count: d.count_2012
            }
        });

        redraw(medalsCount2012);
    });


});

function redraw(count) {

    
const top5 = count.sort((a,b) => b.count - a.count).slice(0,5)
console.log(top5);

const update = plot.selectAll('.country').data(top5, d => d.country)
const enter = update.enter().append('g')
	.attr('class',d => `country ${d.country.split(' ').join('-')}`)
enter.append('circle').style('fill','pink').attr('r',0)
enter.append('text').style('text-anchor','middle').attr('y',150)
const merge = enter.merge(update).transition().duration(800)
merge.attr('transform', (d ,i) => `translate(${(width / 4) * i},${height / 2})`)
merge.select('circle').transition().duration(150).attr('r',d => scaleRadius(d.count))
merge.select('text').text(d => d.country)
update.exit().remove()

}