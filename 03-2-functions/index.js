/*
	1 Function scope
*/
//Carefully consider the scope of each of the variables
const apple = 'fuji';

function fruit() {
    const orange = 'navel';

    console.log(apple); //will this work? why?
};

console.log(apple); //will this work? why?
//console.log(orange); //will this work? why?

let b = 1;

function add(a) {
    const temp = a + b;
    b = b + 1;
    return temp;
}

// console.log(b)

/*
	2 "this" context of functions
*/
//2.1: a regular function
function foo() {
    console.log(this); //window object
}
foo();

//2.2: function attached to an object
const someObj = {
    prop1: 'some value',
    foo: function() {
        console.log(this);
    }
}
someObj.foo();

//2.3: a twist on 2.2
const bar = someObj.foo;
bar();

//2.4
//We can use function.prototype.bind to copy an existing function and arbitrarily assign its "this" context
const baz = someObj.foo.bind('I am some arbitrary string');
//After bind, 'I am some arbitrary string' is 'this' now.
baz();

//2.5
//One frequent use of "this" in relation to d3 is when we use the selection.each function
// d3.select(document.querySelector('body'))
d3.select('body')
    .selectAll('span')
    .data(['a', 'b', 'c', 'd', 'e'])
    .enter()
    .append('span')
    .each(function(d, i) {
        console.group('---2.5---');
        console.log(this); //what is "this"?
        console.log(d);
        console.log(i);
        console.groupEnd();
    });
console.log(document.querySelector('body'), d3.select('body').node(), d3.select(document.querySelector('body')).node())

//selection.call(function-name, var1,var2)
//function name(selection, var1,var2){
// 		selection.attr('class',var1)
// 		selection.attr('id',var2)
// }
// selection.call(name,'t','n')
// this dom will get a class="t", id="n"

//2.6 
//Also beware of "this" context when using selection.on
d3.select(document.getElementById('dummy-button'))
    .on('click', function(d) {
        console.group('---2.6---');
        console.log(this); //what is "this"?
        console.log(d)
        console.log(d3.event)
        console.groupEnd();

        //YOUR CODE HERE
        //How do you change the html content of the button to "I'm clicked?"
    });

// document.getElementById('dummy-button').addEventListener('click', function(d) {
//     console.group('---2.7---');
//     console.log(this); //what is "this"?
//     console.log(d)
//     console.groupEnd();
// })


/*
	3 Closure
*/
const xSaysY = function(x) {

    let name = x;

    return function(msg) {
        return `${name} says "${msg}"`;
    }
}

const simonSays = xSaysY('Simon');
console.log(simonSays);
console.log(typeof simonSays);
console.log(simonSays('hello world'));

//if alpha is array, alpha will change by execution of function.
//if beta is number, beta will not affected by execution.
let alpha = []
let beta = 3

function alpha(x){
	x.push('hello world')
	return x
}
function beta(x){
	x = x + 1
	return x
}