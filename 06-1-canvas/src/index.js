import * as d3 from 'd3';

/***
  Week 6: Basics of canvas API
	https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
***/

//6.1 Create canvas element
//Remember to set width and height explicitly
const canvas = d3.select('.container')
    .append('canvas')
    .attr('width', 1000)
    .attr('height', 500)
    // .style('width','2000px') //display
    .node();
const ctx = canvas.getContext('2d')

//6.2 Customize fill, stroke, lineWidth
ctx.fillStyle = 'rgb(255,0,0)'

//6.3 Draw
//Primitive shapes: rectangle
// ctx.fillRect(0,0,500,250)
//(x, y, width, height)

// ctx.fillStyle = 'rgb(0,255,0)';
// ctx.strokeStyle = 'rgb(0,0,255)';
// ctx.fillRect(100,100,500,250)

//Primitive shapes: text

// ctx.fillText('Hello World',500,250) 
//(text, x,y)
//Path : line
ctx.strokeStyle = 'rgba(0,0,0,.3)'
// ctx.beginPath()
// ctx.moveTo(0,250) // make the pen leave the canvas
// ctx.lineTo(1000,250)
// ctx.closePath()
// ctx.fill()
// ctx.stroke()

//Grid at 50px
//Draw the horizontal gridlines
ctx.beginPath()
for (let i = 0; i <= 500; i += 50) {

    ctx.moveTo(0, i)
    ctx.lineTo(1000, i)
}
// ctx.closePath()
// ctx.stroke()
//Draw the vertical gridlines
// ctx.beginPath()
for (let i = 0; i <= 1000; i += 50) {

    ctx.moveTo(i, 0)
    ctx.lineTo(i, 500)
}
ctx.closePath()
ctx.stroke()
//Path : arc
ctx.beginPath()
ctx.strokeStyle = 'rgb(0,0,255)';
ctx.arc(500, 250, 100, 0, Math.PI / 2, true)
//(x,y,radius, startAngle, endAngle,[1/0 clockwise, default is false-right])

ctx.moveTo(900, 250) // need to move to startpoint of new circle, which need to add radius

ctx.arc(800, 250, 100, 0, Math.PI * 2)
ctx.closePath()
ctx.stroke()
//Path : circle


//Path : curves
ctx.beginPath();
ctx.moveTo(0, 500)
ctx.quadraticCurveTo(500, 0, 1000, 500)
//(cpx,cpy,x,y)
ctx.moveTo(1000, 500)
ctx.closePath()
ctx.stroke()

//Canvas transform


//6.4 Drawing multiple path with Path2D
const path1 = new Path2D()
const path2 = new Path2D()
const path3 = d3.path() // same with path2d

for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1000;
    const y = Math.random() * 500;
    path1.moveTo(x + 5, y)
    path1.arc(x, y, 5, 0, Math.PI * 2)
    path2.moveTo(x + 5, y)
    path2.arc(x, y, 5, 0, Math.PI * 2)

    path3.moveTo(x + 10, y)
    path3.arc(x, y, 10, 0, Math.PI * 2)
}
ctx.fill(path1)
ctx.stroke(path2)

// d3.select('.container')
// 	.append('svg')
// 	.attr('width',1000)
// 	.attr('height',500)
// 	.append('path')
// 	.attr('d',path3.toString())

//6.5 <canvas> to <svg> using d3.path


//6.6 Basic canvas animations
const canvas2 = d3.select('.container')
    .append('canvas')
    .attr('width', 1000)
    .attr('height', 500)
    .node();
const ctx2 = canvas2.getContext('2d')

let x = 0,
    y = 0;
const speed = .05;

// function redraw() {
//     //Refresh the canvas
//     ctx2.clearRect(0, 0, 1000, 500)

//     //Draw a fresh frame
//     ctx2.beginPath()
//     ctx2.arc(x, y, 5, 0, Math.PI * 2)
//     ctx2.closePath()
//     ctx2.fill()

//     //update x and y
//     x += speed * 2;
//     y += speed;
//     requestAnimationFrame(redraw)
// }
// redraw()


// const point = {
//     x: Math.random() * 1000,
//     y: Math.random() * 500,
//     speedX: (Math.random() - .5) * 1,
//     speedY: (Math.random() - .5) * .5,
//     update: function() {
//         this.x = this.x + this.speedX
//         if (this.x > 1000 || this.x < 0) {
//             this.speedX = -1 * this.speedX
//         }
//         this.y = this.y + this.speedY
//         if (this.y > 500 || this.y < 0) {
//             this.speedY = -1 * this.speedY
//         }

//     }
// }

function makePoint(w,h) {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        speedX: (Math.random() - .5) * 10,
        speedY: (Math.random() - .5) * 5,
        update: function() {
            this.x = this.x + this.speedX
            if (this.x > 1000 || this.x < 0) {
                this.speedX = -1 * this.speedX
            }
            this.y = this.y + this.speedY
            if (this.y > 500 || this.y < 0) {
                this.speedY = -1 * this.speedY
            }

        }
    }
}

const point = makePoint(1000,500)
const points = []
for(let i = 0; i < 5000; i++){
	points.push(makePoint(1000,500))
}

function redraw() {
    //Refresh the canvas
    ctx2.clearRect(0, 0, 1000, 500)
    ctx2.beginPath()

    points.forEach(point => {
    	ctx2.moveTo(point.x,point.y)
    	ctx2.arc(point.x, point.y, 2, 0, Math.PI * 2)
    	point.update()
    })

    // ctx2.arc(point.x, point.y, 10, 0, Math.PI * 2)
    ctx2.closePath()
    ctx2.fill()

    // point.update()
    requestAnimationFrame(redraw)
}
// redraw()