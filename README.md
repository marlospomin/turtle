# Turtle.js

Turtle is a blazing fast & modern javascript plugin to lazy-load your images with no dependencies.

### Features

* Extremely fast. (Using IntersectionObserverAPI)
* Lightweight.
* No dependencies.


## Install

``` bash
# Using npm
$ npm install --save turtle.js
# Using yarn
$ yarn install turtle.js
```

Now include turtle and you should be good to go.

``` js
// es7
import turtle from 'turtle'
// commonjs
const turtle = require('turtle');
```

Alternatively you can include a minified version of turtle (or the source code, up to you) on your page via direct file or our **CDN** link.

``` html
<body>
  <script src="~stuff~"></script>
</body>
```

### Build Explanation

Files with ```.es7``` suffix are what they mean and should **not** be used in most cases (as they usually break on older browsers), if you don't care about compatibility use them as you wish.

## Usage

Add ```.turtle ``` class to your image element(s) anywhere in the page.

``` html
<img class="turtle" data-src="image.jpg" alt="">
```

~rest~

## Browser Support

You can check the browsers supported [here](http://caniuse.com/#feat=intersectionobserver).

**Minified files found in the dist folder are es5 compatible.**

## Contributing

If you feel like we missed something just let us know! Make a pull request or open an issue using a discussion/request label and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
