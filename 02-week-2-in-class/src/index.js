import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 in class');

//Part 1: review d3-selection
//https://github.com/d3/d3-selection

//Select elements
// const moduleSelection = d3.select('#ranking-bar-chart')
// // console.log(moduleSelection,moduleSelection.node())
// const divSelection = d3.select('div')
// console.log(divSelection)
// //Selection vs DOMNode

// //Modifying selection
// const foo = moduleSelection
// 	.append('div')
// 	.attr('class','new new-div')
// 	.style('width','100px')
// 	.style('height','200px')
// 	.style('background','red')
// 	.append('div')
// 	.style('width','20px')
// 	.style('height','20px')
// 	.style('background','green')
// console.log(foo.node())

// //Handle events
// foo.on('click', function(){
// 	d3.event.stopPropagation()
// 	console.log('green box has been clicked')
// })
// //Control flow: .each and .call
// const divSelection2 = d3.select('body').selectAll('div')
// console.log(divSelection2.size())
// divSelection2.each(function(d,i,nodes){
// 	console.group()
// 	console.log(this)
// 	console.log(d,i,nodes)
// 	console.groupEnd()
// })
//Data binding


//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err, trips) {

    //Data transformation, discovery, and mining
    // console.log(trips)
    const tripsBystation0 = d3.nest()
        .key(d => d.station0)
        .rollup(d => d.length)
        .entries(trips)
        .sort((a,b) => b.value - a.value)
    console.log(tripsBystation0)
    // const tripVolumeByStation0 = tripsBystation0.map(d => {return {
    // 	station:d.key,
    // 	volume:d.values.length
    // }})
    // console.log(tripVolumeByStation0)
    const max = d3.max(tripsBystation0, d => d.value)
    console.log(max)

    //visual space measurements
    const margin = { t: 100, r: 300, b: 100, l: 300 }
    const padding = 1
    const module = d3.select('#ranking-bar-chart')
    const w = module.node().clientWidth
    const h = module.node().clientHeight
    const svgW = w - margin.l - margin.r
    const svgH = h - margin.t - margin.b
    console.log(w, h)

    //scale
    const scaleX = d3.scaleLinear().domain([0, max]).range([0, svgW])

    //Represent / DOM manipulation
    const barGH = svgH / tripsBystation0.length
    const svg = module.append('svg')
    	.attr('width',w)
    	.attr('height',h)
    const plot = svg.append('g').attr('class','chart')
    	.attr('transform',`translate(${margin.l},${margin.t})`)
    var update = plot.selectAll('.station').data(tripsBystation0)
    var enter = update.enter().append('g').attr('class','station')
    	.attr('transform', (d,i) => `translate(0,${barGH * i})`)
    enter.append('rect')
    	.attr('width',d => scaleX(d.value))
    	.attr('height',barGH - padding)
    enter.append('text')
    	.text(d => d.key)
    	.style('text-anchor','end')
    	.style('font-size','6px')

});