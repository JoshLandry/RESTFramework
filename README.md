"RESTServer", version 0.1.0, a simple REST framework.

by Joshua Landry

---------------------------------------------

To use RESTServer as a part of your own code, simply use this line at the top of your program:

var framework = require ('./RESTserver');

Before sending requests, start the server app with this method -

framework.start()

Once you've done this, the following standard REST methods should be available to the 'framework' object, as seen below:

framework.POST() - writes a new file containing the input data
framework.PUT() - overwrites the content of an existing file with the input data
framework.GET() - get the content of an existing file
framework.PATCH() - overwrite the content of an existing file with input data for all matching keys
framework.DELETE() - delete a file

You can also add a resource to the list of available urls by using the following method - 

framework.addResource("exampleResource");

Adding a resource to the list not only allows you to make requests to that resource, it creates a folder with the same name as the resource to hold its files.

You can add as many resources as you want.

----------------------------------------------

To run RESTServer by itself, use 'node frameworktest.js' in the root directory of the framework.  This will start the server with two resources available by default '/unicorns' and '/penguins'.