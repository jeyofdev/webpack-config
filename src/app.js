// import js
import hello from '@js/hello.js'
import { helloEN, helloFR } from '@js/hello_world.js'
import $ from 'jquery'

// import modal of Bootstrap js
require('bootstrap/js/dist/modal')

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
