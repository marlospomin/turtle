# Turtle [![Build Status](https://travis-ci.com/marlospomin/turtle.svg?token=PosttrboZuYSHkXP2Lm8&branch=master)](https://travis-ci.com/marlospomin/turtle)

> Turtle is a blazing fast & modern javascript plugin to lazy-load your images with no dependencies.

### Features

* Extremely fast. (Using Intersection Observer)
* Lightweight.
* No dependencies.

## Demo

Example page on CodePen [here](https://codepen.io/marlospomin/pen/EbYXqe).

## Install

```bash
# Using npm
$ npm install @marlospomin/turtle

# Using yarn
$ yarn add @marlospomin/turtle
```

Now include turtle and you should be good to go.

```js
// es6
import turtle from '@marlospomin/turtle'

// commonjs
const turtle = require('@marlospomin/turtle')
```

## Usage

Add ```.turtle ``` class to your element(s) and the image path using ```data-src``` attribute according to the example below.

```html
<img class="turtle" data-src="image.jpg" alt="">
```

If you want to use a *placeholder* for the real image refer it in the ```src``` attribute:

```html
<img class="" src="placeholder.jpg" data-src="" alt="">
```

Call turtle anywhere in your code.

```js
// Call turtle
turtle()
```

### Configuring

These are the current default options, change them as you see fit.

| Option | Default | Description |
| --- | --- | --- |
| `selector` | `.turtle` | A selector that indicates which class to search elements from. |
| `rootMargin` | `50px` | Distance (Y axis) from the element for the event to occur. |
| `treshold` | `0` | Not used by turtle at this time. |

Update the default config:

```js
// Custom options
turtle('.mySelector', config = {
  rootMargin: '0px',
  treshold: 0
})
```

## Running Tasks

You can run tasks with the ```yarn``` command like the example below:

``` bash
# Build task
$ yarn build

# Lint task
$ yarn lint
```

## Browser Support

You can check the browser support [here](http://caniuse.com/#feat=intersectionobserver).

Note: IE 11 is not supported.

## Contributing

Make a pull request and/or open an issue and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
