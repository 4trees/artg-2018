import {select,path,event,mouse,dispatch} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);

//Draw shapes
const circle = plot.append('g')
	.attr('transform',`translate(${w/4},${h/2})`)
	.append('circle')
	.attr('r',w/16);
const square = plot.append('g')
	.attr('transform',`translate(${w/4*2},${h/2})`)
	.append('rect')
	.attr('x',-w/16)
	.attr('y',-w/16)
	.attr('width',w/8)
	.attr('height',w/8);
const triangle = plot.append('g')
	.attr('transform',`translate(${w/4*3},${h/2})`)
	.append('path');
const pathData = path();
pathData.moveTo(0,-w/16);
pathData.lineTo(w/16,w/16);
pathData.lineTo(-w/16,w/16);
pathData.lineTo(0,-w/16);
triangle.attr('d',pathData.toString());

//Basic d3 event API
//selection.on(eventType, callback)
circle.on('click',function(d,i){
	console.log(d);
	console.log(this);
	console.log(event);
	console.log(mouse(this))
});

// circle.on('click',(d,i) => {
// 	console.log(d);
// 	console.log(this);//if use arrow function, 'this' not created based on this DOM, but outside.
// 	console.log(event);
// });

// document.querySelector('circle').addEventListener('click',function(e){
// 	console.log(e,this)
// })
// circle
// 	.on('mouseenter',function(d){
// 		console.log(this);
// 	})
// 	.on('mouseleave', d => {
// 		console.log(this);
// 	});

// //On mouseenter
// //Turn circle red
// circle
// .on('mouseenter',function(){
// 	//'.foo, keep two events'
// 	select(this).style('fill','red')
// 	square.style('fill','red')
// 	circle.style('fill','red')
// })
// .on('mouseleave',function(){
// 	select(this).style('fill','black')
// 	square.style('fill','black')
// 	circle.style('fill','black')
// })
// // square.on('mouseenter',null)
// // square.on('.foo',null)

// //Turn square green
// square
// .on('mouseenter.foo',function(){
// 	select(this).style('fill','green')
// 	square.style('fill','red')
// 	circle.style('fill','red')
// })
// .on('mouseleave',function(){
// 	select(this).style('fill','black')
// 	square.style('fill','black')
// 	circle.style('fill','black')
// })

//Turn triangle blue


//How do we make these three elements interact among themselves?
//d3.dispatch = factory
const dispatcher = dispatch('elements:changecolor')//can define custom event

circle.on('mouseenter',function(){
	//broadcast to the dispatch that mouseenter event occured
	dispatcher.call('elements:changecolor',this,'red') //third is argument
})
.on('mouseleave',() => {
	dispatcher.call('elements:changecolor','I','black')
})
square.on('mouseenter',() => {
	dispatcher.call('elements:changecolor',null,'green') 
})
.on('mouseleave',() => {
	dispatcher.call('elements:changecolor',null,'black')
})
triangle.on('mouseenter',() => {
	dispatcher.call('elements:changecolor',null,'blue') 
})
.on('mouseleave',() => {
	dispatcher.call('elements:changecolor',null,'black')
})
//dispatch bradcasts event back out to all the subscribers
dispatcher.on('elements:changecolor',(color) => {
	triangle.style('fill',color)
	circle.style('fill',color)
	square.style('fill',color)
	console.log(this)
})
