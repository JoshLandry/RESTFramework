'use strict';

var framework = require ('./RESTserver');

framework.addResource("penguins");
framework.addResource("unicorns");
// 1.json, 2.json, 3.json  /penguins
// /penguins/1

framework.start();