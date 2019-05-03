// import libraries js
import $ from 'jquery'

// import app js
import hello from '@js/app/hello.js'
import { helloEN, helloFR } from '@js/app/hello_world.js'

// import all modules of libraries
// require('bootstrap')

// or

// import plugins individually of libraries
require('@js/vendor/bootstrap.js')

// code js
hello('hello ')
helloEN('hello all people')
helloFR('bonjour à tous')

let message = 'hello world'
hello(message)

let [b, , c] = [1, 2, 4, 5]
console.log(b)
console.log(c)

$('p').css('background', 'rgb(43, 43, 43)')
